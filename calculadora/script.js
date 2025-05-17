const visor = document.getElementById('visor');
const powerBotao = document.getElementById('ligar_desligar');
const limparBotao = document.getElementById('limpar');
const backspaceBotao = document.getElementById('backspace');
const igualbotao = document.getElementById('igual');
const porcentoBotao = document.getElementById('porcento');
const numeroBotoes = document.querySelectorAll('.numero'); /*Atenção */
const operadoresBotoes = document.querySelectorAll('.operador'); /*Atenção */
const infoBotao = document.querySelectorAll('.info'); /*Atenção */
const somBotao = document.getElementById('som');
const decimalBotao = document.getElementById('decimal');

let ligado = false;
let entradaAtual = '';
let operador =null;
let primeiroOperando = null;
let somLigado = false;
const teclaSom = new Audio('som/som.mp3'); 

const atualizarVisor= () =>{
    visor.value = value;
};

const ligaDesligaCalculadora = () =>{
    ligado = !ligado;
    powerBotao.textContent = ligado? 'OFF':'ON';
    // visor.classList.toggle('desligado'); //posso implementar o class desligado
    visor.disable = !ligado;
    entradaAtual = '';
    operador = null;
    primeiroOperando = null;
    atualizarVisor(ligado ? '0':'');
};

const ligarTeclaSom = () =>{
    if(somLigado && teclaSom){
        teclaSom.currentTime = 0; // Reiniciar o som para reprodução rápida
        teclaSom.play();
    }
};

// Event Listener para o botao ligar/desligar
powerBotao.addEventListener('click', ligaDesligaCalculadora);

// Event listerners para os botoes de numero
numeroBotoes.forEach((Botao)=>{
    Botao.addEventListener('click', () =>{
        if(ligado){
            ligarTeclaSom();
            if (entradaAtual === '0'){
                entradaAtual = Botao.textContent;
            } else{
                entradaAtual += Botao.textContent;
            }
            atualizarVisor(entradaAtual);
        }
    });
});

// Event Listenners para os botoes de operador
operadorBotoes.forEach((Botao)=> {
    Botao.addEventListenner('click', ()=>{
        if (ligado && enradaAtual !=''){
            ligarTeclaSom();
            if(primeiroOperando === null){
                primeiroOperando = parseFloat(entradaAtual);
            } else if (operador) {
                calcularResultado();
                primeiroOperando = parseFloat(visor.value);
            }
            operador = Botao.textContent;
            entradaAtual =  '';
        }
    });
});

// Event Listener para o botao Igual
igualBotao.addEventListener('click',() =>{
    if (ligado && operador && entradaAtual !== ''){
        ligarTeclaSom();
        calcularResultado();
        operador= null;
        primeiroOperando = null;
    }
});

const calcularResultado = () =>{
    const segundoOperando = parseFloat(entradaAtual);
    let resultado = 0;
    switch(operador){
        case '+':
            resultado = primeiroOperando + segundoOperando;
            break;
        case '-':
            resultado = primeiroOperando - segundoOperando;
            break;
        case 'x':
            resultado = primeiroOperando*segundoOperando;
            break;
        case '÷':
            if(segundoOperador === 0){
                atualizarVisor('erro');
                return;
            }
            resultado = primeiroOperando/segundoOperando;
            break;
    }
    atualizarVisor(parseFloat(resultado.toFixed(10)));
    entradaAtual = visor.value;
}