import {Avatar} from './avatar.js';

export class Backdoor extends Avatar{
  constructor(system){
    super('nodes/core.png',system);
    this.tooltip='Process';
  }
  
  scan(){
    this.setimage('nodes/backdoor.bmp');
    this.tooltip='Backdoor';
  }
}
