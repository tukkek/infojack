import {Program,SESSION,PROGRAMS} from './program';

class Armor extends Program{
  constructor(grade){
    super('Armor',grade,4,10,20);
    this.duration=SESSION;
    this.defence=+4+(grade-1);
  }
  
  load(player){
    if(super.load(player)) 
      player.hero.defence+=this.defence;
  }
  
  unload(player){
    if(super.unload(player))
      player.hero.defence-=this.defence;
  }
  
  describe(){
    return 'Adds +'+this.defence+' to defence';
  }
}

for(let armor=+4;armor<=+10;armor++)
  new Armor(armor-3);
