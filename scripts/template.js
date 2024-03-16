async function templatePokeCard(id, imageForFav, imageForCatch){
  let newcontent = `<section id="${id}">` + await refreshTemplatePokeCard(id, imageForFav, imageForCatch) + `</section>`;
  return newcontent;
}


async function refreshTemplatePokeCard(id, imageForFav, imageForCatch){
  return `<div onclick="openLightbox('${id}')" class="pokemonCard ${await loadedPokeArray[id]["colorTheme"]}">
  <div onclick="ignorclick(event)" class="pokemonCardMenu">
    <div class="menu_icon"><img src="./img/icons/menu.png"></div>
    <ul>
      <li class="audio"><img src="./img/icons/volume-up-fill.png" onclick="playAudio('${id}')"></li>
      <li class="fav"><img src="${imageForFav}" onclick="switchIsliked('${id}')"></li>
      <li class="team"><img src="${imageForCatch}" onclick="switchIsCaught('${id}')"></li>
    </ul>
  </div>
  <img src="./img/pokeball_small_card.png">
    <div class="pokemonCardId">#${await loadedPokeArray[id]["visualNumber"]}</div>
    <div class="pokemonCardName">${await loadedPokeArray[id]["germanName"]}</div>
    <div class="pokemonCardType"><ul id="470_type">${await loadedPokeArray[id]["typeHTML"]}</ul></div>
    <div class="card_image"><img src="${await loadedPokeArray[id]["picture"]}"></div>
  </div>`;
}


function templatePokeLightBox(id){
  return `<div onclick="closeLightbox()" id="blackbox">

  <div id="lightbox" class="animation_fadein popup_lightbox">
      <div class="content_wrapper">

          <div onclick="ignorclick(event)" class="boxhead ${loadedPokeArray[id]['colorTheme']}"> 
              <nav id="lightboxnav" class="boxheadnav">
              ` + templateLightboxNav(id) + `  
              </nav>
              <div class="boxheadname">${loadedPokeArray[id]["germanName"]}</div>
              <div class="boxheadtype"><ul>${loadedPokeArray[id]["typeHTML"]}</ul></div>
              <div class="boxheadid">#${loadedPokeArray[id]["visualNumber"]}</div>
              <div class="backgoundelement"><img src="./img/pokeball_500px.png"></div>
          </div>

          <div onclick="ignorclick(event)" class="bufferbox">
              <div class="picturearea">
              <div class="lightbox_image"><img src="${loadedPokeArray[id]['picture']}"></div>
              </div>
          </div>

          <div onclick="ignorclick(event)" class="mainarea">
              <div class="lightbox_wrapper">
                  <div class="infoBox_wrapper">

                      <nav class="infoBoxNav">
                          <ul>
                              <li onclick="switchLightBoxContent('1')">Allgemein</li>
                              <li onclick="switchLightBoxContent('2'), createChart(${id})">Stats</li>
                              <li onclick="switchLightBoxContent('3'), generateMoves(${id})">Attacken</li>
                              <li onclick="switchLightBoxContent('4')">Infos</li>
                          </ul>
                      </nav>

                      <div id="infoBox-2" class="">
                          <h3>Statuswerte</h3>
                          <div class="infoBox-content centerContent">
                              
                        
                          <div>
                            <div class="infoRow"><div class="infoCategory">Leben: </div><div class="infovalue"> ${loadedPokeArray[id]['stats'][0]}</div></div>
                            <div class="infoRow"><div class="infoCategory">Angriff: </div><div class="infovalue"> ${loadedPokeArray[id]['stats'][1]}</div></div>
                            <div class="infoRow"><div class="infoCategory">Abwehr: </div><div class="infovalue">${loadedPokeArray[id]['stats'][2]}</div></div>
                            <div class="infoRow"><div class="infoCategory">Spezial-Ang.: </div><div class="infovalue">${loadedPokeArray[id]['stats'][3]}</div></div>
                            <div class="infoRow"><div class="infoCategory">Spezial-Abw.: </div><div class="infovalue">${loadedPokeArray[id]['stats'][4]}</div></div>
                            <div class="infoRow"><div class="infoCategory">Speed: </div><div class="infovalue">${loadedPokeArray[id]['stats'][5]}</div></div>
                              <canvas id="myChart"></canvas>
                            </div>
                          </div>
                      </div>

                      <div id="infoBox-3" class="">
                          <h3>Erlernbare Attacken</h3>
                          <div class="infoBox-content">
                            <ul id="contentAttacks">
                            </ul>
                          </div>
                      </div>

                      <div id="infoBox-4" class="">
                        <h3>Pokedex Eintrag</h3>
                        <div class="infoBox-content boxTextCenter">
                          <p>${loadedPokeArray[id]['infoText']}</p>
                        </div>
                      </div>

                      <div id="infoBox-1" class="">
                      <h3>Allgemeine Infos</h3>
                      <div class="infoBox-content">
                          <div class="infoRow"><div class="infoCategory">Species: </div><div> ${loadedPokeArray[id]['species']}</div></div>
                          <div class="infoRow"><div class="infoCategory">Körpergröße: </div><div> ${loadedPokeArray[id]['textForHeight']}</div></div>
                          <div class="infoRow"><div class="infoCategory">Gewicht: </div><div>${loadedPokeArray[id]['textForWeight']}</div></div>
                          <div class="infoRow"><div class="infoCategory">Fähigkeiten: </div><div>${loadedPokeArray[id]['listOfAbility']}</div></div>
                      </div>
                  </div>

                  </div>
              </div>
          </div>
      </div>
  </div>
</div>`;
}


function templateLightboxNav(id) {         
 return `
  <ul>
  <li onclick="closeLightbox()"><img src="./img/icons/x.png"></li>
  <li><img src="${checkIsliked(id)}" onclick="switchIsliked('${id}')"></li>
  <li><img src="${checkIscaught(id)}" onclick="switchIsCaught('${id}')"></li>
  <li><img src="./img/icons/volume-up-fill.png" onclick="playAudio('${id}')"></li>
  </ul>`
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