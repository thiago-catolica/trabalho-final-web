function getTelaLogin(req, res){
    res.render ('tela_login.html');
}

function getRecuperarSenha(req, res){
    res.render('tela_recuperacao_senha.html');
}

function verificarLogin(req, res){

}

function logout(req,res){

}



module.exports = {
    getTelaLogin, 
    getRecuperarSenha,
    verificarLogin,
    logout
};  