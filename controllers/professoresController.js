const professorModel = require('../models/professor')
const Professor = require('../models/professor');

exports.obterTodos = async (req, res) => {
    try {
        const professores = await Professor.find();
        res.status(200).json(professores);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

exports.obterPorId = async (req, res) => {
    try {
        const id = req.params.id
        const professores = await Professor.findOne({ id: req.params.id });
        res.status(200).json(professores);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

exports.obterPorIdTurmas = async (req, res) => {
    try {
        const id = req.params.id;
        const professores = await Professor.findOne({ id: req.params.id });
        res.status(200).json(professores.turmas);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

exports.atualizarProfessor = async (req, res) => {
    try {
        const professorId = req.params.id;
        const { nome, idade, departamento } = req.body;

        const updatedProfessor = await Professor.findOneAndUpdate(
            { id: professorId },
            { nome, idade, departamento },
            { new: true, runValidators: true }
        );

        if (!updatedProfessor) {
            return res.status(404).json({ message: "Id não existente" });
        }

        res.status(200).json(updatedProfessor);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar professor", error: error.message });
    }
};

exports.adicionarTurma = async (req, res) => {
    try {
        const professorId = req.params.id;
        const { codigo, disciplina, alunos } = req.body;

        const professor = await Professor.findOne({ id: professorId });

        if (!professor) {
            return res.status(404).json({ message: "Id não existente" });
        }

        professor.turmas.push({ codigo, disciplina, alunos });

        await professor.save();

        res.status(201).json(professor);
    } catch (error) {
        res.status(500).json({ message: "Erro ao adicionar turma", error: error.message });
    }
};

exports.listarProfessoresPorDepartamento = async (req, res) => {
    try {
        const departamento = req.params.departamento;

        const professores = await Professor.find({ departamento });

        res.status(200).json(professores);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar professores", error: error.message });
    }
};

exports.inserir = async (req, res) => {
    try {
        const savedProfessor = await Professor.create(req.body);

        res.status(201).json(savedProfessor);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

exports.removerProfessor = async (req, res) => {
    try {
        const professorId = req.params.id;

        const deletedProfessor = await Professor.findOneAndDelete({id:professorId});

        if (!deletedProfessor) {
            return res.status(404).json({ message: "Id não existente" });
        }

        res.status(200).json({ message: "Professor removido com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover professor", error: error.message });
    }
};
