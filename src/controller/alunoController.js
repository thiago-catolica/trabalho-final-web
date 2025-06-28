const {usuario, aluno, turma}  = require('../models/indexModel');

async function getTelaAluno(req, res) {
  try {
    const usuarioLogado = await usuario.findOne({
      where: { email: req.session.email },
      attributes: ['id_usuario', 'tipo_usuario']
    });

    if (!usuarioLogado || usuarioLogado.tipo_usuario !== 'Aluno') {
      return res.status(403).send('Acesso não autorizado.');
    }

    const dadosAluno = await aluno.findOne({
      where: { fk_usuario: usuarioLogado.id_usuario },
      attributes: ['nome', 'matricula'],
      include: [
        {
          model: turma,
          attributes: ['turma']
        }
      ]
    });

    if (!dadosAluno) {
      return res.status(404).send('Dados do aluno não encontrados.');
    }

    res.render('tela_aluno.html', {
      nome: dadosAluno.nome,
      matricula: dadosAluno.matricula,
      turma: dadosAluno.turma?.turma || 'Não atribuída',
      sucesso: req.session.sucesso,
      erro: req.session.erro
    });

    req.session.sucesso = null;
    req.session.erro = null;

  } catch (error) {
    res.status(500).send('Erro interno no servidor');
  }
}


module.exports = {
    getTelaAluno
};