const visorE = document.querySelector(".visor-e");
const visorS = document.querySelector(".visor-s");
const visorT = document.querySelector(".visor-t");
const desc = document.querySelector(".desc");
const valor = document.querySelector(".value");
const tipo = document.querySelector(".type");
const include = document.querySelector(".include");
const main = document.querySelector(".main");

include.addEventListener("click", addFinanca);

var vEntradas = 0;
var vSaidas = 0;
var vTotal = 0;

function addFinanca() {
    verifica();
}

function verifica(){
    if(desc.value == '' || valor.value == ''){
        window.alert('Preencha todos os campos adequadamente!');
    } else {
        criarFinanca();
        limparInputs();
    }
}

function criarFinanca(){
    let idesc = document.createElement("span");
    let ivalue = document.createElement("span");
    let itype = document.createElement("span");
    let remove = document.createElement("button");

    setarSpans(idesc, ivalue);
    classSpans(idesc, ivalue, itype, remove);
    setarDiv(idesc, ivalue, itype, remove);
    totalFinanca();
}

function setarSpans(idesc, ivalue){
    idesc.innerHTML = desc.value;
    ivalue.innerHTML = `R$ ${Math.abs(valor.value)}`;
}

function classSpans(idesc, ivalue, itype, remove){
    idesc.classList.add("idesc");
    ivalue.classList.add("ivalue");
    itype.classList.add("itype");
    remove.classList.add("remove")

    if(tipo.value == 'entrada'){
        itype.classList.add("iup");
    } else{
        itype.classList.add("idown");
    }

    remove.addEventListener("click", () => {corrigeFinanca(ivalue, itype)});
    remove.addEventListener("click", (e) => {e.target.parentElement.remove()});
}

function corrigeFinanca(ivalue, itype){
    let a = ivalue.textContent;
    a = a.replace('R', '');
    a = a.replace('$', '');
    a = parseFloat(a);

    if(itype.classList.contains("idown")){
        vSaidas -= a;
    } else {
        vEntradas -= a;
    }

    mudaVisor();
}

function setarDiv(idesc, ivalue, itype, remove){
    let div = document.createElement("div");
    div.classList.add("financa");

    div.appendChild(idesc);
    div.appendChild(ivalue);
    div.appendChild(itype);
    div.appendChild(remove);

    main.appendChild(div);
}

function totalFinanca(){
    if(tipo.value == 'entrada'){
        vEntradas += Math.abs(valor.value);
    } else {
        vSaidas += Math.abs(valor.value);
    }

    mudaVisor(); 
}

function mudaVisor(){
    vTotal = vEntradas - vSaidas;

    visorE.textContent = `R$ ${vEntradas}`;
    visorS.textContent = `R$ ${vSaidas}`; 
    visorT.textContent = `R$ ${vTotal.toFixed(2)}`;
}

function limparInputs(){
    desc.value = '';
    valor.value = '';
    desc.focus();
}