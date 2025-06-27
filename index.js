const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const session = require ('express-session');
const { sequelize } = require('./src/models/indexModel');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'secret-token',
    name: 'sessionId',
    resave: false,
    saveUninitialized: false
}));

app.use('/', require('./src/routers/loginRouter'));
app.use('/administrador', require('./src/routers/administradorRouter'));
app.use('/professor', require('./src/routers/professorRouter'));
app.use('/aluno', require('./src/routers/alunoRouter'));

const PORT = 8080;

sequelize.sync()
  .then(() => {
    console.log("Banco de Dados sincronizado.");
    app.listen(PORT, () => {
      console.log("App em execução na porta " + PORT);
    });
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco:", err);
  });
