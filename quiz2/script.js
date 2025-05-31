const quizData = [
    { questao: "Qual é a capital do Brasil", opcao: ["São Paulo","Salvador","Brasilia","Registro!"], resposta: "Brasilia"},
    { questao: "Qual é o dia de aniversario do descobrimento do Brasil", opcao: ["7 de setembro","22 de abril","15 de novembro","25 de maio"], resposta: "7 de setembro"},
    { questao: "Quem escreveu Dom Quixote", opcao: ["Cervantes", "Shakspeare","Dom Flamingo","Machado de Assis"], resposta:"Cervantes" }
];

let questaoAtual = 0;
let pontuacao = 0;

function carregarQuestao(){
    const pergunta = document.getElementById("questao");
    const resposta = document.getElementById("opcao");
    pergunta.textContent = quizData[questaoAtual].questao;
    resposta.innerHTML = "";
    quizData[questaoAtual].opcao.forEach(opcao => {
        const button = document.createElement("button");
        button.textContent = opcao;
        button.onclick = () => respostaEscolhida(opcao);
        resposta.appendChild(button);
    }); 
}

function respostaEscolhida(selecao){
    const resposta_correta = quizData[questaoAtual].resposta;
    if (selecao === resposta_correta) {
        pontuacao++;    
    }
    document.getElementById("avancar").style.display = "block";
}

document.getElementById("avancar").addEventListener("click", () => {
    questaoAtual++;
    if (questaoAtual < quizData.length){
        carregarQuestao();
        document.getElementById("avancar").style.display = "none";
    } else {
        document.getElementById("quiz").innerHTML = `<h2>Voce acertou ${pontuacao} de ${quizData.length} perguntas</h2>`;
        document.getElementById("avancar").style.display = "none";
    }
});

carregarQuestao();
