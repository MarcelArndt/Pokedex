let currentPokeCounter = 1;
let currentposition = 0;
let loadedPokeArray = [];
let additionaInfos =  [];
let content = "";

function init(){
    content = document.getElementById("content");
    resetContent();
    pullRotation(25);
}


function resetContent(){
    content.innerHTML = "";
}

async function toTitleName(){
    let name = await loadedPokeArray[currentposition]["name"];
    let titledName = name[0].toUpperCase() + name.slice(1);
    return titledName;
}


async function pullPokemons(numberOfSteps){
    for (let i=0; i <= numberOfSteps; i++){
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokeCounter}`);
    currentPokemon = await response.json();
    currentPokeCounter++;
    loadedPokeArray.push(currentPokemon);
    }
    await renderPokemonCard(numberOfSteps);

}


async function buildNumber(){
    let newId = loadedPokeArray[currentposition]["id"];
    let stringNumber = newId.toString();
    for(i=0; stringNumber.length < 3; i++){
    stringNumber = "0" + stringNumber;
    }
    return stringNumber
}


async function buildColorTheme(){
    let getPokemonType = await loadedPokeArray[currentposition]["types"][0]["type"]["name"]
    let color = catchColorTemplate(getPokemonType)
    return color
}


async function buildTypes(){
    type = ``
    for (let i=0; i < loadedPokeArray[currentposition]["types"].length; i++){
        type += `<li>${loadedPokeArray[currentposition]["types"][i]["type"]["name"]}</li>`;
    }
    return type
}


async function renderPokemonCard(numberOfSteps){
    for (let i=1; i <= numberOfSteps; i++){
        let number = await buildNumber();
        let types =  await buildTypes();
        let colorTheme = await buildColorTheme();
        let name = await toTitleName();
        content.innerHTML += templatePokeCard(currentposition, number, colorTheme, types, name);
        currentposition++;
    }
}


async function pullRotation(number){
    for (let i = 1; i <= number;i++){
       await pullPokemons(1);
    }
}
console.log(loadedPokeArray);






/* ToDo: Karte erstellen -->

        Pokemon anhand von Nummer pullen
        erst 40 ziehen
        Pokemon in array pushen
        layout aufbauen
        nach layout weitere 40 ziehen.

            - Name
            - Id
            - Typ
            - Fähigkeiten
            - Attacken
            - Evolotion
            - Werte
            - Bild
            - IsLiked?
            - IsTeam?
            
*/