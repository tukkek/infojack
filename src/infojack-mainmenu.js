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
        this.hassave=save.checkload()!=false;
    }
  
    showpending(){
        this.sound.play(this.sound.ERROR);
        setTimeout(function(){
            alert('Operation pending!');
        },100);
    }
    
    startgame(){
        if(this.hassave&&!confirm('Are you sure you want to start a new game? Any previous progress will be lost!')){
            return;
        }
        this.save.clear();
        this.close('CharacterScreen');
    }
    
    loadgame(){
        if(!this.hassave){
            this.sound.play(this.sound.ERROR);
        }
        this.save.load();
        this.close('CharacterScreen');//TODO open map
    }
    
    close(open){
        this.show=false;
        this.messaging.publish(new ShowView(open));
    }
      
    openrepository(){
      window.open('https://github.com/tukkek/infojack');
    }
}
