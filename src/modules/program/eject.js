import {Program} from './program';
import {Disconnect} from '../../messages';

class Eject extends Program{
  constructor(name,grade,image,size,hack,buy,code){
    super('Eject',0,'eject.png',1,4,6,10);
  }
  
  describe(){return 'Disconnects from a system';}
  
  run(system){
    if(window.confirm('Are you sure you want to leave?'))
      system.disconnected=
        new Disconnect('Ejection successful.');
  }
}

export var eject=new Eject();
