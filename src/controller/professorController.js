const {administrador, usuario, aluno, turma, professor, disciplina, turma_professor, nota}  = require('../models/indexModel');

async function getVisualizarTurmas(req, res) {
  try {
    const usuarioLogado = await usuario.findOne({
      where: { email: req.session.email },
      attributes: ['id_usuario']
    });

    const professorLogado = await professor.findOne({
      where: { fk_usuario: usuarioLogado.id_usuario },
      attributes: ['id_professor', 'nome', 'matricula'],
      include: {
        model: turma,
        through: { attributes: [] }
      }
    });

    const turmasComAlunos = await Promise.all(
      professorLogado.turmas.map(async (t) => {
        const alunosDaTurma = await aluno.findAll({
          where: { fk_turma: t.id_turma },
          attributes: ['nome', 'matricula']
        });

        return {
          id_turma: t.id_turma,
          turma: t.turma,
          alunos: alunosDaTurma
        };
      })
    );

    res.render('tela_visualizar_turmas.html', {
      nome: professorLogado.nome,
      matricula: professorLogado.matricula,
      turmas: turmasComAlunos
    });

  } catch (erro) {
    req.session.erro = 'Erro ao buscar turmas.';
    res.redirect('/professor');
  }
}


function getTelaProfessor(req, res) {
  const dados = {
    sucesso: req.session.sucesso,
    erro: req.session.erro
  };

  req.session.sucesso = null;
  req.session.erro = null;

  res.render('tela_professor.html', dados);
}



async function getInserirNotas(req, res) {
  try {
    const usuarioLogado = await usuario.findOne({
      where: { email: req.session.email }
    });

    if (!usuarioLogado) {
      return res.render('tela_inserir_notas.html', {
        erro: 'Usuário não encontrado.',
        alunos: []
      });
    }

    const dadosProfessor = await professor.findOne({
      where: { fk_usuario: usuarioLogado.id_usuario },
      include: [disciplina]
    });

    if (!dadosProfessor) {
      return res.render('tela_inserir_notas.html', {
        erro: 'Professor não encontrado.',
        alunos: []
      });
    }

    const turmasRelacionadas = await turma.findAll({
      include: [{
        model: professor,
        where: { id_professor: dadosProfessor.id_professor },
        through: { attributes: [] }
      }]
    });

    if (turmasRelacionadas.length === 0) {
      return res.render('tela_inserir_notas.html', {
        nome: dadosProfessor.nome,
        matricula: dadosProfessor.matricula,
        disciplina: dadosProfessor.disciplina?.disciplina,
        id_disciplina: dadosProfessor.fk_disciplina,
        erro: 'Nenhuma turma encontrada para o professor.',
        alunos: []
      });
    }

    const turmaSelecionada = turmasRelacionadas[0];

    const alunosDaTurma = await aluno.findAll({
      where: { fk_turma: turmaSelecionada.id_turma }
    });

    const alunosComNotas = await Promise.all(alunosDaTurma.map(async (alunoItem) => {
      const notaAluno = await nota.findOne({
        where: {
          fk_aluno: alunoItem.id_aluno,
          fk_disciplina: dadosProfessor.fk_disciplina
        }
      });

      return {
        id_nota: notaAluno ? notaAluno.id_nota : '',
        nome: alunoItem.nome,
        nota1: notaAluno ? notaAluno.nota1 : 0,
        nota2: notaAluno ? notaAluno.nota2 : 0,
        nota3: notaAluno ? notaAluno.nota3 : 0,
        media: notaAluno ? notaAluno.media : 0,
        nota_final: notaAluno ? notaAluno.nota_final : 0
      };
    }));

    res.render('tela_inserir_notas.html', {
      nome: dadosProfessor.nome,
      matricula: dadosProfessor.matricula,
      turma: turmaSelecionada.turma,
      id_turma: turmaSelecionada.id_turma,
      disciplina: dadosProfessor.disciplina?.disciplina,
      id_disciplina: dadosProfessor.fk_disciplina,
      alunos: alunosComNotas,
      sucesso: req.session.sucesso,
      erro: req.session.erro
    });

    req.session.sucesso = null;
    req.session.erro = null;

  } catch (erro) {
    console.error('Erro ao carregar tela de inserção de notas:', erro);
    res.render('tela_inserir_notas.html', {
      erro: 'Erro ao carregar as notas.',
      alunos: []
    });
  }
}


async function postSalvarNotas(req, res) {
  try {
    const idDisciplina = req.body.id_disciplina;
    const idTurma = req.body.id_turma;
    const idsNotas = req.body['id_nota[]'] || req.body.id_nota; 

    const arrayIdsNotas = Array.isArray(idsNotas) ? idsNotas : [idsNotas];

    for (const idNota of arrayIdsNotas) {
      const nota1 = parseFloat(req.body[`nota1_${idNota}`]) || 0;
      const nota2 = parseFloat(req.body[`nota2_${idNota}`]) || 0;
      const nota3 = parseFloat(req.body[`nota3_${idNota}`]) || 0;

      const media = (nota1 + nota2 + nota3) / 3;
      const nota_final = Math.round(media * 10) / 10;

      const notaAluno = await nota.findByPk(idNota);

      if (notaAluno) {
        await notaAluno.update({
          nota1,
          nota2,
          nota3,
          media,
          nota_final
        });
      } else {
    
      }
    }

    req.session.sucesso = 'Notas salvas com sucesso.';
    res.redirect('/professor/inserir_notas');

  } catch (error) {
    req.session.erro = 'Erro ao salvar as notas.';
    res.redirect('/professor/inserir_notas');
  }
}


module.exports = {
    getTelaProfessor,
    getVisualizarTurmas,
    getInserirNotas,
    postSalvarNotas
};
