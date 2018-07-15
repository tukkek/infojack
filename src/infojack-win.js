import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ShowView} from './messages';
import {hero} from './modules/character/character';
import {rpg} from './modules/rpg';
import {save} from './modules/save';

var NICE=['Alright!','Sweet!','Hell to the yeah!','Score!','Bonus!','♫ A ♫ ma ♫ zing ♫','Groovy!','Hit it Johnny!','Loving it!','Totally radical!','Cowabanga!',"That's how you do it, chummer.",'Let it rip, choombata!'];

@inject(EventAggregator)
export class Win {
  constructor(messaging) {
    this.show=false;
    let me=this;
    messaging.subscribe(ShowView,function(show){
      if(show.view!='Win') return;
      me.refresh();
      me.show=true;
    });
  }
  
  refresh(){
    this.end=!hero.levelup();
    this.abilities=hero.pointextra;
    this.skills=hero.ranks;
    this.feats=hero.newfeats;
    this.wealth=hero.wealth+'¥';
    this.nice=rpg.choose(NICE);
  }
  
  close(){
    if(!this.end){
      this.show=false;
      return;
    }
    save.clear();
    window.location.reload();
  }
}
