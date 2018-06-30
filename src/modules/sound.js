var PREFIX='./sounds/';

export class Sound{
    constructor(){
        this.ERROR='Computer Error Alert-SoundBible.com-783113881.mp3';
    }
     
    play(file){
        new Audio(PREFIX+file).play();
    }
}
