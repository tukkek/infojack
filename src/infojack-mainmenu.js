import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Sound} from './modules/sound';
import {Save} from './modules/save';
import {ShowView} from './messages';

var DEBUGVIEW='Cyberspace';

@inject(Sound,Save,EventAggregator)
export class MainMenu {
    constructor(sound,save,messaging) {
        this.sound=sound;
        this.save=save;
        this.show=true;
        this.messaging=messaging;
        this.hassave=save.checkload()!=false;
        if(DEBUGVIEW){
          let me=this;
          setTimeout(function(){me.close(DEBUGVIEW);},1);
        }
    }
  
    showpending(){
        this.sound.play(this.sound.ERROR);
        setTimeout(function(){
            alert('Operation pending!');
        },100);
    }
    
    startgame(){
        let prompt='Are you sure you want to start a new game? Any previous progress will be lost!';
        if(this.hassave&&!confirm(prompt)){
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
