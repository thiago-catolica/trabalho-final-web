const Sequelize = require ('sequelize');
const db = require('../db');

const aluno = db.define('aluno', {
    id_aluno : {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },

    nome : {
        type : Sequelize.STRING
    },

    matricula : {
        type : Sequelize.STRING,
        unique : true
    },

    nota1 : {
        type : Sequalize.FLOAT,
        allowNull : true
    },

    nota2 : {
        type : Sequalize.FLOAT,
        allowNull : true
    },

    nota3 : {
        type : Sequalize.FLOAT,
        allowNull : true
    },

    nota4 : {
        type : Sequalize.FLOAT,
        allowNull : true
    },

    fk_usuario : {
        type : Sequelize.INTEGER,
        references : {
            model : 'usuario',
            key : 'id_usuario'
        }
    },

    fk_turma : {
        type : Sequelize.INTEGER,
        references : {
            model : 'turma',
            key : 'id_turma'
        }
    }

});

module.exports = aluno;