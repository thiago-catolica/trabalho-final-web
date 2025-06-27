const { usuario } = require ('../models/indexModel');

function getTelaLogin(req, res){
    res.render ('tela_login.html');
}

function getRecuperarSenha(req, res){
    res.render('tela_recuperacao_senha.html');
}

async function verificarLogin(req, res){
    
    const Usuario = await usuario.findOne({
        where : {
            email : req.body.email,
            senha : req.body.senha
        },
        attributes : ['tipo_usuario', 'email']
        });


    if (Usuario != null){
        console.log("Usuário Autenticado.");

        req.session.autorizado = true;
        req.session.email = Usuario.email;
        req.session.tipoUsuario = Usuario.tipo_usuario;

        const tipoUsuario = req.session.tipoUsuario;

        if (tipoUsuario == 'Administrador'){
            res.redirect ('/administrador');
        }
        else if (tipoUsuario == 'Aluno'){
            res.redirect ('/aluno');
        }
        else if (tipoUsuario == 'Professor'){
            res.redirect ('/professor');
        }
    }
    else {
        let erro = true;
        res.render('tela_login.html', {erro});
    }


}

async function recuperar_senha (req, res){
    const Usuario = await usuario.findOne({
        where : {
            email : req.body.email,
            senha : req.body.senhaAntiga
        }
    });

    const nova_senha = req.body.senhaNova;

    if (Usuario == null){
        res.render('tela_recuperacao_senha.html', {erro : true});
        return;
    }

    const update_usuario = await usuario.update(
        {senha : nova_senha},
        {where : {email : req.body.email}}
    );

    if (update_usuario[0] >=1){
        res.render ('tela_recuperacao_senha.html', {sucesso : true});
    }
    else {
        res.render ('tela_recuperacao_senha.html', {erro_banco : true});
    }
}

function logout(req,res){

}



module.exports = {
    getTelaLogin, 
    getRecuperarSenha,
    recuperar_senha,
    verificarLogin,
    logout
};  