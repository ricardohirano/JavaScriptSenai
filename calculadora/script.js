const visor = document.getElementById('visor');
const powerBotao = document.getElementById('ligar_desligar');
const limparBotao = document.getElementById('limpar');
const backspaceBotao = document.getElementById('backspace');
const igualBotao = document.getElementById('igual');
const porcentoBotao = document.getElementById('porcento');
const numeroBotoes = document.querySelectorAll('.numero');
const operadoresBotoes = document.querySelectorAll('.operador');
const infoBotoes = document.querySelectorAll('.info');
const somBotao = document.getElementById('som');
const decimalBotao = document.getElementById('decimal');

let ligado = false;
let entradaAtual = '';
let operador = null;
let primeiroOperando = null;
let somLigado = false;

const teclaSom = new Audio('som/som.mp3');
teclaSom.volume = 1.0;

const atualizarVisor = (value) => {
  visor.value = value;
};

const ligaDesligaCalculadora = () => {
  ligado = !ligado;
  powerBotao.textContent = ligado ? 'OFF' : 'ON';
  visor.disabled = !ligado;
  entradaAtual = '';
  operador = null;
  primeiroOperando = null;
  atualizarVisor(ligado ? '0' : '');
};

const ligarTeclaSom = () => {
  if (somLigado) {
    teclaSom.currentTime = 0;
    teclaSom.play().catch(e => console.warn('Erro ao tocar som:', e));
  }
};

// Liga/desliga
powerBotao.addEventListener('click', ligaDesligaCalculadora);

// Números
numeroBotoes.forEach(botao => {
  botao.addEventListener('click', () => {
    if (ligado) {
      ligarTeclaSom();
      if (entradaAtual === '0') {
        entradaAtual = botao.textContent;
      } else {
        entradaAtual += botao.textContent;
      }
      atualizarVisor(entradaAtual);
    }
  });
});

// Operadores
operadoresBotoes.forEach(botao => {
  botao.addEventListener('click', () => {
    if (ligado && entradaAtual !== '') {
      ligarTeclaSom();
      if (primeiroOperando === null) {
        primeiroOperando = parseFloat(entradaAtual);
      } else if (operador) {
        calcularResultado();
        primeiroOperando = parseFloat(visor.value);
      }
      operador = botao.textContent;
      entradaAtual = '';
    }
  });
});

// Igual
igualBotao.addEventListener('click', () => {
  if (ligado && operador && entradaAtual !== '') {
    ligarTeclaSom();
    calcularResultado();
    operador = null;
    primeiroOperando = null;
  }
});

const calcularResultado = () => {
  const segundoOperando = parseFloat(entradaAtual);
  let resultado = 0;

  switch (operador) {
    case '+':
      resultado = primeiroOperando + segundoOperando;
      break;
    case '-':
    case '−': // subtração unicode
      resultado = primeiroOperando - segundoOperando;
      break;
    case 'x':
    case '×': // multiplicação unicode
      resultado = primeiroOperando * segundoOperando;
      break;
    case '÷':
      if (segundoOperando === 0) {
        atualizarVisor('Erro');
        return;
      }
      resultado = primeiroOperando / segundoOperando;
      break;
  }

  atualizarVisor(parseFloat(resultado.toFixed(10)));
  entradaAtual = visor.value;
};

// Limpar
limparBotao.addEventListener('click', () => {
  if (ligado) {
    ligarTeclaSom();
    entradaAtual = '';
    operador = null;
    primeiroOperando = null;
    atualizarVisor('0');
  }
});

// Backspace
backspaceBotao.addEventListener('click', () => {
  if (ligado) {
    ligarTeclaSom();
    entradaAtual = entradaAtual.slice(0, -1);
    atualizarVisor(entradaAtual === '' ? '0' : entradaAtual);
  }
});

// Porcentagem
porcentoBotao.addEventListener('click', () => {
  if (ligado && entradaAtual !== '') {
    ligarTeclaSom();
    entradaAtual = (parseFloat(entradaAtual) / 100).toString();
    atualizarVisor(entradaAtual);
  }
});

// Decimal
decimalBotao.addEventListener('click', () => {
  if (ligado && !entradaAtual.includes('.')) {
    ligarTeclaSom();
    entradaAtual += '.';
    atualizarVisor(entradaAtual);
  }
});

// Botão de som
somBotao.addEventListener('click', () => {
  somLigado = !somLigado;
  if (somLigado) {
    somBotao.classList.add('som-ligado');
  } else {
    somBotao.classList.remove('som-ligado');
  }
  atualizarVisor(somLigado ? 'Som On' : 'Som Off');
});

// Botões info
infoBotoes.forEach(botao => {
  botao.addEventListener('click', () => {
    if (ligado) {
      ligarTeclaSom();
      atualizarVisor('Calculadora feita por Ricardo');
    }
  });
});

// Inicialização automática
ligaDesligaCalculadora();
powerBotao.textContent = 'Off';
