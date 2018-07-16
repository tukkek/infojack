import {SecureAvatar} from './secure';
import {rpg} from '../../../rpg';
import {console} from '../../console';
import {sound} from '../../../sound';
import {Disconnect} from '../../../../messages';
import {setactive as setactivesystem} from '../../system';

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
    this.system.raisealert(+2,true);
    setactivesystem(false); //TODO used for alpha progression
    let d=new Disconnect('You have crashed the mainframe!');
    d.win=true;
    d.safe=true;
    throw d;
  }
}
