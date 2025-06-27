const sequelize = require('../db');
const usuario = require('../models/usuarioModel.js');
const aluno = require('../models/alunoModel');
const professor = require('../models/professorModel');
const administrador = require('../models/administradorModel');
const turma = require('../models/turmaModel');
const turma_professor = require('../models/turma_professor_Model');

usuario.hasOne(aluno, {foreignKey:'fk_usuario', onDelete:'CASCADE'});
aluno.belongsTo(usuario, {foreignKey:'fk_usuario'});

usuario.hasOne(professor, {foreignKey:'fk_usuario', onDelete:'CASCADE'});
professor.belongsTo(usuario, {foreignKey:'fk_usuario'});

usuario.hasOne(administrador, {foreignKey:'fk_usuario', onDelete:'CASCADE'});
administrador.belongsTo(usuario, {foreignKey:'fk_usuario'});

turma.hasMany(aluno, {foreignKey:'fk_turma', onDelete:'SET NULL'});
aluno.belongsTo(turma, {foreignKey:'fk_turma'});

turma.belongsToMany(professor, {
  through: turma_professor,
  foreignKey: 'fk_turma',
  otherKey: 'fk_professor'
});

professor.belongsToMany(turma, {
  through: turma_professor,
  foreignKey: 'fk_professor',
  otherKey: 'fk_turma'
});

module.exports = {
    sequelize,
    usuario,
    aluno,
    professor,
    administrador,
    turma,
    turma_professor
};



