const Sequelize = require ('sequelize');
const db = require('../db');

const turma_professor = db.define('turma_professor', {
    id_turma_professor : {
        type : Sequelize.INTEGER,
        autoIncrement : true, 
        allowNull : false, 
        primaryKey : true
    },

    fk_turma : {
        type : Sequelize.INTEGER,
        onDelete : 'SET NULL',
        references : {
            model : 'turmas',
            key : 'id_turma'
        }
    },

    fk_professor : {
        type : Sequelize.INTEGER,
        onDelete : 'CASCADE',
        references : {
            model : 'professors',
            key : 'id_professor'
        }
    }
});

module.exports = turma_professor;