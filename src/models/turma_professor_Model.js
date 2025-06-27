const Sequelize = require ('sequelize');
const db = require('../db');

const turma_professor = db.define('turma_professor', {
    fk_turma : {
        type : Sequelize.INTEGER,
        references : {
            model : 'turma',
            key : 'id_turma'
        }
    },

    fk_professor : {
        type : Sequelize.INTEGER,
        references : {
            model : 'professor',
            key : 'id_professor'
        }
    }
});

module.exports = turma_professor;