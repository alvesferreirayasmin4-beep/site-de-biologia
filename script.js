
// =========================================
// QUIZ - SISTEMA DIGESTÓRIO
// =========================================

const perguntas = [
    {
        pergunta: "1. Qual é o primeiro órgão do sistema digestório?",
        alternativas: [
            "Estômago",
            "Boca",
            "Intestino delgado",
            "Esôfago"
        ],
        correta: 1,
        explicacao: "A digestão começa na boca, onde os alimentos são mastigados e misturados à saliva."
    },

    {
        pergunta: "2. Qual é a principal função do estômago?",
        alternativas: [
            "Absorver a maior parte dos nutrientes",
            "Produzir bile",
            "Misturar o alimento ao suco gástrico",
            "Eliminar as fezes"
        ],
        correta: 2,
        explicacao: "O estômago mistura os alimentos ao suco gástrico, dando continuidade à digestão."
    },

    {
        pergunta: "3. Em qual órgão ocorre a maior parte da absorção dos nutrientes?",
        alternativas: [
            "Intestino delgado",
            "Esôfago",
            "Boca",
            "Intestino grosso"
        ],
        correta: 0,
        explicacao: "O intestino delgado é responsável pela maior parte da absorção dos nutrientes."
    },

    {
        pergunta: "4. Qual órgão produz a bile?",
        alternativas: [
            "Pâncreas",
            "Estômago",
            "Fígado",
            "Reto"
        ],
        correta: 2,
        explicacao: "O fígado produz a bile, que ajuda na digestão das gorduras."
    },

    {
        pergunta: "5. Qual é a função principal do intestino grosso?",
        alternativas: [
            "Produzir saliva",
            "Absorver água e formar as fezes",
            "Mastigar os alimentos",
            "Produzir suco gástrico"
        ],
        correta: 1,
        explicacao: "O intestino grosso absorve água e participa da formação das fezes."
    }
];


// =========================================
// ELEMENTOS DO HTML
// =========================================

const areaQuiz = document.getElementById("area-quiz");
const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");
const feedbackElemento = document.getElementById("feedback");
const contadorElemento = document.getElementById("contador");
const progressoElemento = document.getElementById("progresso");
const proximaElemento = document.getElementById("proxima");

const resultadoFinal = document.getElementById("resultado-final");
const pontuacaoFinal = document.getElementById("pontuacao-final");
const mensagemFinal = document.getElementById("mensagem-final");
const reiniciarElemento = document.getElementById("reiniciar");


// =========================================
// VARIÁVEIS DO QUIZ
// =========================================

let perguntaAtual = 0;
let pontuacao = 0;
let respondeu = false;


// =========================================
// MOSTRAR PERGUNTA
// =========================================

function mostrarPergunta() {

    respondeu = false;

    const pergunta = perguntas[perguntaAtual];

    contadorElemento.textContent =
        `PERGUNTA ${perguntaAtual + 1} DE ${perguntas.length}`;

    perguntaElemento.textContent = pergunta.pergunta;

    progressoElemento.style.width =
        `${(perguntaAtual / perguntas.length) * 100}%`;

    alternativasElemento.innerHTML = "";

    feedbackElemento.textContent = "";
    feedbackElemento.className = "feedback-quiz";
    feedbackElemento.hidden = true;

    proximaElemento.disabled = true;
    proximaElemento.textContent =
        perguntaAtual === perguntas.length - 1
            ? "Ver resultado"
            : "Próxima pergunta";

    pergunta.alternativas.forEach((alternativa, indice) => {

        const botao = document.createElement("button");

        botao.textContent = alternativa;
        botao.classList.add("alternativa-quiz");

        botao.addEventListener("click", () => {
            verificarResposta(indice, botao);
        });

        alternativasElemento.appendChild(botao);

    });

}


// =========================================
// VERIFICAR RESPOSTA
// =========================================

function verificarResposta(indiceEscolhido, botaoEscolhido) {

    if (respondeu) return;

    respondeu = true;

    const pergunta = perguntas[perguntaAtual];

    const botoes = document.querySelectorAll(".alternativa-quiz");

    botoes.forEach((botao, indice) => {

        botao.disabled = true;

        if (indice === pergunta.correta) {
            botao.classList.add("correta");
        }

    });

    if (indiceEscolhido === pergunta.correta) {

        pontuacao++;

        feedbackElemento.textContent =
            "Resposta correta! " + pergunta.explicacao;

        feedbackElemento.classList.add("feedback-correto");

    } else {

        botaoEscolhido.classList.add("errada");

        feedbackElemento.textContent =
            "Resposta incorreta. " + pergunta.explicacao;

        feedbackElemento.classList.add("feedback-errado");

    }

    feedbackElemento.hidden = false;

    proximaElemento.disabled = false;

}


// =========================================
// AVANÇAR PARA A PRÓXIMA PERGUNTA
// =========================================

function proximaPergunta() {

    if (!respondeu) return;

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        mostrarResultado();

    }

}


// =========================================
// MOSTRAR RESULTADO FINAL
// =========================================

function mostrarResultado() {

    areaQuiz.hidden = true;
    resultadoFinal.hidden = false;

    progressoElemento.style.width = "100%";

    pontuacaoFinal.textContent =
        `${pontuacao} de ${perguntas.length}`;

    const porcentagem = (pontuacao / perguntas.length) * 100;

    if (porcentagem === 100) {

        mensagemFinal.textContent =
            "Excelente! Você acertou todas as perguntas e demonstrou ótimo conhecimento sobre o sistema digestório.";

    } else if (porcentagem >= 60) {

        mensagemFinal.textContent =
            "Muito bem! Você conhece boa parte do sistema digestório. Continue estudando para aprender ainda mais.";

    } else {

        mensagemFinal.textContent =
            "Continue estudando! Revise os conteúdos do site e tente novamente. Você pode melhorar sua pontuação.";

    }

}


// =========================================
// REINICIAR O QUIZ
// =========================================

function reiniciarQuiz() {

    perguntaAtual = 0;
    pontuacao = 0;
    respondeu = false;

    resultadoFinal.hidden = true;
    areaQuiz.hidden = false;

    mostrarPergunta();

}


// =========================================
// EVENTOS DOS BOTÕES
// =========================================

proximaElemento.addEventListener("click", proximaPergunta);

reiniciarElemento.addEventListener("click", reiniciarQuiz);


// =========================================
// INICIAR O QUIZ
// =========================================

if (
    areaQuiz &&
    perguntaElemento &&
    alternativasElemento &&
    feedbackElemento &&
    contadorElemento &&
    progressoElemento &&
    proximaElemento &&
    resultadoFinal &&
    pontuacaoFinal &&
    mensagemFinal &&
    reiniciarElemento
) {
    mostrarPergunta();
} else {
    console.error("Não foi possível encontrar todos os elementos do Quiz no HTML.");
}
