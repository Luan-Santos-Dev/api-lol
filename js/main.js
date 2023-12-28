class User {

    #accountId;
    #id;
    #name;
    #profileIconId;
    #puuid;
    #summonerLevel;

    #key;

    set key(value) {
        this.#key = value;
    }

    get puuid() {
        return this.#puuid;
    }

    get profileIconId() {
        return this.#profileIconId;
    }

    get name() {
        return this.#name;
    }

    get summonerLevel() {
        return this.#summonerLevel;
    }

    get id() {
        return this.#id;
    }

    get key() {
        return this.#key;
    }

    relocateData(data = {}) {
        this.#accountId     = data.accountId;
        this.#id            = data.id;
        this.#name          = data.name;
        this.#profileIconId = data.profileIconId;
        this.#puuid         = data.puuid;
        this.#summonerLevel = data.summonerLevel;
    }

}

class Departures {

    #departures;

    update(value) {
        this.#departures = value;
    }

    get matches() {
        return this.#departures;
    }

}

class viewProfile {

    buildProfile(userAccount, window, user) {
        window.innerHTML = `
            <div class="flex flex-col items-center m-2">
                <div>
                    <img src="https://ddragon.leagueoflegends.com/cdn/13.21.1/img/profileicon/${user.profileIconId}.png" alt="icon" class="rounded-lg" width="70" height="70">
                </div>

                <div class="flex flex-col items-center">
                    <h1 class="text-2xl font-bold">${user.name}</h1>
                    <h1 class="">Level: ${user.summonerLevel}</h1>
                </div>

                <div class="linha-separar"></div>

                <div class="flex sm:flex-col justify-center">
                    <div class="flex justify-center md:mr-5">
                        <img src="./img/${userAccount[0].tier.toLowerCase()}.png" alt="elo" height="150" width="150">
                    </div>

                    <div class="flex flex-col items-center justify-center">
                        <h2 class="font-bold">${userAccount[0].tier}</h2>
                        <p class="font-bold">Soloqueue</p>
                        <p class="font-bold">Rank: ${userAccount[0].rank}</p>
                        <p class="font-bold">LP: ${userAccount[0].leaguePoints}</p>
                        <div>
                            <span class="text-[#22c55e]">Wins: ${userAccount[0].wins}</span>
                            <span class="text-[#e11d48]">Losses: ${userAccount[0].losses}</span>
                        </div>
                    </div>
                </div>

                <div class="linha-separar"></div>

                <div class="flex sm:flex-col justify-center">
                    <div class="flex justify-center items-center">
                        <div class="flex justify-center items-center w-[180px] h-[180px] rounded-full border-dashed border-2 border-gray-600">
                            <span class="">${userAccount[0].wins + userAccount[0].losses}</span>
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
                            <h3 class="text-[#22c55e]">Wins -> ${userAccount[0].wins}</h3>
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
                            <h3 class="text-[#e11d48]">Losses -> ${userAccount[0].losses}</h3>
                        </div>
                    </div>
                </div>

            </div>
        `;
    }

}

class Table {

