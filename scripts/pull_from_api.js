async function checkPullCounter(){
    let pullcounter = loadedPokeArray.length +1;
    if(pullcounter < 1024){
        return false;
    }else{
        console.log("Dataset loading is complet.");
        return true;
    }
}


async function getlatestPullPosition(){
    if (loadedPokeArray.length <= 0){
        loadedPokeArray = [];
    }
    latestPositionId = loadedPokeArray.length -1; 
    latestPokemonId = await loadedPokeArray[loadedPokeArray.length -1]["id"]; // Pokemon Id doesn't start at 0. !Pokemon #000 doens't exist!
    return [latestPositionId, latestPokemonId];
}


async function pullPokemons(startPosition, pullamount){
     pullamount += startPosition;
     if(startPosition <= 1){startPosition = 1}; // Pokemon Id doesn't start at 0. !Pokemon #000 doens't exist!
    for (let i = startPosition; i < pullamount; i++){
    let isAllData = await checkPullCounter();
    if(!isAllData){
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let currentPokemon = await response.json();
        loadedPokeArray.push(currentPokemon);
        let id = await getlatestPullPosition();
        await additionInfos(id[1]);
        }
    }
}


async function additionInfos(){
    let id = await getlatestPullPosition();
    let url = `https://pokeapi.co/api/v2/pokemon-species/${id[1]}/`;
    let data = await fetch(url);
    data =  await data.json();
    await buildNumber(id[0])
    await buildColorTheme(id[0]);
    await getHight(id[0]);
    await getWeight(id[0])
    await buildTypes(id[0]);
    await getSkills(id[0]);
    await getSpecies(id[0], data);
    await getGermanName(id[0], data)
}


async function getSpecies(id, data){
    let value = await data["genera"][4]["genus"];
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
    loadedPokeArray[id]["name"] = await name;
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