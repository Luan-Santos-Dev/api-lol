
export default class API {

    async testeUsuario(nomeUsuario, key, screenArea, UserClass, buttons) {

        await fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nomeUsuario}?api_key=${key}`)
            .then(response => {
                //console.log("Response ", response);
                return response.json();
            })
            .then(user => {
                // Sucesso

                //console.log(user);
                // Adicionar os dados do usuário:

                UserClass.urlSummoner = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nomeUsuario}?api_key=${key}`;
                UserClass.urlImage = `https://ddragon.leagueoflegends.com/cdn/13.21.1/img/profileicon/`;
                UserClass.key = key;

                // Vou avisar que a pesquisa do usuário teve sucesso e agora ele pode ver (Profile) do usuario e as (Match)

                this.successSearch(screenArea, buttons);

                this.MostrarTirarBotoes(buttons);
                
                UserClass.profile(user, 'salvar');

            })
            .catch(error => {
                // Error
                // Se os botões estiverem disponiveis, então se cair aqui deixe eles invisiveis (novamente)

                // Remove os botões -> this.errorSearch();

                this.error(screenArea);

                console.error("Error: ", error);
            })

    }

    // Erros e Sucessos:

    successSearch(screen, buttons) {

        screen.innerHTML = "";

        screen.appendChild(this.layoutSuccessSearch(
            "fa-solid fa-check fa-2xl text-center",
            "Sucesso na pesquisa!"
        ));

    }

    errorSearch() {

    }

    errorKey(screen) {

        screen.innerHTML = "";

        screen.appendChild(this.layoutError(
            "fa-solid fa-key fa-2xl text-center",
            "Verifique se você colocou a sua chave."
        ));

    }

    error(screen) {

        screen.innerHTML = "";

        screen.appendChild(this.layoutError(
            "fa-solid fa-exclamation fa-2xl text-center",
            "Opá! Parece que aconteceu algo de errado."
        ));

    }

    // Métodos que servem aos erros e aos sucessos:

    MostrarTirarBotoes(buttons) {

        if (buttons[0].classList.contains("invisivel") && buttons[1].classList.contains("invisivel")) {

            buttons.forEach(element => {
                element.classList.remove("invisivel");
                element.classList.add("visivel");
            });

        }

    }

    layoutSuccessSearch(iconName, text) {

        let divMain = document.createElement("div");
        divMain.className = "w-full my-[200px] flex items-center justify-center";
    
        let divFilha = document.createElement("div");
        divFilha.className = "flex flex-col justify-center";
    
        let iconeSuccess = document.createElement("i");
        iconeSuccess.className = iconName;
        iconeSuccess.style.color = "#5fd049";
    
        divFilha.appendChild(iconeSuccess);
    
        let textSuccess = document.createElement("p");
        textSuccess.className = "text-[#5fd049] mt-5";
        textSuccess.innerHTML = text;
    
        divFilha.appendChild(textSuccess);
    
        divMain.appendChild(divFilha);
    
        return divMain;

    }

    layoutError(iconName, text) {

        let divMain = document.createElement("div");
        divMain.className = "w-full my-[200px] flex items-center justify-center";
    
        let divFilha = document.createElement("div");
        divFilha.className = "flex flex-col justify-center";
    
        let iconeError = document.createElement("i");
        iconeError.className = iconName;
        iconeError.style.color = "#c92626";
    
        divFilha.appendChild(iconeError);
    
        let textError = document.createElement("p");
        textError.className = "text-[#c92626] mt-5";
        textError.innerHTML = text;
    
        divFilha.appendChild(textError);
    
        divMain.appendChild(divFilha);
    
        return divMain;

    }

    // Método que mexe com o HTML (DOM)


}

