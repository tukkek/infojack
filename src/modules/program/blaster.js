import {Program} from './program';
import {console} from '../cyberspace/console';
import {rpg} from '../rpg';
import {sound} from '../sound';

class Blaster extends Program{
  constructor(grade){
    super('Blaster',grade,'blaster.png',5,10,20);
    this.size=2;
    this.duration=10;
    this.bonus=+grade;
  }
  
  run(system){
    let p=system.player;
    if(!p.target){
      console.print('Select a target first...');
      return;
    }
    system.player.ap+=this.apcost;
    sound.play(sound.ATTACK);
    let damage=rpg.r(1,6)+this.bonus;
    if(!p.attack(p.character.getranged(),p.target,damage)){
      console.print('You miss...');
    }
    system.raisealert(2);
  }
}

for(let grade=0;grade<=10;grade++) new Blaster(grade);
