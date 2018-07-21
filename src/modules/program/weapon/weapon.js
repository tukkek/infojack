import {Program} from '../program';
import {console} from '../../cyberspace/console';
import {sound} from '../../sound';

export class Weapon extends Program{
  attack(attack,damage,soundfile,system,silent=false){
    let p=system.player;
    let target=p.target;
    if(!target){
      console.print('Select a target first...');
      return;
    }
    system.player.ap+=this.apcost;
    sound.play(soundfile);
    console.log('attack bonus '+attack);
    console.log('damage '+damage);
    console.log('target hp '+target.character.hp);
    console.log('target ac '+target.character.getdefence());
    let hit=p.attack(attack,target,damage);
    if(!hit) console.print('You miss...');
    if(!silent||(hit&&target.character.hp>0))
      system.raisealert(2);
  }
  
  conflict(program){
    return super.conflict(program)||
      program instanceof Weapon;
  }
}
