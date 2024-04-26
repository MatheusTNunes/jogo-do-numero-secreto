let listaDeNumeroSorteado = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {  //função contém dois parâmetros que deverão ser passados quando ela for chamada
    let campo = document.querySelector(tag); // dentro da ação a ser realizada, selecionamos no documento HTML o que deverá ser alterado, no caso a tag
    campo.innerHTML = texto; //alteração na tag mencionada, no caso um texto
    responsiveVoice.speak (texto, 'Brazilian Portuguese Female' ,{rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto'); //chama a variável criada acima, com a tag h1 do HTML, separando em vírgula o texto a ser empregado naquela tag que estamos manipulando
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

//função para verificar a tentativa do jogador sobre o chute
function verificarChute() {
    let chute = document.querySelector('input').value; //criada a variável para receber o valor do chute do jogador

    if (chute == numeroSecreto) { //comparação do numero secreto com chute do jogador
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? ' tentativas' : ' tentativa'
        let mensagemTentativas = 'Você descobriu o numero secreto com ' +tentativas+ palavraTentativa + '!';
        exibirTextoNaTela('p', mensagemTentativas); //condição caso o jogador acerte
        document.getElementById ('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){ //criado outro loop para ajudar o jogador a acertar o numero
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p','O número secreto é maior');
            }
        tentativas ++;
        limparCampo ();
        }
} 

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteado.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumeroSorteado = [];
    }
    if (listaDeNumeroSorteado.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroSorteado.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo () {
    chute = document.querySelector ('input');
    chute.value = '';
}

function reiniciarJogo (){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById ('reiniciar').setAttribute('disabled', true);
}