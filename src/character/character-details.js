import {hero,sign} from '../modules/character/character';
import {skills} from '../modules/character/skill';
import {Class} from '../modules/character/class/class';

export class CharacterDetails {
    constructor() {
      this.abilities=['Strength','Dexterity','Constitution','Intelligence','Wisdom','Charisma'];
      this.saves=['Fortitude','Reflexes','Will'];
      this.skills=skills;
      this.classes=Class.classes;
      this.hero=hero;
    }

    bind(){
      this.avatar=hero.connect();
    }
    
    getmodifier(ability){
      ability=ability.toLowerCase();
      ability=this.avatar.getmodifier(this.avatar[ability]);
      return sign(ability);
    }
    
    getsave(save){
      save=save.toLowerCase();
      return sign(this.avatar['get'+save]());
    }
    
    getskill(skill){
      skill=skill.name.replace(' ','').toLowerCase()
      return sign(this.avatar['get'+skill]());
    }
    
    sign(n){return sign(n);}
}
