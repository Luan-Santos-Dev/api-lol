
import User from './UserClass.js';
import Riot from './ApiClass.js';

const exibicao = document.getElementById("area-exibicao");
const keyTextTop = document.getElementById("key-text-top");
const buttons = document.querySelectorAll(".button-down");

let Usuario = new User();
let Api = new Riot();

document.getElementById("search-button").addEventListener("click", async () => {

    const nomePesquisa = editarNome(document.getElementById("search-text").value);
    const valorInputKey = document.getElementById("text-key").value;

    if (valorInputKey != "") {

        Api.testeUsuario(nomePesquisa, valorInputKey, exibicao, Usuario, buttons);

    } else {

        Api.errorKey(exibicao);

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

buttons[0].addEventListener("click", () => { // Perfil

    exibicao.innerHTML = "";
    Usuario.profile('', 'renderizar', exibicao);

});

buttons[1].addEventListener("click", () => { // Partidas

    exibicao.innerHTML = "";
    Api.partidas(exibicao, Usuario);

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
