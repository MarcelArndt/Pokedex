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
    loadedPokeArray[currentposition]["name"] = titledName;
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
    loadedPokeArray[currentposition]["id"] = stringNumber;
}


async function buildColorTheme(){
    let getPokemonType = await loadedPokeArray[currentposition]["types"][0]["type"]["name"]
    let color = catchColorTemplate(getPokemonType)
    newObject = {"colorTheme": color};
    Object.assign(loadedPokeArray[currentposition], newObject)
}


async function buildTypes(){
    type = ``
    for (let i=0; i < loadedPokeArray[currentposition]["types"].length; i++){
        type += `<li>${loadedPokeArray[currentposition]["types"][i]["type"]["name"]}</li>`;
    }
    newObject = {"typeHTML": type};
    Object.assign(loadedPokeArray[currentposition], newObject)
}


async function renderPokemonCard(numberOfSteps){
    for (let i=1; i <= numberOfSteps; i++){
        await buildNumber();
        await buildTypes();
        await buildColorTheme();
        await toTitleName();
        content.innerHTML += templatePokeCard(currentposition);
        currentposition++;
    }
}


async function pullRotation(number){
    for (let i = 1; i <= number;i++){
       await pullPokemons(1);
    }
}


function setupcloseanimation(){
    let lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("animation_fadein");
    lightbox.classList.add("animation_fadeout");

}

function toggle_popup(){
    let blackbox = document.getElementById("blackbox");
    let header = document.getElementById("navbar");
    blackbox.classList.toggle("display_none");
    content.classList.remove("addblur");
    header.classList.remove("addblur");
}


function resetLightboxContent(){
    let lightBoxContent = document.getElementById("lightbox_content");
    lightBoxContent.innerHTML = "";
}


function closeLightbox(){
    setupcloseanimation();
    toggle_popup();
    setTimeout(resetLightboxContent, 250);
}

function openLightbox(id){
    let lightboxContent = document.getElementById("lightbox_content");
    let header = document.getElementById("navbar");
    lightboxContent.innerHTML = "";
    lightboxContent.innerHTML += templatePokeLightBox(id);
    content.classList.add("addblur");
    header.classList.add("addblur");
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