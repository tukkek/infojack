import {hero} from '../modules/character/character';
import {skills} from '../modules/character/skill';
import {Class} from '../modules/character/class/class';

export class CharacterDetails {
    constructor() {
      this.abilities=['Strength','Dexterity','Constitution','Intelligence','Wisdom','Charisma'];
      this.saves=['Fortitude','Reflexes','Will'];
      this.skills=skills;
      this.classes=Class.classes;
    }

    bind(){
      this.avatar=hero.connect();
    }
    
    sign(n){
      return n>=0?'+'+n:n;
    }
    
    getmodifier(ability){
      ability=ability.toLowerCase();
      ability=this.avatar.getmodifier(this.avatar[ability]);
      return this.sign(ability);
    }
    
    getsave(save){
      save=save.toLowerCase();
      return this.sign(this.avatar['get'+save]());
    }
    
    getskill(skill){
      skill=skill.name.replace(' ','').toLowerCase()
      return this.sign(this.avatar['get'+skill]());
    }
}
