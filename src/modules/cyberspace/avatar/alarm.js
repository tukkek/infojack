import {Avatar} from './avatar.js';

export class Alarm extends Avatar{
  constructor(system){
    super('nodes/core.png',system);
    this.tooltip='Process';
  }
  
  scan(){
    this.setimage('nodes/alarm.bmp');
    this.tooltip='Alarm';
  }
  
  click(){
    super.click();
  }
}
