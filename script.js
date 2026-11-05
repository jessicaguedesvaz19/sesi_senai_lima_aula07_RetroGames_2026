const API_URL = "http://localhost:3000"

const btnCadastrar = document.getElementById('btnCadastrar')
const btnCancelar = document.getElementById('btnCancelar')
const modal = document.getElementById('modalCadastro')
const form = document.getElementById('formGame')
const lista = document.getElementById('listarGames')
const mensagemVazia = document.getElementById('mensagemVazia')

btnCadastrar.addEventListener('click', () => {
    modal.showModal()
})

btnCancelar.addEventListener('click', () => {
    modal.close()
})

// Carregar Games
async function carregarGames() {
    try {
        const resposta = await fetch(API_URL + '/listar')
        const games = await resposta.json()

        lista.innerHTML = ""

        if (games.length === 0) {
            mensagemVazia.hidden = false
            lista.appendChild(mensagemVazia)
            return
        }

        mensagemVazia.hidden = true

        games.forEach(game => {
            criarCard(game.titulo, game.plataforma, game.desenvolvedora, game.imagem_url, game.preco)
        })

    } catch (erro) {
        console.error("Erro ao carregar games:", erro);
        alert("Não foi possível conectar ao servidor");
    }
}

// Cadastrar Game
form.addEventListener('submit', async (evento) => {
    evento.preventDefault()

    const novoGame = {
        titulo: document.getElementById("titulo").value.trim(),
        plataforma: document.getElementById("plataforma").value.trim(),
        desenvolvedora: document.getElementById("desenvolvedora").value.trim(),
        imagem_url: document.getElementById("imagem").value.trim(),
        preco: Number(document.getElementById("preco").value)
    }

    try {
        const resposta = await fetch(API_URL + '/cadastrar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoGame)
        })

        if (resposta.ok) {
            form.reset()
            modal.close()
            carregarGames()
        } else {
            alert("Erro ao salvar game. Verifique o banco de dados")
        }

    } catch (erro) {
        console.error("Erro na requisição:", erro)
        alert("Erro de conexão com o servidor")
    }
})

// Criar Card
function criarCard(titulo, plataforma, desenvolvedora, imagem, preco) {

    const card = document.createElement("article")
    card.classList.add("card-game")

    const capa = document.createElement("div")
    capa.classList.add("capa")

    const imagemCapa = document.createElement("img")
    imagemCapa.src = imagem
    imagemCapa.alt = "Capa do jogo " + titulo

    capa.appendChild(imagemCapa)

    const info = document.createElement("div")
    info.classList.add("info-game")

    const nomeJogo = document.createElement("h3")
    nomeJogo.textContent = titulo

    const nomePlataforma = document.createElement("p")
    nomePlataforma.textContent = "Plataforma: " + plataforma

    const nomeDesenvolvedora = document.createElement("p")
    nomeDesenvolvedora.textContent = "Desenvolvedora: " + desenvolvedora

    const valor = document.createElement("strong")
    valor.classList.add("preco")

    valor.textContent = preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    info.append(nomeJogo, nomePlataforma, nomeDesenvolvedora, valor)

    card.append(capa, info)

    lista.appendChild(card)
}

carregarGames()