import {Avatar} from './avatar';
import {console} from '../console';
import {CRITICALMISS} from './player';

export class Alarm extends Avatar{//TODO create character with proper skill to disable
  scan(){
    this.setimage('nodes/alarm.bmp');
    this.tooltip='Alarm';
  }
  
  click(){
    if(this.system.alert==0){
      console.print('No alerts to clear right now...');
      return;
    }
    let p=this.system.player;
    let hacking=p.roll(p.character.gethacking());
    if(hacking==CRITICALMISS){
      console.print('You trigger the alarm by accident!');
      this.system.raisealert(+1);
      return;
    }
    if(hacking<this.scandc){
      console.print('You fail to disable the alert...');
      return;
    }
    this.system.player.ap+=.5;
    this.system.raisealert(-1);
  }
}
