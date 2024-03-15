async function startRenderAll(){
    resetContent();
    currentIndexHolder = 0;
    isInSearch = false;
    alreadyLoading = true;
    maxScrollHight = document.body.scrollHeight - document.body.clientHeight -25;
    if(maxScrollHight <= 0){
        for (let i =0; i < 8; i++){
            await initRenderCard(currentIndexHolder, 0)
            currentIndexHolder++;
            }
    }
    alreadyLoading = false;
}


function resetContent(){
    content.innerHTML = "";
}


async function toRenderCard(id){
    let imageForFav =  checkIsliked(id-1);
    let imageForCatch =  checkIscaught(id-1);
    content.innerHTML += await templatePokeCard(id-1, imageForFav, imageForCatch)
}


async function renderMyDataPokemon(pokeArray){
    isInSearch = true;
    let toRenderArray =  iscaught;
    if (pokeArray){
         toRenderArray = isliked;
    }
    resetContent();
    for(let i=0; i < toRenderArray.length; i++){
        await initRenderCard(toRenderArray[i], 0);
    }
    MyDataMode = [true, pokeArray];
}


async function oncheckscroll(){
    if(!isInSearch && !alreadyLoading){
    maxScrollHight = document.body.scrollHeight - document.body.clientHeight -75;
    if(window.scrollY > maxScrollHight){
        alreadyLoading = true
        await initRenderCard(currentIndexHolder, 4);
        currentIndexHolder = currentIndexHolder +5;
        alreadyLoading = false
    }
    }
}

    