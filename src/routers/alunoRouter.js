const express = require ('express');
const router = express.Router();

const alunoController = require ('../controller/alunoController');
const loginController = require('../controller/loginController');

router.get('/', loginController.verificarAutenticacao, alunoController.getTelaAluno);

module.exports = router;