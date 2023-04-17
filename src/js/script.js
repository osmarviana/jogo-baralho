/* Variáveis */

const takeCard1 = document.getElementById("take-card-01");
const takeCard2 = document.getElementById("take-card-02");

const compare = document.getElementById("btn-compare");

let player01Cartas = [];
let player02Cartas = [];
// let player01CartasNipe = [];
// let player02CartasNipe = [];

/* EventListener */

takeCard1.addEventListener("click", () => {
  tirarUmaCartaAleatoriaDoBaralhoPlayer01();
});

takeCard2.addEventListener("click", () => {
  tirarUmaCartaAleatoriaDoBaralhoPlayer02();
});

compare.addEventListener("click", () => {
  if (player01Cartas.length === 0 || player02Cartas.length === 0) {
    alert("Os dois jogadores precisam tirar carta antes de comparar!");
  } else {
    compararCartas();
  }
});

/* Deck do Player 02 */

async function criarBaralhoEmbaralhado() {
  const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
  const resposta = await fetch(url);
  return await resposta.json();
}

async function tirarUmaCarta(deck_id) {
  const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
  const resposta = await fetch(url);
  return await resposta.json();
}

async function tirarUmaCartaAleatoriaDoBaralhoPlayer01() {
  const baralho = await criarBaralhoEmbaralhado();
  const carta = await tirarUmaCarta(baralho.deck_id);
  const valorCarta = getValorCarta(carta.cards[0].value);

  player01Cartas.push(valorCarta);
  document.getElementById("card-01").src = carta.cards[0].image;

  console.log(`Jogador 1 tirou a carta ${valorCarta}.`);
}

/* Deck do Player 01 */

async function criarOutroBaralhoEmbaralhado() {
  const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
  const resposta = await fetch(url);
  return await resposta.json();
}

async function tirarOutraCarta(deck_id) {
  const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
  const resposta = await fetch(url);
  return await resposta.json();
}

async function tirarUmaCartaAleatoriaDoBaralhoPlayer02() {
  const baralho = await criarOutroBaralhoEmbaralhado();
  const carta = await tirarOutraCarta(baralho.deck_id);
  const valorCarta = getValorCarta(carta.cards[0].value);
  // const nipeCarta = carta.cards[0].suit;

  // player02CartasNipe.push(nipeCarta);
  player02Cartas.push(valorCarta);
  document.getElementById("card-02").src = carta.cards[0].image;

  console.log(`Jogador 2 tirou a carta ${valorCarta}.`);
}

/* Comparando as cartas do PLayer 01 x Player 02 */

function getValorCarta(valor) {
  switch (valor) {
    case "ACE":
      return 14;
    case "KING":
      return 13;
    case "QUEEN":
      return 12;
    case "JACK":
      return 11;
    default:
      return parseInt(valor);
  }
}

function compararCartas() {
  const jogador1CartaMaisAlta = Math.max(...player01Cartas);
  const jogador2CartaMaisAlta = Math.max(...player02Cartas);

  if (jogador1CartaMaisAlta > jogador2CartaMaisAlta) {
    alert("Jogador 1 ganhou! 🏆");
  } else if (jogador1CartaMaisAlta < jogador2CartaMaisAlta) {
    alert("Jogador 2 ganhou! 🏆");
  } else if (jogador1CartaMaisAlta === jogador2CartaMaisAlta) {
    alert("Empate! ⚔");
  } else {
    alert("Os dois jogadores precisam tirar carta.");
  }
  reiniciarJogo();
  return;
}

// Reiniciar jogo após comparar

function reiniciarJogo() {
  player01Cartas = [];
  player02Cartas = [];
  // player01CartasNipe = [];
  // player02CartasNipe = [];
  document.getElementById("card-01").src = "./src/img/deck-01.png";
  document.getElementById("card-02").src = "./src/img/deck-02.png";
}

// Espadas (mais forte) spades
// Copas hearts
// Ouros diamonds
// Paus (mais fraco) clubs
