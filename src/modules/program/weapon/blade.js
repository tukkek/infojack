import {Weapon} from './weapon';
import {rpg} from '../../rpg';

export const grades=[];

class Blade extends Weapon{
  constructor(grade){
    super('Blade',grade,'blade.png',1,4,9,18);
    this.bonus=grade-1;
  }
  
  upgrade(ntimes){super.upgrade(ntimes*2);}
  
  run(system){
    let c=system.player.character;
    let attack=c.getmelee()+this.bonus;
    let damage=rpg.r(1,4)+c.getmodifier(c.intelligence)+
      this.bonus*2;
    if(damage<1) damage=1;
    this.attack(attack,damage,'Portal.wav',system,true);
  }
  
  describe(){
    let bonus=this.bonus*2;
    return 'Deals 1d4+'+bonus+' mêlée damage (silent)';
  }
}

for(let i=1;i<=11;i++) grades.push(new Blade(i));
