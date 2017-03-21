import {ShowCharacterView} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(EventAggregator)
export class CharacterScreen {
    constructor(messaging) {
        this.hide=false;
        this.messaging=messaging;
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
            if(button.id==id){
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