    matchTable(numberTable = "", start = 0, end = 0, window = "", api = "", user = "", games) {

        let divMain = document.createElement("div");

        let divPartidas = document.createElement("div");
        divPartidas.className = "partidas flex flex-col mb-[30px]";
        divPartidas.id = "partidas-area";

        for (let i = start; i < end; i++) {

            let spanMatch = document.createElement("span");
            spanMatch.className = `match-${i}`;

            api.userRequest(`https://americas.api.riotgames.com/lol/match/v5/matches/${games.matches[i]}?api_key=${user.key}`, `match-user-${i}`)
            .then(match => {

                let arrayAllies  = [];
                let arrayEnemies = [];

                match.info.participants.forEach(participant => {
                    if (participant.teamId == 200) {
                        arrayAllies.push({ championName: participant.championName });
                    } else {
                        arrayEnemies.push({ championName: participant.championName });
                    }
                });

                match.info.participants.forEach(participant => {
                    if (participant.summonerId == user.id) {
                        spanMatch.innerHTML = `
                        <div id="select" class="${participant.win ? "border-l-4 border-green-500" : "border-l-4 border-red-500"} rounded-md mt-[15px] mb-[5px] shadow-xl shadow-[#DEEFE7]">
                            <div id="item-match" class="h-[80px] flex justify-between"> <!-- id="category-select" -->
                                <label for="info-item" class="flex items-center"> <!-- id="options-view-button" -->
                                    <div class="flex items-center ml-[20px]">
                                        <div class="h-[45px] w-[45px] flex justify-center items-center text-white bg-[#002333] rounded-lg font-semibold mr-[10px]"> <!-- Campeão / Resultado -->
                                            <!-- Verifique o nome do champ pra tomar um decisão de exibição -->
                                            ${ participant.championName == 'Hwei' ? `<div>${participant.championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${participant.championName}.png" alt="campeao" width="40" height="40">` }
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
                                                ${arrayAllies[0].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayAllies[0].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayAllies[0].championName}.png" alt="campeao" width="40" height="40">`}
                                                ${arrayAllies[1].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayAllies[1].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayAllies[1].championName}.png" alt="campeao" width="40" height="40">`}
                                                ${arrayAllies[2].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayAllies[2].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayAllies[2].championName}.png" alt="campeao" width="40" height="40">`}
                                                ${arrayAllies[3].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayAllies[3].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayAllies[3].championName}.png" alt="campeao" width="40" height="40">`}
                                                ${arrayAllies[4].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayAllies[4].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayAllies[4].championName}.png" alt="campeao" width="40" height="40">`}
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
                                                ${arrayEnemies[0].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayEnemies[0].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayEnemies[0].championName}.png" alt="campeao" width="40" height="40">`}
                                                ${arrayEnemies[1].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayEnemies[1].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayEnemies[1].championName}.png" alt="campeao" width="40" height="40">`}
                                                ${arrayEnemies[2].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayEnemies[2].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayEnemies[2].championName}.png" alt="campeao" width="40" height="40">`}
                                                ${arrayEnemies[3].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayEnemies[3].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayEnemies[3].championName}.png" alt="campeao" width="40" height="40">`}
                                                ${arrayEnemies[4].championName == 'Hwei' ? `<div class="h-[40px] w-[40px] flex justify-center items-center text-white bg-[#002333] rounded-lg">${arrayEnemies[4].championName}</div>` : `<img src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${arrayEnemies[4].championName}.png" alt="campeao" width="40" height="40">`}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="col-span-12 md:col-span-7 lg:col-span-7 xl:col-span-7"> <!-- Grafico -->
                                        <h3 class="text-center font-bold">Informações adicionais</h3>
                                        <div class="flex flex-col gap-2">

                                            <p class="text-[#B4BEC9] font-bold p-2 transition duration-[0.6s] hover:bg-[#DEEFE7] cursor-pointer rounded-lg">Modo de jogo: <span class="text-[#159A9C]">${match.info.gameMode}</span></p>
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
                    }
                });

                divPartidas.appendChild(spanMatch);

            })
        }

        divMain.appendChild(divPartidas);

        let divNumberTables = document.createElement("div");
        divNumberTables.className = "numero-tabelas flex justify-center";

        for (let t = 0; t < 5; t++) { 
            let buttonTabela = document.createElement("button");
            buttonTabela.className = numberTable == (t+1)? `tabela-${t+1} mx-1 bg-[#002333] text-white font-bold py-1 px-3 rounded` : `tabela-${t+1} mx-1 bg-[#DEEFE7] hover:bg-[#002333] text-white font-bold py-1 px-3 rounded`;
            buttonTabela.textContent = t + 1;

            buttonTabela.addEventListener("click", () => {
                window.innerHTML = "";
                this.matchTable(t + 1 ,4 * t, ((4 * t) + 4), window, api, user, games);
            });

            divNumberTables.appendChild(buttonTabela);
        }

        divMain.appendChild(divNumberTables)

        window.innerHTML = "";
        window.append(divMain);

        lucide.createIcons();
        
    }

}

class Api {

    #cache;

    constructor() {
        this.#cache = new Cache();
    }

