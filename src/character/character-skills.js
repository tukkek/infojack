import {skills} from '../modules/character/skill';
import {hero} from '../modules/character/character';
import {inject} from 'aurelia-framework';
import environment from '../environment';

export class CharacterSkills {
  constructor() {
    this.skills=skills;
  }
  
  bind(){
    this.hero=hero;
    this.ranks={};
    for(let s of skills.values()) 
      this.ranks[s.name]=hero.getranks(s.name);
  }
  
  iscrossclass(skill){
    return environment.ccskills&&
      !hero.classskills.includes(skill);
  }
  
  buy(skill){
    return this.iscrossclass(skill)?2:1;
  }
  
  upgrade(skill){
    if(!this.canupgrade(this.ranks[skill],skill)) return;
    let cost=this.buy(skill);
    hero.ranks-=cost;
    this.ranks[skill]+=1;
    hero.setranks(skill,this.ranks[skill]);
    if(skill=='Profession'&&hero.level==1
      &&this.ranks[skill]==1) hero.wealth+=1;
  }
  
  canupgrade(value,skill){
    if(skills.get(skill).pending) return false;
    let cost=this.buy(skill);
    return hero.ranks>=cost && value<3+hero.level;
  }
  
  getability(skill){
    return skill.ability.substring(0,3).toUpperCase();
  }
}
