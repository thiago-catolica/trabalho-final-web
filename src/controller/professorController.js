const {usuario, aluno, turma, professor, disciplina}  = require('../models/indexModel');

async function getVisualizarTurmas(req, res) {
  try {
    const usuarioLogado = await usuario.findOne({
      where: { email: req.session.email },
      attributes: ['id_usuario']
    });

    if (!usuarioLogado) {
      req.session.erro = 'Usuário não encontrado.';
      return res.redirect('/professor');
    }

    const professorLogado = await professor.findOne({
      where: { fk_usuario: usuarioLogado.id_usuario },
      attributes: ['id_professor', 'nome', 'matricula'],
      include: {
        model: turma,
        attributes: ['id_turma', 'turma'],
        through: { attributes: [] }
      }
    });

    if (!professorLogado) {
      req.session.erro = 'Professor não encontrado.';
      return res.redirect('/professor');
    }

    const turmasComAlunos = await Promise.all(
      professorLogado.turmas.map(async (t) => {
        const alunosDaTurma = await aluno.findAll({
          where: { fk_turma: t.id_turma },
          attributes: ['nome', 'matricula']
        });

        const alunosFormatados = alunosDaTurma.map(a => ({
          nome: a.nome,
          matricula: a.matricula
        }));

        return {
          id_turma: t.id_turma,
          turma: t.turma,
          alunos: alunosFormatados
        };
      })
    );

    res.render('tela_visualizar_turmas.html', {
      nome: professorLogado.nome,
      matricula: professorLogado.matricula,
      turmas: turmasComAlunos,
      sucesso: req.session.sucesso,
      erro: req.session.erro
    });

    req.session.sucesso = null;
    req.session.erro = null;

  } catch (erro) {
    req.session.erro = 'Erro ao buscar turmas.';
    res.redirect('/professor');
  }
}



async function getTelaProfessor(req, res) {
  try {
    const usuarioLogado = await usuario.findOne({
      where: { email: req.session.email },
      attributes: ['id_usuario', 'tipo_usuario']
    });

    if (!usuarioLogado || usuarioLogado.tipo_usuario !== 'Professor') {
      return res.status(403).send('Acesso não autorizado.');
    }

    const dadosProfessor = await professor.findOne({
      where: { fk_usuario: usuarioLogado.id_usuario },
      attributes: ['nome', 'matricula'],
      include: [
        {
          model: disciplina,
          attributes: ['disciplina']
        }
      ]
    });

    if (!dadosProfessor) {
      return res.status(404).send('Dados do professor não encontrados.');
    }

    const disciplinaNome = dadosProfessor.disciplina
      ? dadosProfessor.disciplina.disciplina
      : 'Não atribuída';

    const dados = {
      nome: dadosProfessor.nome,
      matricula: dadosProfessor.matricula,
      disciplina: disciplinaNome,
      sucesso: req.session.sucesso,
      erro: req.session.erro
    };

    req.session.sucesso = null;
    req.session.erro = null;

    res.render('tela_professor.html', dados);
  } catch (error) {
    res.status(500).send('Erro ao carregar dados do professor.');
  }
}

module.exports = {
    getTelaProfessor,
    getVisualizarTurmas,
};
