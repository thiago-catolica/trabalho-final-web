function getTelaProfessor(req, res){
    res.render('tela_professor.html');
}

function getVisualizarTurmas (req, res){
    res.render('tela_visualizar_turmas.html');
}   

function getInserirNotas (req, res){
    res.render('tela_inserir_notas.html');
}

module.exports = {
    getTelaProfessor,
    getVisualizarTurmas,
    getInserirNotas
};
