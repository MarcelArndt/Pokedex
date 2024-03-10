function setupcloseanimation(){
    let lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("animation_fadein");
    lightbox.classList.add("animation_fadeout");
}


function toggle_popup(){
    let blackbox = document.getElementById("blackbox");
    let header = document.getElementById("navbar");
    let banner = document.getElementById("banner");
    blackbox.classList.toggle("display_none");
    content.classList.remove("addblur");
    header.classList.remove("addblur");
    banner.classList.remove("addblur");
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
    let lightboxContent = document.getElementById("lightbox_content");
    let header = document.getElementById("navbar");
    let banner = document.getElementById("banner");
    lightboxContent.innerHTML = "";
    lightboxContent.innerHTML += templatePokeLightBox(id);
    content.classList.add("addblur");
    header.classList.add("addblur");
    banner.classList.add("addblur");
}