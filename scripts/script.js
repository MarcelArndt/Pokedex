let pullcounter = 0;
let rendercounter = 0;
let loadedPokeArray = [];
let iscaught =  []; // nur ids
let isliked =  []; // nur ids
let content = "";
let MyDataMode = [false, false];


async function init(){
    loadMyData();
    initScrollbar();
    content = document.getElementById("content");
    resetContent();
    renderLegendenCounter();
    startRendering(151);
}


function oncheckscroll(){
    /*maxScrollHight = document.body.scrollHeight - document.body.clientHeight - 100;
    if(window.scrollY > maxScrollHight){
        continueRendering(4);
    }*/
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


function toSearch(keyword){
    MyDataMode = [false, false]
    resetContent();
    for (let i=0; i < loadedPokeArray.length; i++){  
        let name = loadedPokeArray[i]["name"].toLowerCase()
    if (name.includes(keyword) || loadedPokeArray[i]["typeSummary"][0].includes(keyword)){
            renderPokemonCard(i)
        }
    }
}


async function checkPullCounter(){
    if(pullcounter < 1024){
        return false
    }else{
        console.log("Dataset loading is complet.")
        return true
    }
}


async function pullPokemons(pullamount){
    for (let i=1; i < pullamount; i++){
    let isAllData = await checkPullCounter();
    if(!isAllData){
        pullcounter++;
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pullcounter}`);
        let currentPokemon = await response.json();
        loadedPokeArray.push(currentPokemon);
        await additionInfos(pullcounter -1);
        }   
    }
}


async function additionInfos(id){
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${Number(id) +1}/`);
    data =  await data.json();
    await getGermanName(id, data)
    await buildNumber(id)
    await buildColorTheme(id);
    await getHight(id);
    await getWeight(id)
    await buildTypes(id);
    await getSkills(id);
    await getSpecies(id, data);
}


async function getSpecies(id, data){
    console.log(data);
    let value = data["genera"][4]["genus"];
    let newobject = {"species": value}
    Object.assign(loadedPokeArray[id], newobject)
}


async function getHight(id){
    let value = loadedPokeArray[id]["height"];
    let newValue = `Bis zu ${value*10} cm od. ${Math.round(value*3.973)} inch groß.`;
    loadedPokeArray[id]["height"] = newValue;
}


async function getWeight(id){
    let value = loadedPokeArray[id]["weight"];
    let newValue = `Bis zu ${value/10} Kg od. ${Math.round(value/4.536)} Pfund schwer.`;
    loadedPokeArray[id]["weight"] = newValue;
}


async function getSkills(id){
    let skillSum = "";
    for (let i=0; i < loadedPokeArray[id]["abilities"].length; i++){
        let word = toTitleWord(loadedPokeArray[id]["abilities"][i]["ability"]["name"]);
        skillSum += word + "," +" ";
    }
    skillSum = skillSum.slice(0, -2)
    let newObject = {"ListOfAbility": skillSum};
    Object.assign(loadedPokeArray[id], newObject);
}


async function getGermanName(id, data){
    let name = await data["names"][5]["name"];
    loadedPokeArray[id]["name"] = name;
}


async function buildNumber(id){
    let newId = await loadedPokeArray[id]["id"];
    let stringNumber = newId.toString();
    for(i=0; stringNumber.length < 3; i++){
    stringNumber = "0" + stringNumber;
    }
    let numberobject = {"visualnumber": stringNumber};
    Object.assign(loadedPokeArray[id], numberobject)
}


async function buildColorTheme(id){
    let getPokemonType = await loadedPokeArray[id]["types"][0]["type"]["name"]
    let color = catchColorTemplate(getPokemonType)
    let newObject = {"colorTheme": color};
    Object.assign(loadedPokeArray[id], newObject)
}


async function buildTypes(id){
    let typesum = [];
    let type = ``;
    for (let i=0; i < loadedPokeArray[id]["types"].length; i++){
        let word = toTitleWord(loadedPokeArray[id]["types"][i]["type"]["name"]);
        type += `<li>${word}</li>`;
        typesum.push(loadedPokeArray[id]["types"][i]["type"]["name"]);
    }
    let newObject = {"typeHTML": type, "typeSummary": [typesum]};
    Object.assign(loadedPokeArray[id], newObject);
}

function toTitleWord(string){
    let firstLetter = string[0];
    firstLetter = firstLetter.toUpperCase();
    string = string.substr(1).toLowerCase();
    let newString = firstLetter + string;
    return newString
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
    refreshPokemonCard(id);
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
    refreshPokemonCard(id);
    renderLegendenCounter();
    saveMyData();
    if(MyDataMode[0]){
        renderMyDataPokemon(MyDataMode[1])
    }
}


async function renderPokemonCard(id){
    let imageForFav =  checkIsliked(id);
    let imageForCatch =  checkIscaught(id);
    content.innerHTML += templatePokeCard(id, imageForFav, imageForCatch);
}


async function startRendering(number){
    await pullPokemons(number+1);
    for(let i=0; i< number; i++){ 
        rendercounter++;
        renderPokemonCard(i);
    }
}


async function continueRendering(number){
    await pullPokemons(10);
    console.log(loadedPokeArray);
    renderPokemonCard(rendercounter);
    }


async function renderMyDataPokemon(pokeArray){
    toRenderArray =  iscaught;
    if (pokeArray){
        toRenderArray = isliked;
    }
    resetContent();
    for(let i=0; i < await toRenderArray.length; i++){
        renderPokemonCard(toRenderArray[i]);
    }
    MyDataMode = [true, pokeArray];
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
    elemenet.innerHTML += refreshTemplatePokeCard(id, imageForFav, imageForCatch);
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
    isliked = encodePackage[0];
    iscaught = encodePackage[1];
}


console.log(loadedPokeArray);