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
    if(this.system!=this.system.business.mainframe){
      //TODO since the main point of terminals right now is to crash the system and the game's objective is to get to the last level to do so, there's no purpose for terminals at previous depths
      this.hide();
      return;
    }
    this.setimage('nodes/terminal.png');
    this.setname('Terminal');
  }

  click(){
    if(!super.click()) return false;
    this.system.business.crash(this.system);
    sound.play(sound.CRASH);
    this.system.raisealert(+2,true);
    let d=new Disconnect('You have crashed the mainframe!');
    d.win=true;
    d.safe=true;
    throw d;
  }
}
