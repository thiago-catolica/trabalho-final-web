const {administrador, usuario, aluno, turma, professor, disciplina, turma_professor}  = require('../models/indexModel');

function getTelaAdministrador(req, res){
    res.render('tela_administrador.html');
}

async function getGerenciarProfessores(req, res) {
  try {
    const Usuario = await usuario.findOne({
      where: { email: req.session.email },
      attributes: ['id_usuario']
    });

    const Usuario_admin = await administrador.findOne({
      where: { fk_usuario: Usuario.id_usuario },
      attributes: ['nome', 'id_administrador']
    });

    const professores = await professor.findAll({
      include: [
        {
          model: usuario,
          attributes: ['email']
        },
        {
          model: disciplina,
          attributes: ['disciplina']
        },
        {
          model: turma,
          through: { attributes: [] }, 
          attributes: ['turma']
        }
      ]
    });

    const professores_formatados = professores.map(p => ({
      id_professor: p.id_professor,
      nome: p.nome,
      matricula: p.matricula,
      disciplina: p.disciplina ? p.disciplina.disciplina : '',
      email: p.usuario ? p.usuario.email : '',
      turmas: p.turmas.map(t => t.turma).join(', ')
    }));

    const dados = {
      nome: Usuario_admin.nome,
      id: Usuario_admin.id_administrador,
      professores: professores_formatados,
      sucesso: req.session.sucesso,
      error: req.session.erro
    };

    req.session.sucesso = null;
    req.session.erro = null;

    res.render('tela_gerenciar_professores.html', dados);

  } catch (erro) {
    req.session.erro = 'Erro ao carregar dados dos professores.';
    res.redirect('/administrador/gerenciar_professores');
  }
}


async function getGerenciarAlunos(req, res) {
  
    const Usuario = await usuario.findOne({
      where: { email: req.session.email },
      attributes: ['id_usuario']
    });

    const Usuario_admin = await administrador.findOne({
      where: { fk_usuario: Usuario.id_usuario },
      attributes: ['nome', 'id_administrador']
    });

    const alunos = await aluno.findAll({
      include: [{ model: turma, attributes: ['turma'] }]
    });

    const sucesso = req.session.sucesso;
    const erro = req.session.erro;
    req.session.sucesso = null;
    req.session.erro = null;

    const dados = {
      id: Usuario_admin.id_administrador,
      nome: Usuario_admin.nome,
      alunos: alunos.map(a => ({
        nome: a.nome,
        matricula: a.matricula,
        turma: a.turma.turma,
        id_aluno: a.id_aluno
      })),
      sucesso,
      erro
    };

    res.render('tela_gerenciar_alunos.html', dados);
  
    
}

async function postCadastrarAluno(req, res) {
  try {
    const email_existe = await usuario.findOne({ where: { email: req.body.email } });
    if (email_existe) {
      req.session.erro = 'E-mail já existe.';
      return res.redirect('/administrador/gerenciar_alunos');
    }

    const insert_usuario = await usuario.create({
      email: req.body.email,
      senha: req.body.senha,
      tipo_usuario: 'Aluno'
    });

    const get_fk_turma = await turma.findOne({
      where: { turma: req.body.turma }
    });

    if (!get_fk_turma) {
      req.session.erro = 'Turma informada não encontrada.';
      return res.redirect('/administrador/gerenciar_alunos');
    }

    const dados_aluno = {
      nome: req.body.nome,
      matricula: req.body.matricula,
      fk_usuario: insert_usuario.id_usuario,
      fk_turma: get_fk_turma.id_turma
    };

    const novoAluno = await aluno.create(dados_aluno);

    const disciplinas = await disciplina.findAll();

    const notasIniciais = disciplinas.map(d => ({
      fk_aluno: novoAluno.id_aluno,
      fk_disciplina: d.id_disciplina,
      nota1: 0,
      nota2: 0,
      nota3: 0,
      media: 0,
      nota_final: 0
    }));

    await nota.bulkCreate(notasIniciais);

    req.session.sucesso = 'Aluno cadastrado com sucesso.';
    res.redirect('/administrador/gerenciar_alunos');

  } catch (erro) {
    console.error('Erro ao cadastrar aluno:', erro);
    req.session.erro = 'Erro ao cadastrar aluno.';
    res.redirect('/administrador/gerenciar_alunos');
  }
}


async function postExcluirAluno(req, res) {
  try {
    await aluno.destroy({
      where: {
        id_aluno: req.body.id_aluno
      }
    });

    req.session.sucesso = 'Aluno excluído com sucesso.';
    res.redirect('/administrador/gerenciar_alunos');
  } catch (erro) {
    console.error('Erro ao excluir aluno:', erro);
    req.session.erro = 'Erro ao excluir aluno.';
    res.redirect('/administrador/gerenciar_alunos');
  }
}

async function postCadastrarProfessor(req, res) {
  try {
    const email_existe = await usuario.findOne({ where: { email: req.body.email } });
    if (email_existe) {
      req.session.erro = 'E-mail já existe.';
      return res.redirect('/administrador/gerenciar_professores');
    }

    const insert_usuario = await usuario.create({
      email: req.body.email,
      senha: req.body.senha,
      tipo_usuario: 'Professor'
    });

    const get_fk_disciplina = await disciplina.findOne({
      where: { disciplina: req.body.disciplina }
    });

    if (!get_fk_disciplina) {
      req.session.erro = 'Disciplina informada não encontrada.';
      return res.redirect('/administrador/gerenciar_professores');
    }

    const dados_professor = {
      nome: req.body.nome,
      matricula: req.body.matricula,
      fk_usuario: insert_usuario.id_usuario,
      fk_disciplina: get_fk_disciplina.id_disciplina
    };

    const insert_professor = await professor.create(dados_professor);

    const turmas = req.body.turmas.split(',').map(t => t.trim());

    for (const nome_turma of turmas) {
      const encontrouTurma = await turma.findOne({ where: { turma: nome_turma } });

      if (encontrouTurma != null) {
        await turma_professor.create({
          fk_professor: insert_professor.id_professor,
          fk_turma: encontrouTurma.id_turma
        });
      }
    }

    req.session.sucesso = 'Professor cadastrado com sucesso.';
    res.redirect('/administrador/gerenciar_professores');

  } catch (erro) {
    req.session.erro = 'Erro ao cadastrar professor.';
    res.redirect('/administrador/gerenciar_professores');
  }
}

async function postExcluirProfessor(req, res) {
  try {
    const id_professor = req.body.id_professor;

    const professor_existe = await professor.findOne({
      where: { id_professor : id_professor },
      attributes: ['fk_usuario']
    });

    if (!professor_existe) {
      req.session.erro = 'Professor não encontrado.';
      return res.redirect('/administrador/gerenciar_professores');
    }

    await professor.destroy({
      where: { id_professor }
    });

    await usuario.destroy({
      where: { id_usuario: professor_existe.fk_usuario }
    });

    req.session.sucesso = 'Professor excluído com sucesso.';
    res.redirect('/administrador/gerenciar_professores');

  } catch (erro) {
    console.error('Erro ao excluir professor:', erro);
    req.session.erro = 'Erro ao excluir professor.';
    res.redirect('/administrador/gerenciar_professores');
  }
}


module.exports = {
    getTelaAdministrador,
    getGerenciarProfessores,
    getGerenciarAlunos,
    postCadastrarAluno,
    postExcluirAluno,
    postCadastrarProfessor,
    postExcluirProfessor
};