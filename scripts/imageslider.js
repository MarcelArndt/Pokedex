let pictureArray = ["./img/banner/banner-1.png","./img/banner/banner-2.png","./img/banner/banner-3.png"]
let currentIndex = 0;
let iteration = 0


function imageSlider(){
    let ImageUpper = document.getElementById("positionUpper");
    let pictureBox = "";
    if (iteration == 2){
        pictureBox = document.getElementById("positionBelow");
        iteration = 0;
    }else{
        pictureBox = document.getElementById("positionUpper");
    }
    addCurrentIndex();
    ImageUpper.classList.toggle("imageSliderfade-in")
    ImageUpper.classList.toggle("imageSliderfade-out")
    pictureBox.src =  pictureArray[currentIndex];
    iteration++;
    setTimeout(imageSlider, 8000);
}


function addCurrentIndex(){
    if(currentIndex == pictureArray.length -1){
        currentIndex = 0;
    }else{
        currentIndex++;
    }
}