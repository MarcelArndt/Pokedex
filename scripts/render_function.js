async function startRenderAll(){
    resetContent();
    loadedPokeArray = [];
    await pullPokemons(1, 12); 
    let currentPosition = await getlatestPullPosition();
    for (let i = 0; i <= currentPosition[0]; i++){ 
        await renderPokemonCard(i);
    }
}


async function initRefreshRenderAll(){
    isInSearch = false;
    await refreshRenderAll()
}


async function refreshRenderAll(){
    resetContent();
    let currentPosition = await getlatestPullPosition();
    let getIntForLoop = Math.floor(currentPosition[0] / 20);
    let iteration = 0;
    let holdCurrentIndex = 0;
    for (let i= 0; i < getIntForLoop; i++){
        iteration++;
        for (let x = holdCurrentIndex; x < 20 * iteration; x++){
            holdCurrentIndex++
            await renderPokemonCard(holdCurrentIndex);
        }
        } 
    let getRest = currentPosition[0] - (20 * getIntForLoop);
    let lastPosition = currentPosition[0] - getRest;
    for (let j = lastPosition; j < getRest; j++){
        await renderPokemonCard(j);
    }
}


async function continueRenderAll(){
    if (!alreadyLoading){
        alreadyLoading = true;
        let currentPosition = await getlatestPullPosition();
        let latestPokemonId = currentPosition[1];
        await pullPokemons(latestPokemonId +1, 4); // Pokemon Id doesn't start at 0. !Pokemon #000 doens't exist!
        let refreshPosition = await getlatestPullPosition();
        for (let i = currentPosition[0] +1; i <= refreshPosition[0]; i++){ 
            await renderPokemonCard(i);
        }
        alreadyLoading = false;
    }
}


async function renderPokemonCard(id){ 
    let imageForFav =  checkIsliked(id);
    let imageForCatch =  checkIscaught(id);
    content.innerHTML += await templatePokeCard(id, imageForFav, imageForCatch);
}


async function renderMyDataPokemon(pokeArray){
    isInSearch = true;
    toRenderArray =  iscaught;
    if (pokeArray){
         toRenderArray = isliked;
    }
    resetContent();
    for(let i=0; i < await toRenderArray.length; i++){
        await renderPokemonCard(toRenderArray[i]);
    }
    MyDataMode = [true, pokeArray];
}


async function oncheckscroll(){
    if(!isInSearch){
    maxScrollHight = document.body.scrollHeight - document.body.clientHeight -25;
    if(window.scrollY > maxScrollHight){
       await continueRenderAll();
    }
    }
}
    