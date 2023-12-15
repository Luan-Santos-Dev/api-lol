export default class API {

    constructor() {
        this._cache = new Cache();
    }
    
    obterCache() {
        return this._cache;
    }

    async testeUsuario(nomeUsuario, key, screenArea, UserClass, buttons) {

        /*
        Primeiro vamos verificar se a URL montada existe dentro do CACHE, se existir nós vamos
        fazer o processo de sucesso e retornar os dados.
        Se não exister dentro do CACHE nós vamos fazer a requisição e armazenar os dados dentro
        do CACHE e fazer o processo de sucesso e retornar os dados.
        */

        while (true) {
            if (this.obterCache().getItem(nomeUsuario)) {
                // Se achar um item no CACHE ele vem aqui

                this.successSearch(screenArea);
                this.MostrarTirarBotoes(buttons, true);

                UserClass.urlSummoner = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nomeUsuario}?api_key=${key}`;
                UserClass.urlImage = `https://ddragon.leagueoflegends.com/cdn/13.21.1/img/profileicon/`;
                UserClass.key = key;

                UserClass.profile(this.obterCache().getItem(nomeUsuario), 'salvar');

                break;

            } else {
                // Se ele não achar nenhum item compativel no CACHE ele vem aqui
                console.log("Sem sucesso na busca");

                await fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nomeUsuario}?api_key=${key}`)
                    .then(response => {return response.json();})
                    .then(user => {

                        this.obterCache().setItem(nomeUsuario, user, {
                            expirationAbsolute: null,
                            expirationSliding: null,
                            priority: Cache.Priority.NORMAL,
                            callback: function (k, v) { console.log("removido: ", k); }
                        });

                    })
                    .catch(error => {
                        this.MostrarTirarBotoes(buttons, false);
                        this.error(screenArea);
                        console.log(error);
                    })

            }
        }


    }

    async partidas (screen, user) {

        while (true) {
            if (this.obterCache().getItem(`match-${user.obterNomeUsuario()}`)) {

                this.obterCache().getItem(`match-${user.obterNomeUsuario()}`).forEach((match, index) => {
                    let spanConteudo = document.createElement("span");
                    spanConteudo.id = `match-${index}`;

                    screen.appendChild(spanConteudo);

                    user.dadosPartida(match, index);

                });

                break;

            } else {
                await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${user.obterPuuidUsuario()}/ids?start=0&count=20&api_key=${user.key}`)
                    .then(response => response.json())
                    .then(matchs => {
                        this.obterCache().setItem(`match-${user.obterNomeUsuario()}`, matchs, {
                            expirationAbsolute: null,
                            expirationSliding: null,
                            priority: Cache.Priority.NORMAL,
                            callback: function (k, v) { console.log("removido: ", k); }
                        });
                    })
                    .catch(error => {
                        this.error();

                        console.log("Error: ", error);
                    })
            }
        }        

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

}
