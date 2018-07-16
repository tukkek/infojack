import {SecureAvatar} from './secure';
import {console} from '../../console';
import {CRITICALMISS} from '../../../rpg';

export class Alarm extends SecureAvatar{
  scan(){
    this.setimage('nodes/alarm.bmp');
    this.setname('Alarm');
  }
  
  click(){
    if(this.system.alert==0)
      console.print('No alerts to clear right now...');
    else if(super.click()) this.system.raisealert(-2);
  }
}
