import {Program,SESSION,PROGRAMS} from './program';
import {console} from '../cyberspace/console';

class Armor extends Program{
  constructor(grade){
    super('Armor',grade,'armor.png',4,10,20);
    this.duration=SESSION;
    this.defence=+4+(grade-1);
  }
  
  modify(bonus,player){
    player.character.defence+=bonus;
    console.print('Your defence is now '+
      player.character.getdefence()+'.');
  }
  
  load(system){
    if(!super.load(system)) return false;
    this.modify(this.defence,system.player);
    return true;
  }
  
  unload(system){
    if(!super.unload(system)) return false;
    this.modify(-this.defence,system.player);
    return true;
  }
  
  describe(){
    return 'Adds +'+this.defence+' to defence';
  }
  
  run(system){console.print("Armor is already active.");}
}

for(let armor=+4;armor<=+10;armor++)
  new Armor(armor-3);
