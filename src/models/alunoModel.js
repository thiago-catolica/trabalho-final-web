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

    fk_usuario : {
        type : Sequelize.INTEGER,
        references : {
            model : 'usuarios',
            key : 'id_usuario'
        }
    },

    fk_turma : {
        type : Sequelize.INTEGER,
        references : {
            model : 'turmas',
            key : 'id_turma'
        }
    }

});

module.exports = aluno;