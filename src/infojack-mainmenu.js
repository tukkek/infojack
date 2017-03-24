import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Sound} from './modules/sound';
import {Save} from './modules/save';
import {ShowView} from './messages';

@inject(Sound,Save,EventAggregator)
export class MainMenu {
    constructor(sound,save,messaging) {
        this.sound=sound;
        this.save=save;
        this.show=true;
        this.messaging=messaging;
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
            this.show=false;
            this.messaging.publish(new ShowView('CharacterScreen'));
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
