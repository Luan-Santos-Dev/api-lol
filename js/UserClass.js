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

    async dadosPartida(matchGame, localizador, api) {

        let spanLocal = document.getElementById(`match-${localizador}`);

        await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchGame}?api_key=${this.key}`)
                .then(response => { return response.json(); })
                .then(dados => {
                
                    dados.info.participants.forEach(participante => {
                        if (participante.summonerId == this.#id) {
                            spanLocal.innerHTML = `
                            <div class=" ${participante.win ? "border-l-4 border-green-500" : "border-l-4 border-red-500"} flex justify-around items-center h-[70px] mb-[10px]">
                                <div class="flex h-[40px]"> <!-- Campeão / Resultado -->
                                    <img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${participante.championName}.png" alt="campeao" width="40" height="40">
                                </div>
                                <div class="w-[90px] flex-column items-center"> <!-- KDA -->
                                    <p class="font-bold ${participante.win ? "text-[#22c55e]" : "text-[#e11d48]"}">${participante.win ? "Vitória" : "Derrota"}</p>
                                    <p class="text-white font-bold">${participante.kills} / ${participante.deaths} / ${participante.assists}</p>
                                </div>
                                <div class="flex-column"> <!-- Items -->
                                    <div class="flex mb-[5px]">
                                        ${participante.item0 != 0 ? `<img class="rounded-lg" src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${participante.item0}.png" alt="item" width="28" height="22">` : "<div class='h-[30px] w-[28px] bg-[#52525b] rounded-lg'></div>"}
                                        ${participante.item1 != 0 ? `<img class="rounded-lg mx-[10px]" src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${participante.item1}.png" alt="item" width="28" height="22">` : "<div class='h-[30px] w-[28px] rounded-lg mx-[10px] bg-[#52525b]'></div>"}
                                        ${participante.item2 != 0 ? `<img class="rounded-lg" src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${participante.item2}.png" alt="item" width="28" height="22">` : "<div class='h-[30px] w-[28px] bg-[#52525b] rounded-lg'></div>"}
                                        ${participante.item3 != 0 ? `<img class="rounded-lg mx-[10px]" src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${participante.item3}.png" alt="item" width="25" height="22">` : "<div class='h-[30px] w-[28px] rounded-lg mx-[10px] bg-[#52525b]'></div>"}
                                    </div>
                                    <div class="flex">
                                        ${participante.item4 != 0 ? `<img class="rounded-lg" src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${participante.item4}.png" alt="item" width="28" height="22">` : "<div class='h-[30px] w-[28px] bg-[#52525b] rounded-lg'></div>"}
                                        ${participante.item5 != 0 ? `<img class="rounded-lg mx-[10px]" src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${participante.item5}.png" alt="item" width="28" height="22">` : "<div class='h-[30px] w-[28px] rounded-lg mx-[10px] bg-[#52525b]'></div>"}
                                        ${participante.item6 != 0 ? `<img class="rounded-lg" src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${participante.item6}.png" alt="item" width="28" height="22">` : "<div class='h-[30px] w-[28px] bg-[#52525b] rounded-lg'></div>"}
                                    </div>
                                </div>
                                <div class=""> <!-- Campeãos (Inimigos/Aliados) -->

                                </div>
                            </div>
                            `;
                        }
                    });

                })
                .catch(error => {
                    api.error();
                    //console.error("Error:", error);
                })

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
                            <h1 class="text-2xl text-white font-bold">${this.#name}</h1>
                            <h1 class="text-white">Level: ${this.#summonerLevel}</h1>
                        </div>

                        <div class="linha-separar"></div>

                        <div class="flex sm:flex-col justify-center">
                            <div class="flex justify-center md:mr-5">
                                <img src="./img/${dadosUser[0].tier.toLowerCase()}.png" alt="elo" height="150" width="150">
                            </div>

                            <div class="flex flex-col items-center justify-center">
                                <h2 class="text-white font-bold">${dadosUser[0].tier}</h2>
                                <p class="text-white font-bold">Soloqueue</p>
                                <p class="text-white font-bold">Rank: ${dadosUser[0].rank}</p>
                                <p class="text-white font-bold">LP: ${dadosUser[0].leaguePoints}</p>
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
                                    <span class="text-white">${dadosUser[0].wins + dadosUser[0].losses}</span>
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
        
    }

}