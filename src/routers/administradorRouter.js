const express = require ('express');
const router = express.Router();

const administradorController = require ('../controller/administradorController');
const loginController = require('../controller/loginController');

router.get('/', loginController.verificarAutenticacao, administradorController.getTelaAdministrador);
router.get('/gerenciar_professores', loginController.verificarAutenticacao, administradorController.getGerenciarProfessores);
router.get('/gerenciar_alunos', loginController.verificarAutenticacao, administradorController.getGerenciarAlunos);

router.post('/cadastrar_aluno', loginController.verificarAutenticacao, administradorController.postCadastrarAluno);
router.post('/excluir_aluno', loginController.verificarAutenticacao, administradorController.postExcluirAluno);
router.post('/cadastrar_professor', loginController.verificarAutenticacao, administradorController.postCadastrarProfessor);
router.post('/excluir_professor', loginController.verificarAutenticacao, administradorController.postExcluirProfessor);

module.exports = router;