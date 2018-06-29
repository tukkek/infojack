import {feats} from '../modules/character/feat';
import {hero} from '../modules/character/character';
import {inject} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';

@inject(BindingSignaler)
export class CharacterFeats {
    constructor(BindingSignaler) {
        this.signals=BindingSignaler;
        this.feats=feats;
        this.hero=hero;
    }
    
    add(feat){
        if(hero.newfeats==0) return;
        hero.newfeats-=1;
        hero.addfeat(feat);
        this.signals.signal('update');
    }
    
    validate(feat){
        return hero.newfeats>0&&feat.validate(hero);
    }
}
