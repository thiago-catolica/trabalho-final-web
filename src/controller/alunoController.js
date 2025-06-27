const {administrador, usuario, aluno, turma, professor, disciplina, turma_professor, nota}  = require('../models/indexModel');

async function getTelaAluno(req, res) {
    const usuarioLogado = await usuario.findOne({
      where: { email: req.session.email }
    });

    const dadosAluno = await aluno.findOne({
      where: { fk_usuario: usuarioLogado.id_usuario },
      include: [
        {
          model: turma,
          attributes: ['turma']
        }
      ]
    });

    const notasAluno = await nota.findAll({
      where: { fk_aluno: dadosAluno.id_aluno },
      include: [
        {
          model: disciplina,
          attributes: ['disciplina']
        }
      ]
    });

    const notasFormatadas = notasAluno.map(n => ({
      disciplina: n.disciplina.disciplina,
      nota1: n.nota1,
      nota2: n.nota2,
      nota3: n.nota3,
      media: n.media,
      nota_final: n.nota_final
    }));

    res.render('tela_aluno.html', {
      turma: dadosAluno.turma.turma,
      matricula: dadosAluno.matricula,
      notas: notasFormatadas,
      sucesso: req.session.sucesso,
      erro: req.session.erro
    });

    req.session.sucesso = null;
    req.session.erro = null;
}


module.exports = {
    getTelaAluno
};