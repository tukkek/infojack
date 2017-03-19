export class Sound{
    constructor(){
        this.PREFIX='../../sounds/';
        this.ERROR='Computer Error Alert-SoundBible.com-783113881.mp3';
    }
     
    play(file){
        new Audio(this.PREFIX+file).play();
    }
}
