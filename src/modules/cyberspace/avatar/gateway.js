import {Avatar} from './avatar';
import {Disconnect} from '../../../messages';

//TODO at some point could link to new system
export class Gateway extends Avatar{
  constructor(system){
    super(system);
    this.setname('Gateway');
    this.setimage('nodes/gateway.png');
    this.scanned=true;
  }
  
  click(){
    //TODO add free disconnect program, can cause alarm
    if(window.confirm('Do you want to leave the system?')){
      let d=new Disconnect();
      d.safe=true;
      throw d;
    }
  }
}
