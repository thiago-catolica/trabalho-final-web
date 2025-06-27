const Sequelize = require ('sequelize');
const db = require('../db');

const turma = db.define('turma', {
    id_turma : {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },

    turma : {
        type : Sequelize.STRING,
        unique : true
    }
});

module.exports = turma;