import {Avatar} from '../avatar';
import {console} from '../../console';
import {rpg} from '../../../rpg';
import {refresh} from '../../../../cyberspace/infojack-cyberspace';

export class Ice extends Avatar{
  constructor(image,system){
    super(system);
    this.revealed=image;
    if(this.character.ranks>0||this.character.pointextra>0||
      this.character.newfeats>0) 
        console.log('Unspent points for '+this.name);
  }
  
  click(){
    if(!this.scanned) return;
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
  
  scan(){
    let serial=Number(rpg.r(0,9999)).toString();
    while(serial.length<4) serial='0'+serial;
    this.setname(this.constructor.name+' '+serial);
    this.setimage(this.revealed);
  }
  
  act(){throw 'Unimplemented Ice#act() for '+this.name;}
}
