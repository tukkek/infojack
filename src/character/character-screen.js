//TODO add talents

import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ShowView} from '../messages';

@inject(EventAggregator)
export class CharacterScreen {
    constructor(messaging) {
        this.show=false;
        this.showabilities=true;
        this.showskills=false;
        this.showfeats=false;
        this.showdetails=false;
        
        let me=this;
        messaging.subscribe(ShowView,function(show){
            if(show.view=='CharacterScreen'){
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
        this.show=false;
    }
}

