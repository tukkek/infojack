import {Avatar} from './avatar';

export class Backdoor extends Avatar{
  scan(){
    this.setimage('nodes/backdoor.bmp');
    this.tooltip='Backdoor';
  }
}
