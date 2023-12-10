
import User from './usuario.js';
import Riot from './api.js';

const exibicao = document.getElementById("area-exibicao");
const keyTextTop = document.getElementById("key-text-top");
const buttons = document.querySelectorAll(".button-down");

let Usuario = new User();
let Api = new Riot();

document.getElementById("search-button").addEventListener("click", async () => {

    const nomePesquisa = editarNome(document.getElementById("search-text").value);
    const valorInputKey = document.getElementById("text-key").value;

    if (valorInputKey != "") {

        // Fazendo um teste antes de começar a trabalhar com os dados
        Api.testeUsuario(nomePesquisa, valorInputKey, exibicao, Usuario, buttons);

    } else {

        Api.errorKey(exibicao); // Avisa o usuário que o problema está na Key "PAROU AQUI, TEM QUE FAZER ESSE MÉTODO URGENTE!!!"

    }

});

document.getElementById("key-button").addEventListener("click", () => {

    if (keyTextTop.classList.contains("esconder")) {
        keyTextTop.classList.remove("esconder");
        keyTextTop.classList.add("mostrar");
    } else {
        keyTextTop.classList.remove("mostrar");
        keyTextTop.classList.add("esconder");
    }

});

buttons[0].addEventListener("click", () => { // Perfil do usuário

    exibicao.innerHTML = "";

    Usuario.profile('', 'renderizar', exibicao);

});

buttons[1].addEventListener("click", () => { // Partidas do usuário

    exibicao.innerHTML = "";

    Usuario.partidas(exibicao);

});

function editarNome(value) {
    let result= "";
    for (let i = 0; i < value.length; i++) {
        if (value[i] != " ") {
            result += value[i];
        }
    }
    return result;
}
