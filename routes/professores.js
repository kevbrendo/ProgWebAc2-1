const express = require('express');
const router = express.Router();
const professoresController = require('../controllers/professoresController.js');

// Rota para obter todos os usuários
router.get('/', professoresController.obterTodos);

router.get('/:id', professoresController.obterPorId);

router.get('/:id/turmas', professoresController.obterPorIdTurmas);

router.put('/:id', professoresController.atualizarProfessor);

router.post('/:id/turmas', professoresController.adicionarTurma);

router.get('/departamento/:departamento', professoresController.listarProfessoresPorDepartamento);

router.delete('/:id', professoresController.removerProfessor);

router.post('/inserirProfessor', professoresController.inserir);

module.exports = router;
