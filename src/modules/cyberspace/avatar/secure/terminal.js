import {SecureAvatar} from './secure';
import {rpg} from '../../../rpg';
import {console} from '../../console';
import {sound} from '../../../sound';
import {Disconnect} from '../../../../messages';

export class Terminal extends SecureAvatar{
  create(characterclass,occupation,level){
    super.create(characterclass,occupation,level+rpg.r(1,4));
    this.character.defence+=this.character.level;
  }
  
  scan(){
    this.setimage('nodes/terminal.png');
    this.setname('Terminal');
  }
  
  click(){
    if(!super.click()) return false;
    sound.play(sound.CRASH);
    let d=new Disconnect(true);
    d.message='You have crashed the mainframe!';
    throw d;
  }
}
