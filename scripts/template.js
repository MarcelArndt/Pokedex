function templatePokeCard(id){
    return `<section onclick="openLightbox('${id}')" class="pokemonCard ${loadedPokeArray[id]["colorTheme"]}" id="${id}">
    <div class="pokemonCardMenu">
      <div class="menu_icon"><img src="./img/icons/menu.png"></div>
      <ul>
        <li class="fav"><img src="./img/icons/star-fill.png"></li>
        <li class="team"><img src="./img/icons/pokeball.png"></li>
      </ul>
    </div>
    <img src="./img/pokeball_small_card.png">
      <div class="pokemonCardId">#${loadedPokeArray[id]["id"]}</div>
      <div class="pokemonCardName">${loadedPokeArray[id]["name"]}</div>
      <div class="pokemonCardType"><ul id="470_type">${loadedPokeArray[id]["typeHTML"]}</ul></div>
      <div class="card_image"><img src="${loadedPokeArray[id]["sprites"]["other"]["official-artwork"]["front_default"]}"></div>
    </section>`;
}


function templatePokeLightBox(id){
  return `<div id="blackbox">
  <div id="lightbox" class="animation_fadein popup_lightbox">
    <div class="content_wrapper">

      <div class="boxhead ${loadedPokeArray[id]["colorTheme"]}"> 
        <nav class="boxheadnav">
          <ul>
            <li onclick="closeLightbox()"><img src="./img/icons/x.png"></li>
            <li><img src="./img/icons/star.png"></li>
            <li><img src="./img/icons/pokeball.png"></li>
          </ul>
        </nav>
        <div class="boxheadname">${loadedPokeArray[id]["name"]}</div>
        <div class="boxheadtype"><ul>${loadedPokeArray[id]["typeHTML"]}</ul></div>
        <div class="boxheadid">#${loadedPokeArray[id]["id"]}</div>
        <div class="backgoundelement"><img src="./img/pokeball_500px.png"></div>
      </div>

      <div class="bufferbox">
        <div class="picturearea">
          <div class="lightbox_image"><img src="${loadedPokeArray[id]["sprites"]["other"]["official-artwork"]["front_default"]}"><img class="shadow" src="./img/shadow.png"></div>
        </div>
      </div>
      
      <div class="mainarea"></div>
    </div>
  </div>
</div>`;
}


function catchColorTemplate(getPokemonType){
    let color = "";
    switch(getPokemonType){
        case "grass": case "bug": color = "green";break;
        case "fire": color = "red";break;
        case "water": color = "blue";break;
        case "normal": case "steel": color = "grey";break;
        case "poison": case "ghost": color = "purble";break;
        case "electric": color = "yellow";break;
        case "ground": case "rock": color = "brown";break;
        case "fairy": case "psychic": color = "pink";break;
        case "fighting": color = "orange";break;
        case "dark": color = "dark";break;
        case "ice":  case "flying": color = "cyan";break;
        case "dragon": color = "drake";break;
        default: color = "grey";
    }
    return color;
}