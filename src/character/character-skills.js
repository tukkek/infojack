import {skills} from '../modules/character/skill';
import {hero} from '../modules/character/character';
import {inject} from 'aurelia-framework';

var CROSSCLASS=false; //disable (only 1 skill is CC...)

export class CharacterSkills {
    constructor() {
        this.skills=skills;
        this.hero=hero;
        this.values={};
        for(let s of skills.values()) this.values[s.name]=hero.getskill(s.name);
    }
    
    iscrossclass(skill){
        return CROSSCLASS&&!hero.classskills.includes(skill);
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
    }
    
    canupgrade(value,skill){
        let cost=this.buy(skill);
        return hero.ranks>=cost && value<3+hero.level;
    }
}
