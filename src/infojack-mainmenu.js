import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Sound} from './modules/sound';
import {save} from './modules/save';
import {ShowView} from './messages';
import environment from './environment';

@inject(Sound,EventAggregator)
export class MainMenu {
    constructor(sound,messaging) {
        this.sound=sound;
        this.show=true;
        this.messaging=messaging;
        this.hassave=save.checkload()!=false;
        if(environment.view){
          let me=this;
          setTimeout(function(){
            me.close(environment.view);}
          ,1);
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
        save.clear();
        this.close('CharacterScreen');
    }
    
    loadgame(){
        if(this.hassave){
          save.load();
          this.close('CharacterScreen');
        }else{
          this.sound.play(this.sound.ERROR);
          alert('No save found!');
        }
    }
    
    close(open){
        this.show=false;
        this.messaging.publish(new ShowView(open));
    }
      
    openrepository(){
      window.open('https://github.com/tukkek/infojack');
    }
}
