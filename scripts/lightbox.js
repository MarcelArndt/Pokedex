function setupcloseanimation(){
    let lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("animation_fadein");
    lightbox.classList.add("animation_fadeout");
}


function toggle_popup(){
    let myAttribute = document.querySelectorAll("[Can_Be_Blur]")
    for(let i = 0; i < myAttribute.length;i++){
        myAttribute[i].classList.remove("addblur");
    }
    let blackbox = document.getElementById("blackbox");
    blackbox.classList.toggle("display_none");
}


function resetLightboxContent(){
    let lightBoxContent = document.getElementById("lightbox_content");
    lightBoxContent.innerHTML = "";
}


function closeLightbox(){
    setupcloseanimation();
    toggle_popup();
    setTimeout(resetLightboxContent, 250);
}


function openLightbox(id){
    let myAttribute = document.querySelectorAll("[Can_Be_Blur]")
    for(let i = 0; i < myAttribute.length;i++){
        myAttribute[i].classList.add("addblur");
    }
    let lightboxContent = document.getElementById("lightbox_content");
    lightboxContent.innerHTML = "";
    lightboxContent.innerHTML += templatePokeLightBox(id);
}

function switchLightBoxContent(id){
    for (let i=1; i <= 4; i++){
        let getElement = document.getElementById(`infoBox-${i}`);
        getElement.classList.remove("slide-in-right");
        getElement.classList.add("slide-out-left");
    }
    let getElement = document.getElementById(`infoBox-${id}`);
    getElement.classList.remove("slide-out-left");
    getElement.classList.add("slide-in-right");
}

async function generateMoves(id){
    getContent = document.getElementById("contentAttacks");
    getContent.innerHTML = "";
    for (let i = 0; i < loadedPokeArray[id]["attacks"].length; i++){
        getContent.innerHTML += `<li>${loadedPokeArray[id]["attacks"][i]}</li>`;
    }
}