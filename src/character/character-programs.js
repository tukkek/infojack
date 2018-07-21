import {PROGRAMS} from '../modules/program/program';
import {hero,sign} from '../modules/character/character';
import {deck} from '../modules/deck';
import {inject} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';

//TODO move out of character screen
@inject(BindingSignaler)
export class CharacterPrograms {
    constructor(BindingSignaler) {
      this.signals=BindingSignaler;
      this.programs=new Map();
      let keys=[];
      for(let k of PROGRAMS.keys()) keys.push(k);
      keys.sort();
      for(let k of keys) 
        this.programs.set(k,PROGRAMS.get(k));
    }
    
    attached(){this.refresh();}
    
    refresh(){
      this.name=hero.possess();
      this.wealth=hero.wealth;
      this.technology=sign(hero.gettechnology());
      this.signals.signal('update');
    }
    
    has(program){return deck.programs.indexOf(program)>=0;}
    
    getpurchaselabel(program){
      let wealth=program.purchasedc-10;
      if(wealth<0) wealth=0;
      return 'Requires '+wealth+'¥';
    }
    
    canbuy(program){
      return !this.has(program)&&
        hero.wealth+10>=program.purchasedc;
    }
    
    buy(program){
      if(program.buy()) this.refresh();
      else alert('Cannot buy error!');
    }
    
    cancreate(program){
      return !this.has(program)&&
        hero.gettechnology()+10>=program.programmingdc;
    }
    
    getprogramminglabel(program){
      return 'Requires technology '+
        sign(program.programmingdc-10);
    }
    
    create(program){
      deck.programs.push(program);
      this.refresh();
    }
}
