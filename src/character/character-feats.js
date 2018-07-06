import {feats} from '../modules/character/feat';
import {hero} from '../modules/character/character';
import {inject} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';

@inject(BindingSignaler)
export class CharacterFeats {
    constructor(BindingSignaler) {
        this.signals=BindingSignaler;
        this.viewname='Feats';
    }
    
    bind(){this.points=hero.newfeats;}

    add(feat){
        if(this.points==0) return;
        this.points-=1;
        hero.newfeats-=1;
        feat.apply(hero);
        this.signals.signal('update');
    }
    
    validate(feat){
        return this.points>0&&feat.validate(hero);
    }
    
    getcurrent(){
      let current=[];
      for(let f of hero.feats) if(!f.talent) current.push(f);
      return current;
    }
    
    getall(){return feats;}
}
