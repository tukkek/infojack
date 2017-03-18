var sound={};

PREFIX=window.location.href.contains('localhost')?'./sounds/':'./infojack/sounds';
sound.ERROR='Computer Error Alert-SoundBible.com-783113881.mp3';

sound.play=function(file){
    new Audio(PREFIX+file).play();
}

