const express = require ('express');
const router = express.Router();

const administradorController = require ('../controller/administradorController');

router.get('/', administradorController.getTelaAdministrador);
router.get('/gerenciar_professores', administradorController.getGerenciarProfessores);
router.get('/gerenciar_alunos', administradorController.getGerenciarAlunos);

router.post('/cadastrar_aluno', administradorController.postCadastrarAluno);
router.post('/excluir_aluno', administradorController.postExcluirAluno);
router.post('/cadastrar_professor', administradorController.postCadastrarProfessor);
router.post('/excluir_professor', administradorController.postExcluirProfessor);

module.exports = router;