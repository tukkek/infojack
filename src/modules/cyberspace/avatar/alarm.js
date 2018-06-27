import {Avatar} from './avatar.js';

export class Alarm extends Avatar{
  constructor(system){
    super('nodes/alarm.bmp',system);
  }
  
  click(){
    super.click();
  }
}
