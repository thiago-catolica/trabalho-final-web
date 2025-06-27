const Sequelize = require ('sequelize');
const db = require('../db');

const professor = db.define('professor', {
    id_professor : {
        type : Sequelize.INTEGER,
        autoIncrement : true, 
        allowNull : false, 
        primaryKey : true
    },

    nome : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : false
    },

    matricula : {
        type : Sequelize.STRING,
        unique : true
    },

    fk_disciplina : {
        type : Sequelize.INTEGER,
        references : {
            model : 'disciplinas',
            key : 'id_disciplina'
        }
    },

    fk_usuario : {
        type : Sequelize.INTEGER,

        references : {
            model : 'usuarios',
            key : 'id_usuario'
        }
    }
    
});

module.exports = professor;