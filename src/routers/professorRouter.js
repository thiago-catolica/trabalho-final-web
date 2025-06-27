const express = require ('express');
const router = express.Router();

const professorController = require ('../controller/professorController');

router.get('/', professorController.getTelaProfessor);
router.get('/visualizar_turmas', professorController.getVisualizarTurmas);
router.get('/inserir_notas', professorController.getInserirNotas);

module.exports = router;