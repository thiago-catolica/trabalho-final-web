const sequelize = require('../db');
const usuario = require('./usuarioModel.js');
const aluno = require('./alunoModel');
const professor = require('./professorModel');
const administrador = require('./administradorModel');
const turma = require('./turmaModel');
const turma_professor = require('./turma_professor_Model');
const disciplina = require('./disciplinaModel.js');
const nota = require ('./notaModel.js');

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


disciplina.hasMany(professor, {foreignKey:'fk_disciplina', onDelete:'SET NULL'});
professor.belongsTo(disciplina, {foreignKey:'fk_disciplina'});


aluno.belongsToMany(disciplina, {
  through: nota,
  foreignKey: 'fk_aluno',
  otherKey: 'fk_disciplina'
});

disciplina.belongsToMany(aluno, {
  through: nota,
  foreignKey: 'fk_disciplina',
  otherKey: 'fk_aluno'
});




module.exports = {
    sequelize,
    usuario,
    aluno,
    professor,
    administrador,
    turma,
    turma_professor,
    disciplina, 
    nota
};



