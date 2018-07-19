import {SecureAvatar} from './secure';
import {sound} from '../../../sound';
import {console} from '../../console';

//TODO
export class Backdoor extends SecureAvatar{
  scan(){
    this.setimage('nodes/backdoor.bmp');
    this.setname('Backdoor');
  }
  
  activate(){
    if(!this.hack(true)) return false;
    sound.play(sound.SUCCESS);
    console.print('You succesfully exploit the backdoor!');
    this.system.backdoor=this.node;
  }
  
  deactivate(){
    if(!confirm(
      'Are you sure you want to disable this backdoor?'))
        return;
    this.system.backdoor=false;
    sound.play(sound.DISABLE);
    console.print('Backdoor cleared.');
  }
  
  click(){
    if(this.system.backdoor) this.deactivate();
    else this.activate();
  }
}
