const express = require('express');
const router = express.Router();

let professores = [
  { id: 1, nome: "Carlos Lima", email: "carlos@email.com", cpf: "11122233344", curso: "Matemática", disciplina: "Álgebra" },
  { id: 2, nome: "Ana Pereira", email: "ana@email.com", cpf: "55566677788", curso: "Física", disciplina: "Mecânica" }
];
let nextId = 3;

// GET - Listar todos os professores
router.get('/', (req, res) => res.json(professores));

// GET/:id - Buscar professor por ID
router.get('/:id', (req, res) => {
  const professor = professores.find(p => p.id === parseInt(req.params.id));
  if (!professor) return res.status(404).json({ error: "Professor não encontrado" });
  res.json(professor);
});

// POST - Criar novo professor
router.post('/', (req, res) => {
  const { nome, email, cpf, curso, disciplina } = req.body;
  if (!nome || !email || !cpf) return res.status(400).json({ error: "Nome, e-mail e CPF são obrigatórios" });
  if (professores.find(p => p.cpf === cpf)) return res.status(400).json({ error: "CPF já cadastrado" });

  const novoProfessor = { id: nextId++, nome, email, cpf, curso, disciplina };
  professores.push(novoProfessor);
  res.status(201).json(novoProfessor);
});

// PUT/:id - Atualizar professor
router.put('/:id', (req, res) => {
  const professor = professores.find(p => p.id === parseInt(req.params.id));
  if (!professor) return res.status(404).json({ error: "Professor não encontrado" });

  const { nome, email, cpf, curso, disciplina } = req.body;
  professor.nome = nome || professor.nome;
  professor.email = email || professor.email;
  professor.cpf = cpf || professor.cpf;
  professor.curso = curso || professor.curso;
  professor.disciplina = disciplina || professor.disciplina;

  res.json(professor);
});

// DELETE/:id - Deletar professor
router.delete('/:id', (req, res) => {
  const index = professores.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Professor não encontrado" });

  const removido = professores.splice(index, 1);
  res.json(removido[0]);
});

module.exports = router;
