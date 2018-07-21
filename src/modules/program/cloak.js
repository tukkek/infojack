import {Program} from './program';
import {console} from '../cyberspace/console';
import {events} from '../cyberspace/avatar/player';
import {sign} from '../character/character';

class Cloak extends Program{
  constructor(){
    super('Cloak',false,'cloak.png',3,6,13,25);
    this.apcost=1;
  }
  
  apply(modifier,player){
    let c=player.character;
    c.stealth+=modifier;
    console.print('Your stealth is now: '+
      sign(c.getstealth())+'.');
  }
  
  load(system){
    if(!super.load(system)) return false;
    this.apply(+5,system.player);
    return true;
  }
  
  unload(system){
    if(!super.unload(system)) return false;
    this.apply(-5,system.player);
    return true;
  }
  
  describe(){
    return 'Stealth +5 (unloads on attack or file open)';
  }
  
  onevent(e,system){
    if(e==events.ATTACK||e==events.OPENFILE){
      this.unload(system);
    }
  }
}

new Cloak();
