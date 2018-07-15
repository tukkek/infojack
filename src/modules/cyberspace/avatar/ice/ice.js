import {Avatar} from '../avatar';
import {console} from '../../console';
import {rpg} from '../../../rpg';
import {sound} from '../../../sound';
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
  
  //returns true on attempt, hit or not
  attack(bonus,target,damage,roll=false){
    if(this.system.alert!=2||target.node!=this.node)
      return false;
    this.ap+=.5;
    sound.play(sound.ICEATTACK);
    console.print(this.name+' attacks!');
    super.attack(bonus,target,damage)
    return true;
  }
  
  getdamage(){
    let level=Math.min(20,this.character.level);
    for(let die of [4,6,8,10,12,20]) if(level<=die)
      return rpg.r(1,die);
    throw 'Unknown damage level';
  }
  
  die(){
    super.die();
    this.system.reentry.push(this);
  }
}
