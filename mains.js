var inputResultado = document.getElementById("inputDisplayResultado");

var calculo = {
    valorSalvo: null,
    funcaoParaCalcular: null
};

//Adiciona evento para inciar quando a janela carregar.
window.addEventListener("load", function(){
    atribuirEventos();
})

//Atribuir eventos para os botões da calculadora
function atribuirEventos(){
    document.getElementById("btnValor0").addEventListener("click", clicarNumero);
    document.getElementById("btnValor1").addEventListener("click", clicarNumero);
    document.getElementById("btnValor2").addEventListener("click", clicarNumero);
    document.getElementById("btnValor3").addEventListener("click", clicarNumero);
    document.getElementById("btnValor4").addEventListener("click", clicarNumero);
    document.getElementById("btnValor5").addEventListener("click", clicarNumero);
    document.getElementById("btnValor6").addEventListener("click", clicarNumero);
    document.getElementById("btnValor7").addEventListener("click", clicarNumero);
    document.getElementById("btnValor8").addEventListener("click", clicarNumero);
    document.getElementById("btnValor9").addEventListener("click", clicarNumero);

    document.getElementById("btnLimpar").addEventListener("click", limparDados);

    document.getElementById("btnPonto").addEventListener("click", clicarPonto);

    document.getElementById("btnDividir").addEventListener("click", clicarOperador);
    document.getElementById("btnMultiplicar").addEventListener("click", clicarOperador);
    document.getElementById("btnSubtrair").addEventListener("click", clicarOperador);
    document.getElementById("btnSoma").addEventListener("click", clicarOperador);

    document.getElementById("btnResultado").addEventListener("click", clicarResultado);
}

//Inserir número no display da calculadora
function clicarNumero(){
    if(isNaN(inputResultado.value)){
        inputResultado.value = event.target.textContent;
    }else{
        if(inputResultado.value == 0){
            inputResultado.value = event.target.textContent; 
        }else{
            inputResultado.value += event.target.textContent;
        }
    }
}

//Funções das operações matemáticas
function somarValores(valor1, valor2){
    return valor1 + valor2;
}

function subtrairValores(valor1, valor2){
    return valor1 - valor2;
}

function multiplicarValores(valor1, valor2){
    return valor1 * valor2;
}

function dividirValores(valor1, valor2){
    if(valor2 == 0){
        return "Erro, divisão por zero!"
    }else{
        return valor1 / valor2;
    }
}

//Limpa todos os dados do input e objeto de calculo
function limparDados(){
    inputResultado.value = "";

    calculo.valorSalvo = null;
    calculo.funcaoParaCalcular = null;
}

//função executada quando o evento clicar no botão de ponto
function clicarPonto(){
    if(inputResultado.value === "" || isNaN(inputResultado.value)){
        inputResultado.value = "0.";
    }else if(!inputResultado.value.includes(".")){
        inputResultado.value = inputResultado.value + ".";
    }
}

//função que atualiza o objeto calculo ao clicar nos operadores
function clicarOperador(){
    if(!isNaN(inputResultado.value)){
        if(calculo.valorSalvo == null){
            calculo.valorSalvo = Number(inputResultado.value);
        }else if(calculo.funcaoParaCalcular != null){
            calculo.valorSalvo = calculo.funcaoParaCalcular(calculo.valorSalvo, Number(inputResultado.value));         
        }
    }

    var operador = event.target.textContent;
    atribuirOperacao(operador);
    inputResultado.value = operador;

}

//quando receber uma das 4 operações +-*/, retorna a operação correspondente.
function atribuirOperacao(operador){
    if(operador == "+"){
        calculo.funcaoParaCalcular = somarValores;
    }else if(operador == "-"){
        calculo.funcaoParaCalcular = subtrairValores;
    }else if(operador == "*"){
        calculo.funcaoParaCalcular = multiplicarValores;
    }else {
        calculo.funcaoParaCalcular = dividirValores;
    }
}

//Exibe o resultado quando clica no botão de igual =
function clicarResultado(){
    if(!isNaN(inputResultado.value) && calculo.funcaoParaCalcular != null){
        var resultado = calculo.funcaoParaCalcular(calculo.valorSalvo, Number(inputResultado.value));

        inputResultado.value = resultado;
        calculo.valorSalvo = resultado;

        calculo.funcaoParaCalcular = null;
    }
}