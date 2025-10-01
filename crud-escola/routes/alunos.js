const express = require('express');
const router = express.Router();

let alunos = [
  { id: 1, nome: "João Silva", email: "joao@email.com", cpf: "12345678901", telefone: "11999999999", dataNascimento: "2000-05-10" },
  { id: 2, nome: "Maria Souza", email: "maria@email.com", cpf: "98765432100", telefone: "11988888888", dataNascimento: "1999-08-20" }
];
let nextId = 3;

// GET - Listar
router.get('/', (req, res, next) => 
    res.json(alunos)
);

// GET/:id - Buscar por ID
router.get('/:id', (req, res, next) => {
  const aluno = alunos.find(a => a.id === parseInt(req.params.id));
  if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });
  res.json(aluno);
});

// POST - Criar novo
router.post('/', (req, res, next) => {
  const { nome, email, cpf, telefone, dataNascimento } = req.body;
  if (!nome || !email || !cpf) return res.status(400).json({ error: "Nome, e-mail e CPF são obrigatórios" });
  if (alunos.find(a => a.cpf === cpf)) return res.status(400).json({ error: "CPF já cadastrado" });

  const novoAluno = { id: nextId++, nome, email, cpf, telefone, dataNascimento };
  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

// PUT/:id - Atualizar
router.put('/:id', (req, res, next) => {
  const aluno = alunos.find(a => a.id === parseInt(req.params.id));
  if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });

  const { nome, email, cpf, telefone, dataNascimento } = req.body;
  aluno.nome = nome || aluno.nome;
  aluno.email = email || aluno.email;
  aluno.cpf = cpf || aluno.cpf;
  aluno.telefone = telefone || aluno.telefone;
  aluno.dataNascimento = dataNascimento || aluno.dataNascimento;

  res.json(aluno);
});

// DELETE/:id - Deletar
router.delete('/:id', (req, res, next) => {
  const index = alunos.findIndex(a => a.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Aluno não encontrado" });

  const removido = alunos.splice(index, 1);
  res.json(removido[0]);
});

module.exports = router;
