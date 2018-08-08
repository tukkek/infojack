import {Avatar} from './avatar';
import {Disconnect} from '../../../messages';

const DISCONNECT='Do you want to leave the system?';
const JUMP='Do you want to leave the system?';

/*Allows for a safe exit (no alamrs raised) or entry into a deeper level, if any. */
export class Gateway extends Avatar{
  constructor(system,destination){
    super(system);
    if(destination){
      this.setname('Gateway (unscanned)');
      this.setimage('nodes/gatewayunscanned.png');
    }else{
      this.setname('Exit');
      this.setimage('nodes/gatewayexit.png');
      this.scanned=true;
    }
  }
  
  scan(){
    let d=this.node.destination;
    this.setname('Gateway to '+d.name);
    this.setimage('nodes/gateway.png');
  }
  
  confirm(prompt,destination=false){
    if(!window.confirm(prompt)) return false;
    let d=
      new Disconnect(destination?false:'You exit safely.');
    d.safe=true;
    d.reconnect=destination;
    return d;
  }
  
  click(){
    let destination=this.node.destination;
    let disconnect;
    if(destination){
      let prompt='Do you want to go to: '+
        destination.name+'?';
      disconnect=this.confirm(prompt,destination);
    }else{
      disconnect=this.confirm(DISCONNECT);
    }
    if(disconnect) throw disconnect;
  }
}
