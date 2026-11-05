const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")

// Configuração da conexão com o BD
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_retrogames"
})

db.connect((erro) => {
    if (erro) {
        console.error("Erro ao conectar o MySQL:", erro)
    } else {
        console.log("Conectado ao BD com sucesso")
    }
})

// Listar Games
const mostrarGames = (req, res) => {
    const sql = "SELECT titulo, plataforma, desenvolvedora, imagem_url, preco FROM jogos"

    db.query(sql, (erro, resultados) => {
        if (erro) {
    console.log(erro)
    return res.status(500).send("Erro ao consultar o BD")
}

        res.send(resultados)
    })
}

// Cadastrar Games
const novoGames = (req, res) => {
    const { titulo, plataforma, desenvolvedora, imagem_url, preco } = req.body

    if (titulo && plataforma && desenvolvedora && imagem_url && preco) {
        const sql = "INSERT INTO jogos (titulo, plataforma, desenvolvedora, imagem_url, preco) VALUES (?, ?, ?, ?, ?)"
        const valores = [titulo, plataforma, desenvolvedora, imagem_url, preco]

        db.query(sql, valores, (erro, resultado) => {
            if (erro) {
                return res.status(500).send("Erro ao inserir game")
            }

            res.send("Game cadastrado com sucesso")
        })
    } else {
        res.status(400).send("Erro: Preencha todos os campos")
    }
}

// Middlewares
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const porta = 3000

// Rotas
app.get("/listar", mostrarGames)
app.post("/cadastrar", novoGames)

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})