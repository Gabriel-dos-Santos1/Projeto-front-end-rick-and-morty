
const container = document.getElementById("personagens");
const mensagem = document.getElementById("mensagem");
const busca = document.getElementById("busca");

let personagens = [];

function criarCards(lista) {
  container.replaceChildren();

  lista.forEach(personagem => {
    const card = document.createElement("article");
    card.className = "card";

    const imagem = document.createElement("img");
    imagem.src = personagem.image;
    imagem.alt = personagem.name;

    const nome = document.createElement("h3");
    nome.textContent = personagem.name;

    const especie = document.createElement("p");
    especie.textContent = "Espécie: " + personagem.species;

    const status = document.createElement("p");
    status.textContent = "Status: " + personagem.status;

    card.appendChild(imagem);
    card.appendChild(nome);
    card.appendChild(especie);
    card.appendChild(status);

    container.appendChild(card);
  });

  mensagem.textContent = lista.length
    ? ""
    : "Nenhum personagem encontrado.";
}

function carregarPersonagens() {
  fetch("https://rickandmortyapi.com/api/character")
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error("Falha ao consultar a API");
      }
      return resposta.json();
    })
    .then(dados => {
      personagens = dados.results;
      criarCards(personagens);
      console.log("Dados recebidos da API:", dados);
    })
    .catch(erro => {
      mensagem.textContent = "Erro ao carregar personagens.";
      console.error(erro);
    });
}

busca.addEventListener("input", () => {
  const termo = busca.value.toLowerCase();

  const filtrados = personagens.filter(personagem =>
    personagem.name.toLowerCase().includes(termo)
  );

  criarCards(filtrados);
});

carregarPersonagens();
