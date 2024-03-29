let loadedPokeArray = [];
let iscaught =  []; // nur ids
let isliked =  []; // nur ids
let content = "";
let MyDataMode = [false, false];
let isInSearch = false;
let alreadyLoading = false;
let currentIndexHolder = 0;


async function init(){
    imageSlider();
    loadMyData();
    initScrollbar();
    content = document.getElementById("content");
    resetContent();
    renderLegendCounter();
    await getPokemonsList();
    await startRenderAll();
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
        let name = await loadedPokeArray[i]["name"].toLowerCase();
        let germanName = await ifGermanNameReady(i)
        let types = await ifTypeReady(i)
    if(types && germanName){
        if (germanName.includes(keyword) || types.includes(keyword)){
            await initRenderCard(i, 0);
            }
    }else{
        if (name.includes(keyword)){
            await initRenderCard(i, 0);
            }
    }
    }
}


async function ifTypeReady(index) {
    try{
    let types = "";
    if (await loadedPokeArray[index]["typeSummary"][0]){
        types = await loadedPokeArray[index]["typeSummary"][0];
        }
        return types;}catch{};
}


async function ifGermanNameReady(index) {
    let germanName = "";
    if (await loadedPokeArray[index]["germanName"]){
        germanName = await loadedPokeArray[index]["germanName"].toLowerCase();
        }
        return germanName;
}


function ignorclick(event){
    event.stopPropagation();
}


function checkIsliked(id){
    id = Number(id);
    let checkedisliked = false;
    let imageLink = "./img/icons/star.png"
    for (let i = 0; i < isliked.length;i++){
        if (id === isliked[i]){
            checkedisliked  = true;
        }
    }
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
    renderLegendCounter();
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
    renderLegendCounter();
    saveMyData();
    if(MyDataMode[0]){
        renderMyDataPokemon(MyDataMode[1])
    }
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
    audioSrc.src = await loadedPokeArray[id]["audio"];
    audiBlock = document.getElementById("audioBlock");
    audiBlock.load();
    audiBlock.play();
}