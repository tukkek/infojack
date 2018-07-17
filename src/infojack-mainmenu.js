import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {sound} from './modules/sound';
import {save} from './modules/save';
import {ShowView} from './messages';
import environment from './environment';
import './modules/world/names';

@inject(EventAggregator)
export class MainMenu {
    constructor(EventAggregator) {
        this.show=true;
        this.messaging=EventAggregator;
        this.hassave=save.checkload()!=false;
        if(environment.view){
          let me=this;
          setTimeout(function(){
            me.close(environment.view);}
          ,1);
        }
    }
  
    showpending(){
        sound.play(sound.ERROR);
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
          sound.play(sound.ERROR);
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
