function templatePokeCard(id, number, colorTheme, types, name){
    return `<section class="pokemonCard ${colorTheme}" id="${id}">
    <div class="pokemonCardMenu">
      <div class="menu_icon"><img src="./img/icons/menu.png"></div>
      <ul>
        <li class="fav"><img src="./img/icons/star-fill.png"></li>
        <li class="team"><img src="./img/icons/pokeball.png"></li>
      </ul>
    </div>
    <img src="./img/pokeball_small_card.png">
      <div class="pokemonCardId">#${number}</div>
      <div class="pokemonCardName">${name}</div>
      <div class="pokemonCardType"><ul id="470_type">${types}</ul></div>
      <div class="card_image"><img src="${loadedPokeArray[id]["sprites"]["other"]["official-artwork"]["front_default"]}"></div>
    </section>`
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