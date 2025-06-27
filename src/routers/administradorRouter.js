const express = require ('express');
const router = express.Router();

const administradorController = require ('../controller/administradorController');

router.get('/', administradorController.getTelaAdministrador);
router.get('/gerenciar_professores', administradorController.getGerenciarProfessores);
router.get('/gerenciar_alunos', administradorController.getGerenciarAlunos);

module.exports = router;