import {inject} from 'aurelia-framework';
import {Sound} from './modules/sound';
import {Save} from './modules/save';

@inject(Sound,Save)
export class MainMenu {
    constructor(sound,save) {
        this.sound=sound;
        this.save=save;
        
        this.hide=false;
    }
  
    showpending(){
        this.sound.play(this.sound.ERROR);
        setTimeout(function(){
            alert('Operation pending!');
        },100);
    }
    
    startgame(){
        if(confirm('Are you sure you want to start a new game? Any previous progress will be lost!')){
            this.save.clear();
            this.save.save();
            alert('Game started');
            this.hide=true;
        }
    }
    
    loadgame(){
        if(!this.save.load()){
            this.playerrorsound("No save game found! Please check you're using the exact same address as before!");
        }
      }
      
      
    openrepository(){
      window.open('https://github.com/tukkek/infojack');
    }
}
