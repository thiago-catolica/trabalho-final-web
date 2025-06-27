const express = require ('express');
const router = express.Router();

const alunoController = require ('../controller/alunoController');

router.get('/', alunoController.getTelaAluno);

module.exports = router;