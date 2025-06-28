const express = require ('express');
const router = express.Router();

const professorController = require ('../controller/professorController');
const loginController = require('../controller/loginController');

router.get('/', loginController.verificarAutenticacao, professorController.getTelaProfessor);
router.get('/visualizar_turmas', loginController.verificarAutenticacao, professorController.getVisualizarTurmas);

module.exports = router;