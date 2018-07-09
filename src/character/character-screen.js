import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ShowView} from '../messages';
import {save} from '../modules/save';

@inject(EventAggregator)
export class CharacterScreen {
  constructor(messaging) {
      this.show=false;
      this.showgeneral=true;
      this.showabilities=false;
      this.showskills=false;
      this.showfeats=false;
      this.showtalents=false;
      this.showdetails=false;
      this.showdeck=false;
      this.showprograms=false;
      this.messaging=messaging;
      
      let me=this;
      messaging.subscribe(ShowView,function(show){
          if(show.view=='CharacterScreen') me.show=true;
      });
  }
  
  select(e){
    let id=e.target.id;
    let buttons=
      this.charactermenu.querySelectorAll('button');
    for(let button of buttons){
      let classes=button.classList;
      if(!classes) continue;
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

