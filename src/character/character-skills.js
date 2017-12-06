import {skills} from '../modules/skills';
import {hero} from '../modules/characters';
import {Save} from '../modules/save';
import {inject} from 'aurelia-framework';

@inject(Save)
export class CharacterSkills {
    constructor(Save) {
        this.save=Save;
        this.skills=skills;
        this.values={};
        this.hero=hero;
        for(let s of skills.values()) this.values[s.name]=hero.getskill(s.name);
    }
    
    iscrossclass(skill){
        return !hero.classskills.includes(skill);
    }
    
    buy(skill){
        return this.iscrossclass(skill)?2:1;
    }
    
    upgrade(skill){
        if(!this.canupgrade(this.values[skill],skill)) return;
        let cost=this.buy(skill);
        hero.ranks-=cost;
        this.values[skill]+=1;
        hero.setskill(skill,this.values[skill]);
        this.save.save();
    }
    
    canupgrade(value,skill){
        let cost=this.buy(skill);
        return hero.ranks>=cost && value<3+hero.level;
    }
}
