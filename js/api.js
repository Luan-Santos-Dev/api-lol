export default class API {

    async testeUsuario(nomeUsuario, key, screenArea, UserClass, buttons) {

        await fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nomeUsuario}?api_key=${key}`)
            .then(response => {return response.json();})
            .then(user => {
                
                // Adicionar os dados
                UserClass.urlSummoner = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nomeUsuario}?api_key=${key}`;
                UserClass.urlImage = `https://ddragon.leagueoflegends.com/cdn/13.21.1/img/profileicon/`;
                UserClass.key = key;

                // Acesso ao Profile e Match
                this.successSearch(screenArea);
                this.MostrarTirarBotoes(buttons, true);
                
                UserClass.profile(user, 'salvar');

            })
            .catch(error => {

                // Os botões serão tornados invisiveis
                this.MostrarTirarBotoes(buttons, false);
                this.error(screenArea);

                console.error("Error: ", error);
            })

    }

    successSearch(screen) {

        screen.innerHTML = this.layoutSuccessSearch(
            "fa-solid fa-check fa-2xl text-center",
            "Sucesso na pesquisa!"
        );

    }

    errorKey(screen) {

        screen.innerHTML = this.layoutError(
            "fa-solid fa-key fa-2xl text-center",
            "Verifique se você colocou a sua chave."
        );

    }

    error(screen) {

        screen.innerHTML = this.layoutError(
            "fa-solid fa-exclamation fa-2xl text-center",
            "Opá! Parece que aconteceu algo de errado."
        );

    }

    MostrarTirarBotoes(buttons, caminho) {

        if (caminho) { // True => Adicionar | False => Remover

            buttons.forEach(element => {
                element.classList.remove("invisivel");
                element.classList.add("visivel");
            });

        } else {

            buttons.forEach(element => {
                element.classList.remove("visivel");
                element.classList.add("invisivel");
            });

        }

    }

    layoutSuccessSearch(iconName, text) {
    
        return `
            <div class="w-full my-[200px] flex items-center justify-center">
                <div class="flex flex-col justify-center">
                    <i class="${iconName}" aria-hidden="true" style="color: #5fd049"></i>
                    <p class="text-[#5fd049] mt-5">${text}</p>
                </div>
            </div>
        `;

    }

    layoutError(iconName, text) {

        return `
            <div class="w-full my-[200px] flex items-center justify-center">
                <div class="flex flex-col justify-center">
                    <i class="${iconName}" aria-hidden="true" style="color: #c92626"></i>
                    <p class="text-[#c92626] mt-5"">${text}</p>
                </div>
            </div>
        `;

    }

}
