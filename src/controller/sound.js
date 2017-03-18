var sound={};

sound.ERROR='Computer Error Alert-SoundBible.com-783113881.mp3';

sound.play=function(file){
    new Audio('./sounds/'+file).play();
}

