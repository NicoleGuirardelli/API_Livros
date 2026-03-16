const express = require('express');
const app = express();

app.use(express.json());

// array com livros
let livros = [
{ id: 1, titulo: "Dom Casmurro", autor:"Machado de Assis", ano:1899, genero:"Literatura", nota:4.8 },
{ id: 2, titulo: "1984", autor:"George Orwell", ano:1949, genero:"Distopia", nota:3.8 },
{ id: 3, titulo: "Orgulho e Preconceito", autor:"Jane Austen", ano:1813, genero:"Romance", nota:5 },
{ id: 4, titulo: "A Hora da Estrela", autor:"Clarice Lispector", ano:1977, genero:"Literatura", nota:4.7 },
{ id: 5, titulo: "O Grande Gatsby", autor:"F. Scott Fitzgerald", ano:1925, genero:"Drama", nota:4 },
{ id: 6, titulo: "Cem Anos de Solidão", autor:"Gabriel García Márquez", ano:1967, genero:"Fantasia", nota:3.2 },
{ id: 7, titulo: "O Sol é Para Todos", autor:"Harper Lee", ano:1960, genero:"Drama", nota:4.9 },
{ id: 8, titulo: "Torto Arado", autor:"Itamar Vieira Junior", ano:2019, genero:"Literatura", nota:4.8 },
{ id: 9, titulo: "O Senhor dos Anéis", autor:"J.R.R. Tolkien", ano:1954, genero:"Fantasia", nota:4.9 },
{ id: 10, titulo: "Uma Família Feliz", autor:"Raphael Montes", ano:2024, genero:"Thriller", nota:4.5 }
];

// listar livros
app.get('/api/livros', (req, res) => {

const { genero, ordem,direcao, pagina = 1, limite = 5 } = req.query;

let resultado = [...livros];

// filtro por gênero

if (genero) {
    resultado = resultado.filter(f => f.genero.toLowerCase() === genero.toLowerCase());
}

// ordenação
if (ordem) {
resultado = resultado.sort((a, b) => {

if (ordem === 'titulo') {
return direcao === 'desc'
? b.titulo.localeCompare(a.titulo)
: a.titulo.localeCompare(b.titulo);
}

if (ordem === 'nota') {
return direcao === 'desc'
? b.nota - a.nota
: a.nota - b.nota;
}
return 0;
});
}

// paginação
const paginaNum = parseInt(pagina);
const limiteNum = parseInt(limite);

const inicio = (paginaNum - 1) * limiteNum;

const dados = resultado.slice(inicio, inicio + limiteNum);

res.json({
dados,
paginacao: {
pagina_atual: paginaNum,
itens_por_pagina: limiteNum,
total: resultado.length
}
});

});

// buscar por id
app.get('/api/livros/:id', (req, res) => {

const id = parseInt(req.params.id);

const livro = livros.find(l => l.id === id);

if (!livro) {
return res.status(404).json({ erro: "Livro não encontrado" });
}

res.json(livro);

});



app.listen(3000, () => {
console.log("API rodando na porta 3000");
});