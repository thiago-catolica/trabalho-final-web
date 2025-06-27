const express = require ('express');
const mustacheExpress = require ('mustache-express');
const app = express();
const db = require('./src/db');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');

app.use(express.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public'));

app.use('/', require ('./src/routers/loginRouter'));

db.sync().then(() => {
    console.log("Banco de Dados sincronizado.");
}).catch((err) => {
    console.error("Erro ao sincronizar o banco:", err);
});


const PORT = 8080;
app.listen(PORT, function() {
    console.log("App em execução na porta " + PORT);
});
