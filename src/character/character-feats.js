import {feats} from '../modules/feats';
import {hero} from '../modules/characters';
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
        this.hero.addfeat(feat);
        this.save.save();
        this.signals.signal('update');
    }
}
