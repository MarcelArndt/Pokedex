async function getPokemonsList(){
    let responseList = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1011&offset=0");
    responseList = await responseList.json()
    for (let l = 0; l < await responseList["results"].length; l++) {
        let newObject = {name: await responseList["results"][l]["name"],
                         pokemonId : l+1}
        loadedPokeArray.push(newObject);
    }
}


async function initRenderCard(startValue, rangeValue){
    rangeValue = startValue + rangeValue;
    for (let i = startValue; i <= rangeValue; i++){
        let id = i+1;
        try{
        await getAdditionInfos(id);
        await buildBaseStrukture(id);
        await toRenderCard(id);
        }catch{};
    }
}


async function getAdditionInfos(id){
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    response = await response.json();
    await getGermanName(id, response);
    await getSpecies(id, response);
}


async function buildBaseStrukture(id){
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    response = await response.json()
    await getPicture(id, response);
    await buildTypes(id, response);
    await getAudio(id, response);
    await getHight(id, response);
    await getWeight(id, response);
    await getSkills(id, response);
    await buildNumber(id);
    await buildColorTheme(id);
}


async function getAudio(id, fetchData){
    let audio = fetchData["cries"]["latest"];
    let newObject = {"audio": audio};
    Object.assign(loadedPokeArray[id-1], newObject);
}


async function getPicture(id, fetchData){
    let picture = fetchData["sprites"]["other"]["official-artwork"]["front_default"];
    let newObject = {"picture": picture};
    Object.assign(loadedPokeArray[id-1], newObject);
}


async function getSpecies(id, fetchData){
    let species = await fetchData["genera"][4]["genus"];
    let newObject = {species: species}
    Object.assign(loadedPokeArray[id-1], newObject)
}


async function getHight(id, fetchData){
    let height = fetchData["height"];
    let text = `Bis zu ${height*10} cm od. ${Math.round(height*3.973)} inch groß.`;
    let newObject = {height: height,
                     textForHeight: text};
    Object.assign(loadedPokeArray[id-1], newObject)
}


async function getWeight(id, fetchData){
    let weight = fetchData["weight"];
    let text = `Bis zu ${weight/10} Kg od. ${Math.round(weight/4.536)} Pfund schwer.`;
    let newObject = {weight: weight,
                     textForHeight: text};
    Object.assign(loadedPokeArray[id-1], newObject)
}


async function getSkills(id, fetchData){
    let skillSum = "";
    for (let i=0; i < fetchData["abilities"].length; i++){
        let word = toTitleWord(fetchData["abilities"][i]["ability"]["name"]);
        skillSum += word + "," +" ";
    }
    skillSum = skillSum.slice(0, -2)
    let newObject = {"listOfAbility": skillSum};
    Object.assign(loadedPokeArray[id-1], newObject);
}


async function getGermanName(id, fetchData){
    let name = await fetchData["names"][5]["name"];
    let newObject = {germanName : name};
    Object.assign(loadedPokeArray[id-1], newObject);
}


async function buildNumber(id){
    let stringNumber = id.toString();
    for(i=0; stringNumber.length < 3; i++){
    stringNumber = "0" + stringNumber;
    }
    let newObject = {"visualNumber": stringNumber};
    Object.assign(loadedPokeArray[id-1], newObject)
}


async function buildColorTheme(id){
    let getPokemonType = await loadedPokeArray[id-1]["typeSummary"][0][0];
    let color = catchColorTemplate(getPokemonType);
    let newObject = {"colorTheme": color};
    Object.assign(loadedPokeArray[id-1], newObject);
}


async function buildTypes(id, fetchData){
    let typesum = [];
    let type = ``;
    for (let i=0; i < await fetchData["types"].length; i++){
        let word = toTitleWord(await fetchData["types"][i]["type"]["name"]);
        type += `<li>${word}</li>`;
        typesum.push(await fetchData["types"][i]["type"]["name"]);
    }
    let newObject = {"typeHTML": type, "typeSummary": [typesum]};
    Object.assign(loadedPokeArray[id-1], newObject);

}


function toTitleWord(string){
    let firstLetter = string[0];
    firstLetter = firstLetter.toUpperCase();
    string = string.substr(1).toLowerCase();
    let newString = firstLetter + string;
    return newString
}
