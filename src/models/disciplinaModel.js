const Sequelize = require ('sequelize');
const db = require('../db');

const disciplina = db.define('disciplina', {
    id_disciplina : {
        type : Sequelize.INTEGER,
                autoIncrement : true, 
                allowNull : false, 
                primaryKey : true
    },

    disciplina : {
        type : Sequelize.ENUM('Matemática', 'Português', 'Ciências', 'História', 'Geografia')
    }
});

module.exports = disciplina;