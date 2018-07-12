import {Avatar} from './avatar';

export class Backdoor extends Avatar{
  constructor(system){
    super(system);
  }
  
  scan(){
    this.setimage('nodes/backdoor.bmp');
    this.tooltip='Backdoor';
  }
}
