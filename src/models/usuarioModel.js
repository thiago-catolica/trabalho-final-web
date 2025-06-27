const Sequelize = require ('sequelize');
const db = require('../db');

const usuario = db.define('usuario', {
    id_usuario : {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },

    email : {
        type : Sequelize.STRING,
        unique : true
    },

    senha : {
        type : Sequelize.STRING
    },

    tipo_usuario : {
        type : Sequelize.ENUM('Administrador', 'Professor', 'Aluno')
    }
});

module.exports = usuario;