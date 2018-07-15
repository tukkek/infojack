import {Avatar} from './avatar';
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
  
  click(){
    if(this.hack(true)){
      sound.play(sound.CRASH);
      let d=new Disconnect(true);
      d.message='You have crashed the mainframe!';
      throw d;
    }
  }
}
