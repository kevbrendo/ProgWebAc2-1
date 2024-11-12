const mongoose = require('mongoose');

const turma = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
  },
  disciplina: {
    type: String,
    required: true,
  },
  alunos: [
    {
      type: String,
    },
  ],
});

const professor = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  idade: {
    type: Number,
    required: true,
  },
  departamento: {
    type: String,
    required: true,
  },
  turmas: [turma],
});

module.exports = mongoose.model('Professor', professor);
