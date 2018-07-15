import {Avatar} from './avatar';
import {console} from '../console';
import {CRITICALMISS} from '../../rpg';

export class Alarm extends Avatar{//TODO create character with proper skill to disable
  scan(){
    this.setimage('nodes/alarm.bmp');
    this.setname('Alarm');
  }
  
  click(){
    if(this.system.alert==0)
      console.print('No alerts to clear right now...');
    else if(this.hack(true)) this.system.raisealert(-2);
  }
}
