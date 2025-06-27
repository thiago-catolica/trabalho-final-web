const Sequelize = require ('sequelize');
const db = require('../db');

const nota = db.define('nota', {
    id_nota : {
        type : Sequelize.INTEGER,
        autoIncrement : true, 
        allowNull : false, 
        primaryKey : true
    },

    fk_aluno : {
        type : Sequelize.INTEGER,
        onDelete : 'SET NULL',
        references : {
            model : 'alunos',
            key : 'id_aluno'
        }
    },

    fk_disciplina : {
        type : Sequelize.INTEGER,
        onDelete : 'SET NULL',
        references : {
            model : 'disciplinas',
            key : 'id_disciplina'
        }
    },

    nota1 : {
        type : Sequelize.FLOAT,
    },

    nota2 : {
        type : Sequelize.FLOAT
    },

    nota3 : {
        type : Sequelize.FLOAT
    },

    media : {
        type : Sequelize.FLOAT
    },

    nota_final : {
        type : Sequelize.FLOAT
    }
    
});

module.exports = nota;