    async userRequest(path, search_parameter) {
        if (this.#cache.getItem(search_parameter)) {
            return this.#cache.getItem(search_parameter);
        }

        return await fetch(path).then(res => res.json() )
        .then(data => { 
            this.#cache.setItem(search_parameter, data, {
                expirationAbsolute: null,
                expirationSliding: 180, // 3m
                priority: Cache.Priority.NORMAL,
                callback: function (k, v) { console.log("removido: ", k); }
            })

            return this.#cache.getItem(search_parameter);
        })
    }
}

class Success {

    successSearch(screen) {
        screen.innerHTML = this.layoutSuccessSearch(
            "fa-solid fa-check fa-2xl text-center",
            "Sucesso na pesquisa!"
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

}

class Error {

    keyError(screen) {
        screen.innerHTML = this.layoutError(
            "fa-solid fa-key fa-2xl text-center",
            "Verifique se você colocou a sua chave."
        );
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

    error(screen) {
        screen.innerHTML = this.layoutError(
            "fa-solid fa-exclamation fa-2xl text-center",
            "Opá! Parece que aconteceu algo de errado."
        );
    }

}

class Buttons {

    placeButtons(buttons) {
        buttons.forEach(element => {
            element.classList.remove("invisivel");
            element.classList.add("visivel");
        });
    }

    removeButtons(buttons) {
        buttons.forEach(element => {
            element.classList.remove("visivel");
            element.classList.add("invisivel");
        });
    }

}

class AccessControl {

    #user;
    #api;
    #table;
    #success;
    #error;
    #viewProfile;
    #departures;

    window;

    constructor(screen) {
        this.#user        = new User();
        this.#api         = new Api();
        this.#table       = new Table();
        this.#success     = new Success();
        this.#error       = new Error();
        this.#viewProfile = new viewProfile();
        this.#departures  = new Departures();
        this.window       = screen;
    }

    get error() {
        return this.#error;
    }

    testUser(name = "", buttonsDropdown, keyValue) {
        this.#user.key = keyValue;
        let buttons = new Buttons();

        this.#api.userRequest(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${this.#user.key}`, `username-${name}`)
        .then(dataUser => {

            this.#success.successSearch(this.window);
            buttons.placeButtons(buttonsDropdown);

            this.#user.relocateData(dataUser);
        })
        .catch(error => {
            this.#error.error(this.window);
            buttons.removeButtons(buttonsDropdown);
        })
    }

    userProfile() {
        this.window.innerHTML = "";

        this.#api.userRequest(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${this.#user.id}?api_key=${this.#user.key}`, `userProfile-${this.#user.name}`)
        .then(dataProfile => {
            this.#viewProfile.buildProfile(dataProfile, this.window, this.#user);
        })
        .catch(error => {
            this.#error.error(this.window);
        })
    }

    RenderTable() {
        this.#api.userRequest(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${this.#user.puuid}/ids?start=0&count=20&api_key=${this.#user.key}`, `matches-${this.#user.name}`)    
        .then(matches => {
            this.#departures.update(matches);

            this.#table.matchTable(1, 0, 4, this.window, this.#api, this.#user, this.#departures);
        })
        .catch(error => {
            this.#error.error(this.window);
        })
    }
}

const screen    = document.getElementById("area-exibicao");
const keyTop    = document.getElementById("key-text-top");
const buttons   = document.querySelectorAll(".button-down");
const search    = document.getElementById("search-button");
const buttonKey = document.getElementById("key-button");

let control = new AccessControl(screen);

search.addEventListener("click", () => {
    const username   = editName(document.getElementById("search-text").value);
    const inputValue = document.getElementById("text-key").value;

    inputValue != "" ? control.testUser(username, buttons, inputValue) : control.error.errorKey(screen);
});

buttonKey.addEventListener("click", () => {
    if (keyTop.classList.contains("esconder")) {
        keyTop.classList.remove("esconder");
        keyTop.classList.add("mostrar");
    } else {
        keyTop.classList.remove("mostrar");
        keyTop.classList.add("esconder");
    }
});

buttons[0].addEventListener("click", () => { control.userProfile(); });

buttons[1].addEventListener("click", () => { control.RenderTable(); });

function editName(stringName) {
    let result = "";
    for (let i = 0; i < stringName.length; i++) {
        if (stringName[i] != " ") {
            result += stringName[i];
        }
    }
    return result;
}
