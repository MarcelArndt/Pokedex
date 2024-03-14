let loadedPokeArray = [];
let iscaught =  []; // nur ids
let isliked =  []; // nur ids
let content = "";
let MyDataMode = [false, false];
let isInSearch = false;
let alreadyLoading = false;


async function init(){
    loadMyData();
    initScrollbar();
    content = document.getElementById("content");
    resetContent();
    renderLegendenCounter();
    await startRenderAll();
    await continueRenderAll();
}


function resetContent(){
    content.innerHTML = "";
}


async function intSearchBar(){
    input = document.getElementById("pokeSearch").value;
    input =  input.toLowerCase();
    if (input.length > 2){
    toSearch(input);
    }
}


async function toSearch(keyword){
    isInSearch = true;
    MyDataMode = [false, false];
    resetContent();
    for (let i=0; i < loadedPokeArray.length; i++){
        let name = loadedPokeArray[i]["name"].toLowerCase();
    if (name.includes(keyword) || loadedPokeArray[i]["typeSummary"][0].includes(keyword)){
        await renderPokemonCard(i);
        }
    }
}


function ignorclick(event){
    event.stopPropagation();
}


function checkIsliked(id){
    id = Number(id);
    let checkedisliked = isliked.includes(id);
    let imageLink = "./img/icons/star.png"
    if (checkedisliked){
        imageLink = "./img/icons/star-fill.png"
    }
    return imageLink
}


function checkIscaught(id){
    id = Number(id);
    let checkedisCaught = iscaught.includes(id);
    let imageLink = "./img/icons/pokeball.png"
    if (checkedisCaught){
        imageLink = "./img/icons/pokeball_filled.png"
    }
    return imageLink
}


async function switchIsliked(id){
    id = Number(id);
    let checkedisliked = isliked.includes(id);
    if (!checkedisliked){
        isliked.push(id);
    }else{
        let myIndex = isliked.indexOf(id);
        isliked.splice(myIndex, 1);
    }
    await refreshPokemonCard(id);
    renderLegendenCounter();
    saveMyData();
    if(MyDataMode[0]){
        renderMyDataPokemon(MyDataMode[1])
    }
}


async function switchIsCaught(id){
    id = Number(id);
    let checkedIsCaught = iscaught.includes(id);
    if (!checkedIsCaught){
        iscaught.push(id);
    }else{
        let myIndex = iscaught.indexOf(id);
        iscaught.splice(myIndex, 1);
    }
    await refreshPokemonCard(id);
    renderLegendenCounter();
    saveMyData();
    if(MyDataMode[0]){
        renderMyDataPokemon(MyDataMode[1])
    }
}


function renderLegendenCounter(){
    let numberFav = isliked.length;
    let numbercatch = iscaught.length;
    let favContent = document.getElementById("fav_number");
    let catchContent = document.getElementById("caught_number");
    favContent.innerHTML = numberFav;
    catchContent.innerHTML = numbercatch;
}


async function refreshPokemonCard(id){
    let elemenet = document.getElementById(`${id}`);
    elemenet.innerHTML = "";
    let imageForFav = checkIsliked(id);
    let imageForCatch =  checkIscaught(id);
    elemenet.innerHTML += await refreshTemplatePokeCard(id, imageForFav, imageForCatch);
    try{
        let lightBoxNav = document.getElementById("lightboxnav");
        lightBoxNav.innerHTML = templateLightboxNav(id);
    }catch{}
}


function saveMyData(){
    let mydataPackage = [isliked,iscaught]
    let stringfyPackage = JSON.stringify(mydataPackage);
    localStorage.setItem("PokeDexSaveData_Marcel", stringfyPackage)
}


function loadMyData(){
    let getPackage = localStorage.getItem("PokeDexSaveData_Marcel");
    let encodePackage = JSON.parse(getPackage);
    if (!encodePackage){
        isliked = [];
        iscaught = [];
    }else{
        isliked = encodePackage[0];
        iscaught = encodePackage[1];
    }
}


async function playAudio(id){
    audioSrc = document.getElementById("audioData");
    audioSrc.src = await loadedPokeArray[id]["cries"]["latest"];
    audiBlock = document.getElementById("audioBlock");
    audiBlock.load();
    audiBlock.play();
}