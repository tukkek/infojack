import {SecureAvatar} from './secure';
import {console} from '../../console';
import {Disconnect} from '../../../../messages';

export const INITIAL=11;

export class Shutdown extends SecureAvatar{
  scan(){
    this.setname('Automatic shutdown');
    this.setimage('nodes/shutdown.png');
  }
  
  click(){
    if(!super.click()) return false;
    if(this.system.shutdown!=INITIAL){
      this.system.shutdown=INITIAL;
      console.print('You reset the current countdown!');
    }
    this.hide();
    console.print('Automatic shutdown node disabled.');
  }
  
  act(){
    let s=this.system;
    if(s.alert!=2){
      super.act();
      return;
    }
    this.ap+=.5;
    s.shutdown-=1;
    if(s.shutdown>0){
      console.print(
        'Automatic shutdown in '+s.shutdown+'...');
    }else if(s.shutdown==0){
      console.print('Going for full system halt NOW!');
    }else{
      s.disconnected=new Disconnect(
        'System went for emergency shutdown.');
    }
  }
}
