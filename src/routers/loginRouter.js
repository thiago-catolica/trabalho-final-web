const express = require ('express');
const router = express.Router();

const loginController = require ('../controller/loginController');

router.get('/', loginController.getTelaLogin);
router.get('/logout', loginController.logout);
router.get('/recuperar_senha', loginController.getRecuperarSenha);

router.post('/login', loginController.verificarLogin);
router.post('/alterar_senha', loginController.recuperar_senha);

module.exports = router;