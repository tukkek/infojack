import {Weapon} from './weapon';
import {rpg} from '../../rpg';

export const grades=[];

class Blaster extends Weapon{
  constructor(grade){
    super('Blaster',grade,'blaster.png',2,5,10,20);
    this.duration=10;
    this.bonus=grade-1;
  }
  
  run(system){
    let attack=system.player.character.getranged()+
      this.bonus;
    let damage=rpg.r(1,6)+this.bonus;
    this.attack(attack,damage,'9mmPistol.wav',system);
  }
  
  describe(){
    return 'Deals 1d6+'+this.bonus+' damage (raises alarm)';
  }
}

for(let i=1;i<=11;i++) grades.push(new Blaster(i));
