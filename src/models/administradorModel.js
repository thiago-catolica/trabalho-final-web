const Sequelize = require ('sequelize');
const db = require('../db');

const administrador = db.define('administrador', {
    id_administrador : {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },

    nome : {
        type : Sequelize.STRING
    },

    fk_usuario : {
        type : Sequelize.INTEGER,
        references : {
            model : 'usuarios',
            key : 'id_usuario'
        }
    }

});

module.exports = administrador;