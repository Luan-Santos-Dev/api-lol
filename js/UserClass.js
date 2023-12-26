export default class Usuario {

    urlSummoner = "";
    urlImage = "";
    key = "";

    #accountId = "";
    #id = "";
    #name = "";
    #profileIconId = 0;
    #puuid = "";
    #summonerLevel = 0;
    #matches = [];

    atualizarPartidas(valor) {
        this.#matches = valor;
    }

    obterPartidas() {
        return this.#matches;
    }

    obterNomeUsuario() {
        return this.#name;
    }

    obterPuuidUsuario() {
        return this.#puuid;
    }

    profile(dados = null, tipo, screen = "") {

        if (tipo == 'salvar') {

            this.#accountId = dados.accountId;
            this.#id = dados.id;
            this.#name = dados.name;
            this.#profileIconId = dados.profileIconId;
            this.#puuid = dados.puuid;
            this.#summonerLevel = dados.summonerLevel;

        } else if (tipo == 'renderizar') {

            this.montarProfile(screen);

        }

    }

    async renderizarTabelaPartidas(numeroTabela, comeco, fim, janela) {

        let divMain = document.createElement("div");

        let divPartidas = document.createElement("div");
        divPartidas.className = "partidas flex flex-col mb-[30px]";
        divPartidas.id = "partidas-area";

        // Criar as "span" como um laço e pra cada "span" eu já adicione cada informação da partida

        for (let i = comeco; i < fim; i++) {
            let spanPartida = document.createElement("span");
            spanPartida.className = `match-${i}`;

            await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${this.obterPartidas()[i]}?api_key=${this.key}`)
                .then(response => { return response.json() })
                .then(dados => {

                    //console.log(dados);

                    let arrayAliados = [];
                    let arrayInimigos = [];

                    dados.info.participants.forEach(participant => {
                        if (participant.teamId == 200) {
                            arrayAliados.push(
                                {
                                    championName: participant.championName
                                }
                            );
                        } else {
                            arrayInimigos.push(
                                {
                                    championName: participant.championName
                                }
                            );
                        }

                    });

                    //console.log(arrayAliados, arrayInimigos);

                    dados.info.participants.forEach(participant => {
                        if (participant.summonerId == this.#id) {
                            //console.log(participant.championName);
                            spanPartida.innerHTML = `
                                <div id="select" class="${participant.win ? "border-l-4 border-green-500" : "border-l-4 border-red-500"} rounded-md mt-[15px] mb-[5px] shadow-xl shadow-[#DEEFE7]">
                                    <div id="item-match" class="h-[80px] flex justify-between"> <!-- id="category-select" -->
                                        <label for="info-item" class="flex items-center"> <!-- id="options-view-button" -->
                                            <div class="flex items-center ml-[20px]">
                                                <div class="h-[45px] w-[45px] flex justify-center items-center text-white bg-[#002333] rounded-lg font-semibold mr-[10px]"> <!-- Campeão / Resultado -->
                                                    <!-- Verifique o nome do champ pra tomar um decisão de exibição -->
                                                    ${
                                                        participant.championName == 'Hwei' ? `<div>${participant.championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${participant.championName}.png" alt="campeao" width="40" height="40">`
                                                    }
                                                </div>
                                                <div class="w-[90px] flex-column items-center"> <!-- KDA -->
                                                    <div class="flex">
                                                        <p class="font-bold mr-[5px]">${participant.championName}</p>
                                                        <p class="font-bold ${participant.win ? "text-[#22c55e]" : "text-[#e11d48]"}">${participant.win ? "Vitória" : "Derrota"}</p>
                                                    </div>
                                                    <p class="font-bold">${participant.kills} / ${participant.deaths} / ${participant.assists}</p>
                                                </div>
                                            </div>
                                        </label>
                                        <input type="checkbox" id="info-item"> <!-- Conectado com o Label -->

                                        <div id="chevrons" class="flex items-center mr-[5px]">
                                            <i data-lucide="chevron-down"></i>
                                            <i data-lucide="chevron-up"></i>
                                        </div>

                                    </div>

                                    <div id="dropdown-match-info" class="rounded-b-lg mb-[10px] mt-[10px]"> <!-- DROPDOWN -->
                                        <div class="h-full grid grid-rows-1 grid-cols-12 gap-1"> <!-- Conteúdo -->
                                                
                                            <div class="col-span-12 md:col-span-5 lg:col-span-5 xl:col-span-5">
                                                <div class="flex flex-col g-2"> <!-- Items -->
                                                    <span>
                                                        <p class="font-bold text-center">Itens</p>
                                                    </span>
                                                    <span class="flex justify-center mt-[5px]">
                                                        ${participant.item0 != 0 ? `<img class="rounded-lg" src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${participant.item0}.png" alt="item" width="28" height="22">` : "<div class='h-[30px] w-[28px] bg-[#52525b] rounded-lg'></div>"}
                                                        ${participant.item1 != 0 ? `<img class="rounded-lg mx-[10px]" src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${participant.item1}.png" alt="item" width="28" height="22">` : "<div class='h-[30px] w-[28px] rounded-lg mx-[10px] bg-[#52525b]'></div>"}
                                                        ${participant.item2 != 0 ? `<img class="rounded-lg" src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${participant.item2}.png" alt="item" width="28" height="22">` : "<div class='h-[30px] w-[28px] bg-[#52525b] rounded-lg'></div>"}
                                                        ${participant.item3 != 0 ? `<img class="rounded-lg mx-[10px]" src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${participant.item3}.png" alt="item" width="25" height="22">` : "<div class='h-[30px] w-[28px] rounded-lg mx-[10px] bg-[#52525b]'></div>"}
                                                        ${participant.item4 != 0 ? `<img class="rounded-lg" src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${participant.item4}.png" alt="item" width="28" height="22">` : "<div class='h-[30px] w-[28px] bg-[#52525b] rounded-lg'></div>"}
                                                        ${participant.item5 != 0 ? `<img class="rounded-lg mx-[10px]" src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${participant.item5}.png" alt="item" width="28" height="22">` : "<div class='h-[30px] w-[28px] rounded-lg mx-[10px] bg-[#52525b]'></div>"}
                                                        ${participant.item6 != 0 ? `<img class="rounded-lg" src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${participant.item6}.png" alt="item" width="28" height="22">` : "<div class='h-[30px] w-[28px] bg-[#52525b] rounded-lg'></div>"}
                                                    </span>
                                                </div>
                                                <div class="p-2 flex flex-col"> <!-- Aliados -->
                                                    <span>
                                                        <p class="font-bold text-center">Aliados</p>
                                                    </span>
                                                    <span class="flex justify-center gap-2 mt-[5px]">
                                                        ${arrayAliados[0].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayAliados[0].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayAliados[0].championName}.png" alt="campeao" width="40" height="40">`}
                                                        ${arrayAliados[1].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayAliados[1].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayAliados[1].championName}.png" alt="campeao" width="40" height="40">`}
                                                        ${arrayAliados[2].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayAliados[2].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayAliados[2].championName}.png" alt="campeao" width="40" height="40">`}
                                                        ${arrayAliados[3].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayAliados[3].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayAliados[3].championName}.png" alt="campeao" width="40" height="40">`}
                                                        ${arrayAliados[4].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayAliados[4].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayAliados[4].championName}.png" alt="campeao" width="40" height="40">`}
                                                    </span>
                                                </div>
                                                <div class=""> <!-- VS -->
                                                    <p class="font-bold text-center italic">
                                                        <span class="text-[#dc2626]">V</span>
                                                        <span class="">S</span>
                                                    </p>
                                                </div>
                                                <div class="p-2 flex flex-col"> <!-- Inimigos -->
                                                    <span>
                                                        <p class="font-bold text-center">Inimigos</p>
                                                    </span>
                                                    <span class="flex justify-center gap-2 mt-[5px]">
                                                        ${arrayInimigos[0].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayInimigos[0].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayInimigos[0].championName}.png" alt="campeao" width="40" height="40">`}
                                                        ${arrayInimigos[1].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayInimigos[1].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayInimigos[1].championName}.png" alt="campeao" width="40" height="40">`}
                                                        ${arrayInimigos[2].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayInimigos[2].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayInimigos[2].championName}.png" alt="campeao" width="40" height="40">`}
                                                        ${arrayInimigos[3].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayInimigos[3].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayInimigos[3].championName}.png" alt="campeao" width="40" height="40">`}
                                                        ${arrayInimigos[4].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayInimigos[4].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayInimigos[4].championName}.png" alt="campeao" width="40" height="40">`}
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="col-span-12 md:col-span-7 lg:col-span-7 xl:col-span-7"> <!-- Grafico -->
                                                <h3 class="text-center font-bold">Informações adicionais</h3>
                                                <div class="flex flex-col gap-2">

                                                    <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Modo de jogo: <span class="text-[#159A9C]">${dados.info.gameMode}</span></p>
                                                    <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Experiência campeão: <span class="text-[#159A9C]">${participant.champExperience}</span></p>
                                                    <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Nível campeão: <span class="text-[#159A9C]">${participant.champLevel}</span></p>
                                                    <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Dano causado as torres: <span class="text-[#159A9C]">${participant.damageDealtToTurrets}</span></p>

                                                    <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Ouro ganho: <span class="text-[#159A9C]">${participant.goldEarned}</span></p>
                                                    <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Ouro gasto: <span class="text-[#159A9C]">${participant.goldSpent}</span></p>

                                                    <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Dano mágico causado para campeões: <span class="text-[#159A9C]">${participant.magicDamageDealtToChampions}</span></p>
                                                    <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Dano mágico sofrido: <span class="text-[#159A9C]">${participant.magicDamageTaken}</span></p>

                                                    <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Dano físico causado para campeões: <span class="text-[#159A9C]">${participant.physicalDamageDealtToChampions}</span></p>
                                                    <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Dano físico sofrido: <span class="text-[#159A9C]">${participant.physicalDamageTaken}</span></p>

                                                    <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Habilidade 1 usado: <span class="text-[#159A9C]">${participant.spell1Casts}</span></p>
                                                    <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Habilidade 2 usado: <span class="text-[#159A9C]">${participant.spell2Casts}</span></p>
                                                    <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Habilidade 3 usado: <span class="text-[#159A9C]">${participant.spell3Casts}</span></p>
                                                    <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Habilidade 4 usado: <span class="text-[#159A9C]">${participant.spell4Casts}</span></p>

                                                    <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Minions abatidos: <span class="text-[#159A9C]">${participant.totalMinionsKilled}</span></p>


                                                    <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Pentas: <span class="text-[#159A9C]">${participant.pentaKills}</span></p>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            `;
                        }})
                })
                .catch(error => {
                    console.log(error);
                    throw new Error("Não é possível continuar!");
                })

                divPartidas.appendChild(spanPartida);
        };

        divMain.appendChild(divPartidas);

        let divNumeroTabelas = document.createElement("div");
        divNumeroTabelas.className = "numero-tabelas flex justify-center";

        for (let t = 0; t < 5; t++) { 
            let buttonTabela = document.createElement("button");
            buttonTabela.className = numeroTabela == (t+1)? `tabela-${t+1} mx-1 bg-[#002333] text-white font-bold py-1 px-3 rounded` : `tabela-${t+1} mx-1 bg-[#DEEFE7] hover:bg-[#002333] text-white font-bold py-1 px-3 rounded`;
            buttonTabela.textContent = t + 1;

            buttonTabela.addEventListener("click", () => {
                janela.innerHTML = "";
                this.renderizarTabelaPartidas(t + 1 ,4 * t, ((4 * t) + 4), janela);
            });

            divNumeroTabelas.appendChild(buttonTabela);
        }

        divMain.appendChild(divNumeroTabelas)

        janela.innerHTML = "";
        janela.append(divMain);

        lucide.createIcons(); // Iniciando icones

    }

    montarProfile(areaScreen) {

        fetch(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${this.#id}?api_key=${this.key}`)
            .then(response => { return response.json() })
            .then(dadosUser => {

                areaScreen.innerHTML = `
                    <div class="flex flex-col items-center m-2">
                        <div>
                            <img src="https://ddragon.leagueoflegends.com/cdn/13.21.1/img/profileicon/${this.#profileIconId}.png" alt="icon" class="rounded-lg" width="70" height="70">
                        </div>

                        <div class="flex flex-col items-center">
                            <h1 class="text-2xl font-bold">${this.#name}</h1>
                            <h1 class="">Level: ${this.#summonerLevel}</h1>
                        </div>

                        <div class="linha-separar"></div>

                        <div class="flex sm:flex-col justify-center">
                            <div class="flex justify-center md:mr-5">
                                <img src="./img/${dadosUser[0].tier.toLowerCase()}.png" alt="elo" height="150" width="150">
                            </div>

                            <div class="flex flex-col items-center justify-center">
                                <h2 class="font-bold">${dadosUser[0].tier}</h2>
                                <p class="font-bold">Soloqueue</p>
                                <p class="font-bold">Rank: ${dadosUser[0].rank}</p>
                                <p class="font-bold">LP: ${dadosUser[0].leaguePoints}</p>
                                <div>
                                    <span class="text-[#22c55e]">Wins: ${dadosUser[0].wins}</span>
                                    <span class="text-[#e11d48]">Losses: ${dadosUser[0].losses}</span>
                                </div>
                            </div>
                        </div>

                        <div class="linha-separar"></div>

                        <div class="flex sm:flex-col justify-center">
                            <div class="flex justify-center items-center">
                                <div class="flex justify-center items-center w-[180px] h-[180px] rounded-full border-dashed border-2 border-gray-600">
                                    <span class="">${dadosUser[0].wins + dadosUser[0].losses}</span>
                                </div>
                            </div>
                            <div class="sm:my-[30px] mx-[90px] flex flex-col items-center">
                                <div class="flex items-end">
                                    <div class="medi h-[130px] w-[20px] bg-[#22c55e] rounded-t-lg mr-2"></div>
                                    <div class="medi h-[110px] w-[20px] bg-[#22c55e] rounded-t-lg mr-2"></div>
                                    <div class="medi h-[90px]  w-[20px] bg-[#22c55e] rounded-t-lg mr-2"></div>
                                    <div class="medi h-[70px]  w-[20px] bg-[#22c55e] rounded-t-lg"></div>
                                </div>
                                <div class="mt-3">
                                    <h3 class="text-[#22c55e]">Wins -> ${dadosUser[0].wins}</h3>
                                </div>
                            </div>
                            <div class="flex flex-col items-center">
                                <div class="flex items-end">
                                    <div class="medi h-[130px] w-[20px] bg-[#e11d48] rounded-t-lg mr-2"></div>
                                    <div class="medi h-[110px] w-[20px] bg-[#e11d48] rounded-t-lg mr-2"></div>
                                    <div class="medi h-[90px]  w-[20px] bg-[#e11d48] rounded-t-lg mr-2"></div>
                                    <div class="medi h-[70px]  w-[20px] bg-[#e11d48] rounded-t-lg"></div>
                                </div>
                                <div class="mt-3">
                                    <h3 class="text-[#e11d48]">Losses -> ${dadosUser[0].losses}</h3>
                                </div>
                            </div>
                        </div>

                    </div>
                `;

            })
            .catch(error => {
                console.log(error);
                throw new Error("Não é possível continuar!");
            })
        
    }

}