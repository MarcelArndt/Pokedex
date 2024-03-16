let container = "";
let buttonImageRight = "";
let buttonImageRightMobil = "";
let buttonImageLeft = "";
let buttonImageLeftMobil = "";
let maxScrollWidth = "";


function initScrollbar(){
    container =  document.getElementById("scrollcontainer");
    buttonImageRight = document.getElementById("button_right");
    buttonImageRightMobil = document.getElementById("button_right_mobil");
    buttonImageLeft = document.getElementById("button_left");
    buttonImageLeftMobil = document.getElementById("button_left_mobil");
}


function moveRight(){
    maxScrollWidth = container.scrollWidth - container.clientWidth -20;
    container.scrollLeft += 250;
    if(container.scrollLeft >= maxScrollWidth){
        buttonImageRight.classList.add("minus_opacity");
        buttonImageRightMobil.classList.add("minus_opacity");
    }else{
        buttonImageLeft.classList.remove("minus_opacity");
        buttonImageLeftMobil.classList.remove("minus_opacity");
    } 

}


function checksize(){
    maxScrollWidth = container.scrollWidth - container.clientWidth -20;
    if(container.scrollLeft < maxScrollWidth){
        buttonImageRight.classList.remove("minus_opacity");
        buttonImageRightMobil.classList.remove("minus_opacity");
    }
}


function moveLeft(){
    container.scrollLeft += -250;
    if(container.scrollLeft < 20){
        buttonImageLeft.classList.add("minus_opacity");
        buttonImageLeftMobil.classList.add("minus_opacity");
    }else{
        buttonImageRight.classList.remove("minus_opacity");
        buttonImageRightMobil.classList.remove("minus_opacity");
    }
}