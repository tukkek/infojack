import {Avatar} from './avatar';
import {console} from '../console';

export class Alarm extends Avatar{
  constructor(system){
    super(system);
  }
  
  scan(){
    this.setimage('nodes/alarm.bmp');
    this.tooltip='Alarm';
  }
  
  click(){
    if(this.system.alert==0){
      console.print('No alerts to clear right now...');
      return;
    }
    if(false) return; //TODO roll
    this.system.player.ap+=.5;
    this.system.raisealert(-1);
  }
}
