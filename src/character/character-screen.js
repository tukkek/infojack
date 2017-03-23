import {ShowCharacterView} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(EventAggregator)
export class CharacterScreen {
    constructor(messaging) {
        this.hide=false;
        this.messaging=messaging;
        this.hideabilities=true;
        this.hideskills=true;
        this.hidefeats=true;
        this.hidedetails=true;
    }
    
    attached(){
        this.selectid('character-abilities');
    }
    
    selectid(id){
        for(let button of this.charactermenu.childNodes){
            let classes=button.classList;
            if(!classes){
                continue;
            }
            var hide=button.id==id;
            this['hide'+id.replace('character-','')]=hide;
            if(hide){
                classes.add('highlightbg');
            } else {
                classes.remove('highlightbg');
            }
        }
        this.messaging.publish(new ShowCharacterView(id));
    }
    
    select(e){
        this.selectid(e.target.id);
    }
}

