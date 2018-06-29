//TODO add talents

import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ShowView} from '../messages';
import {save} from '../modules/save';

var STARTINGSCREEN='CharacterScreen';

@inject(EventAggregator)
export class CharacterScreen {
    constructor(messaging) {
        this.show=false;
        this.showabilities=true;
        this.showskills=false;
        this.showfeats=false;
        this.showdetails=false;
        this.showabilities=false; //TODO
        this.showdetails=true; //TODO
        this.messaging=messaging;
        
        let me=this;
        messaging.subscribe(ShowView,function(show){
            if(show.view==STARTINGSCREEN){
                me.show=true;
            }
        });
    }
    
    select(e){
        let id=e.target.id;
        for(let button of this.charactermenu.childNodes){
            let classes=button.classList;
            if(!classes){
                continue;
            }
            var show=button.id==id;
            this['show'+button.id.replace('character-','')]=show;
            if(show){
                classes.add('highlightbg');
            } else {
                classes.remove('highlightbg');
            }
        }
    }
    
    close(){
        save.save();
        this.show=false;
        this.messaging.publish(new ShowView('Cyberspace'));
    }
}

