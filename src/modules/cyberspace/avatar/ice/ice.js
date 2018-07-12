import {Avatar} from '../avatar';
import {console} from '../../console';
import {rpg} from '../../../rpg';
import {refresh} from '../../../../cyberspace/infojack-cyberspace';

/*TODO in theory each ICE should be a full character
 * but for now keep it simple */
export class Ice extends Avatar{
  constructor(image,system){
    super(image,system);
    let serial=rpg.r(0,9999)+'';
    while(serial.length<4) serial='0'+serial;
    this.setname(this.name+' '+serial);
  }
  
  click(){
    let p=this.system.player;
    if(p.target==this){
      p.target=false;
      console.print('Target cleared...');
    }else{
      p.target=this;
      console.print('Targeting '+this.name+'...');
    }
    refresh();
  }
  
  scan(){/*TODO*/}
  
  act(){throw 'Unimplemented Ice#act() for '+this.name;}
}
