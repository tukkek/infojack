export class Radio {
    constructor() {
        this.active=false;
    }
  
    play(){
        this.audio.play();
        if(!this.active){
            this.audio.play();
        } else {
            this.audio.pause();
        }
        return true;
    }
}
