import {Avatar} from './avatar';
import {CRITICALMISS} from './player';
import {rpg} from '../../rpg';
import {console} from '../console';
import {sound} from '../../sound';
import {Disconnect} from '../../../messages';

export class Terminal extends Avatar{
  create(characterclass,occupation,level){
    super.create(characterclass,occupation,level+rpg.r(1,4));
    let c=this.character;
    c.defence+=this.character.level;
    for(let s of ['bluff','perceive']) c.learnskill(s);
  }
  
  scan(){
    this.setimage('nodes/terminal.png');
    this.setname('Terminal');
  }
  
  authenticate(hackingroll){
    let p=this.system.player;
    let querydc=10+this.character.getbluff();
    if(hackingroll==CRITICALMISS||
      (!p.hide(this)&&!p.query(querydc,this))){
        this.system.raisealert(+1);
        return false;
    }
    return true;
  }
  
  click(){
    let p=this.system.player;
    let c=p.character;
    let hacking=p.roll(c.gethacking());
    let hackingdc=this.character.getdefence();
    if(!this.authenticate(hacking)||  
      hacking<hackingdc){
        let name=this.name.toLowerCase();
        console.print(
          'You fail to hack into '+name+'...');
        return;
    }
    sound.play(sound.CRASH);
    throw new Disconnect(true);
  }
}
