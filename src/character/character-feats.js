import {feats} from '../modules/character/feat';
import {hero} from '../modules/character/character';
import {Save} from '../modules/save';
import {inject} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';

@inject(Save,feats,hero,BindingSignaler)
export class CharacterFeats {
    constructor(Save,feats,hero,BindingSignaler) {
        this.save=Save;
        this.feats=feats;
        this.hero=hero;
        this.signals=BindingSignaler;
    }
    
    add(feat){
        if(hero.newfeats==0) return;
        hero.newfeats-=1;
        this.hero.addfeat(feat);
        this.save.save();
        this.signals.signal('update');
    }
    
    validate(feat){
        return hero.newfeats>0&&feat.validate(hero);
    }
}
