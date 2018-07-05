import {useView} from 'aurelia-framework';
import {hero} from '../modules/character/character';
import {Class} from '../modules/character/class/class';
import {inject} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';

@useView('./character-feats.html')
@inject(BindingSignaler)
export class CharacterTalents {
    constructor(BindingSignaler) {
        this.signals=BindingSignaler;
        this.viewname='Talents';
    }
    
    bind(){
      this.points=hero.talent;
      this.talents=new Map();
      for(let c in hero.classes)
        for(let [name,talent] of Class.classes.get(c).talents)
          this.talents.set(name,talent);
    }

    add(talent){
        if(hero.newfeats==0) return;
        this.points-=1;
        hero.talent-=1;
        hero.addfeat(talent);
        this.signals.signal('update');
    }
    
    validate(talent){
        return this.points>0&&talent.validate(hero);
    }
    
    getcurrent(){
      let current=[];
      for(let f of hero.feats) if(f.talent) current.push(f);
      return current;
    }
    
    getall(){return this.talents;}
}
