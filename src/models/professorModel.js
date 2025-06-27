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

    disciplina : {
        type : Sequelize.ENUM('Português', 'Matemática', 'Ciências', 'História', 'Geografia'),
    },

    fk_usuario : {
        type : Sequelize.INTEGER,

        references : {
            model : 'usuario',
            key : 'id_usuario'
        }
    }
    
});

module.exports = professor;