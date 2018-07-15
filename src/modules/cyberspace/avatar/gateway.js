import {Avatar} from './avatar';
import {Disconnect} from '../../../messages';

export class Gateway extends Avatar{
  constructor(system){
    super(system);
    this.setname('Gateway');
    this.setimage('nodes/gateway.png');
    this.scanned=true;
  }
  
  click(){
    //TODO add free disconnect program, can cause alarm
    if(window.confirm('Do you want to leave the system?'))
      throw new Disconnect();
  }
}
