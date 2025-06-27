function getTelaAdministrador(req, res){
    res.render('tela_administrador.html');
}

function getGerenciarProfessores(req, res){
    res.render('tela_gerenciar_professores.html');
}

function getGerenciarAlunos(req, res){
    res.render('tela_gerenciar_alunos.html');
}

module.exports = {
    getTelaAdministrador,
    getGerenciarProfessores,
    getGerenciarAlunos
};