import {SecureAvatar} from './secure';
import {sound} from '../../../sound';
import {console} from '../../console';

export class Backdoor extends SecureAvatar{
  scan(){
    this.setimage('nodes/backdoor.bmp');
    this.setname('Backdoor');
  }
  
  activate(){
    //TODO if(!this.hack(true)) return false;
    sound.play(sound.SUCCESS);
    this.system.backdoor=this.node;
    this.system.business.backdoor=this.system;
    console.print('You succesfully exploit the backdoor!');
  }
  
  deactivate(){
    if(!confirm(
      'Are you sure you want to disable this backdoor?'))
        return;
    sound.play(sound.DISABLE);
    this.system.backdoor=false;
    this.system.business.backdoor=false;
    console.print('Backdoor cleared.');
  }
  
  click(){
    if(this.system.backdoor==this.node) this.deactivate();
    else this.activate();
  }
}
