const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

// conectar ao banco 
const db = new sqlite3.Database(__dirname + '/database.db');

// criar tabela se não existir
db.serialize(() => {
    db.run(`
CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    ano INTEGER NOT NULL,
    genero TEXT NOT NULL,
    nota REAL NOT NULL
)
`);

    db.get("SELECT COUNT(*) AS total FROM livros", (err, row) => {
        if (err) {
            console.error("Erro ao contar livros:", err.message);
            return;
        }

        if (row.total === 0) {
            const livrosIniciais = [
                ["1984", "George Orwell", 1949, "Distopia", 4.8],
                ["O Pequeno Príncipe", "Antoine de Saint-Exupéry", 1943, "Infantil", 4.7],
                ["Dom Casmurro", "Machado de Assis", 1899, "Romance", 4.5],
                ["A Revolução dos Bichos", "George Orwell", 1945, "Satírico", 4.6],
                ["Cem Anos de Solidão", "Gabriel García Márquez", 1967, "Realismo mágico", 4.9],
                ["O Alquimista", "Paulo Coelho", 1988, "Ficção", 4.2],
                ["Grande Sertão: Veredas", "João Guimarães Rosa", 1956, "Romance", 4.4],
                ["A Cabana", "William P. Young", 2007, "Drama", 4.1],
                ["O Hobbit", "J.R.R. Tolkien", 1937, "Fantasia", 4.8],
                ["Ensaio sobre a cegueira", "José Saramago", 1995, "Distopia", 4.3]
            ];

            const inserir = db.prepare(`
                INSERT INTO livros (titulo, autor, ano, genero, nota)
                VALUES (?, ?, ?, ?, ?)
            `);

            livrosIniciais.forEach((livro) => inserir.run(livro));
            inserir.finalize();
        }
    });
});


// =========================
// GET - LISTAR LIVROS
// =========================
app.get('/api/livros', (req, res) => {
    const { genero, ordem, direcao, pagina = 1, limite = 5 } = req.query;

    let query = "SELECT * FROM livros WHERE 1=1";
    let params = [];

    if (genero) {
        query += " AND LOWER(genero) = LOWER(?)";
        params.push(genero);
    }

    if (ordem === 'titulo' || ordem === 'nota') {
        query += ` ORDER BY ${ordem} ${direcao === 'desc' ? 'DESC' : 'ASC'}`;
    }

    const offset = (pagina - 1) * limite;
    query += " LIMIT ? OFFSET ?";
    params.push(parseInt(limite), parseInt(offset));

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });

        db.get("SELECT COUNT(*) as total FROM livros", [], (err2, count) => {
            if (err2) return res.status(500).json({ erro: err2.message });

            res.json({
                dados: rows,
                paginacao: {
                    pagina_atual: parseInt(pagina),
                    itens_por_pagina: parseInt(limite),
                    total: count.total
                }
            });
        });
    });
});

// =========================
// GET - POR ID
// =========================
app.get('/api/livros/:id', (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM livros WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ erro: err.message });

        if (!row) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }

        res.json(row);
    });
});

// =========================
// POST - CRIAR
// =========================
app.post('/api/livros', (req, res) => {
    const { titulo, autor, ano, genero, nota } = req.body;

    if (!titulo || !autor || !ano || !genero || nota === undefined) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    if (typeof ano !== 'number' || typeof nota !== 'number') {
        return res.status(400).json({ erro: "Ano e nota devem ser números" });
    }

    if (nota < 0 || nota > 5) {
        return res.status(400).json({ erro: "Nota deve ser entre 0 e 5" });
    }

    const query = `
        INSERT INTO livros (titulo, autor, ano, genero, nota)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(query, [titulo, autor, ano, genero, nota], function(err) {
        if (err) return res.status(500).json({ erro: err.message });

        db.get("SELECT * FROM livros WHERE id = ?", [this.lastID], (err2, row) => {
            if (err2) return res.status(500).json({ erro: err2.message });

            res.status(201).json(row);
        });
    });
});

// =========================
// PUT - ATUALIZAR
// =========================
app.put('/api/livros/:id', (req, res) => {
    const id = req.params.id;
    const { titulo, autor, ano, genero, nota } = req.body;

    if (!titulo || !autor || !ano || !genero || nota === undefined) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    if (typeof ano !== 'number' || typeof nota !== 'number') {
        return res.status(400).json({ erro: "Ano e nota devem ser números" });
    }

    if (nota < 0 || nota > 5) {
        return res.status(400).json({ erro: "Nota deve ser entre 0 e 5" });
    }

    db.get("SELECT * FROM livros WHERE id = ?", [id], (err, row) => {
        if (!row) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }

        const query = `
            UPDATE livros
            SET titulo = ?, autor = ?, ano = ?, genero = ?, nota = ?
            WHERE id = ?
        `;

        db.run(query, [titulo, autor, ano, genero, nota, id], function(err2) {
            if (err2) return res.status(500).json({ erro: err2.message });

            db.get("SELECT * FROM livros WHERE id = ?", [id], (err3, updated) => {
                res.json(updated);
            });
        });
    });
});

// =========================
// DELETE
// =========================
app.delete('/api/livros/:id', (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM livros WHERE id = ?", [id], (err, row) => {
        if (!row) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }

        db.run("DELETE FROM livros WHERE id = ?", [id], function(err2) {
            if (err2) return res.status(500).json({ erro: err2.message });

            res.status(204).send();
        });
    });
});

// iniciar servidor
app.listen(3000, () => {
    console.log("API com banco rodando na porta 3000");
});