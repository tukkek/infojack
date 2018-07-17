import {Avatar} from '../avatar';
import {console} from '../../console';
import {rpg} from '../../../rpg';
import {sound} from '../../../sound';

export class Ice extends Avatar{
  constructor(image,system,level){
    super(system,level);
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
  }
  
  scan(){
    this.setname(this.constructor.name+' '+this.getserial());
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
  
  getdamage(){return rpg.r(1,this.getscale());}
  
  die(){
    super.die();
    sound.play(sound.ICEDEATH);
    this.system.reentry.push(this);
  }
  
  reset(){
    super.reset();
    this.leave(this.node);
  }
  
  show(){ //TODO with this can make stealh 'hunter' ice
    if(this.system.revealed) return true;
    let p=this.system.player;
    if(this.node!=p.node) return false;
    if(this.scanned) return true;
    let spot=p.roll(p.character.getperceive(),10);
    let hide=10+this.character.getstealth();
    return spot>=hide;
  }
}
