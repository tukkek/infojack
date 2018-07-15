import {Avatar} from './avatar';
import {rpg} from '../../rpg';
import envinronment from '../../../environment';
import {sound} from '../../sound';
import {console} from '../console';

export class Entry extends Avatar{
  create(characterclass,occupation,level){
    super.create(characterclass,occupation,level);
    let c=this.character;
    for(let s of ['bluff','perceive']) c.learnskill(s);
  }
  
  scan(){
    this.setimage('nodes/entry.png');
    this.setname('ICE entry');
  }
  
  click(){
    if(this.hack(true)){
      console.print('You disable the ICE re-entry point!');
      sound.play(sound.DISABLE);
      this.leave(this.node);
    }
  }
  
  act(){
    this.ap+=1;
    if(this.system.reentry.length==0) return;
    let ice=this.system.reentry[0];
    if(rpg.r(1,20)+this.system.level<10+ice.character.level)
      return;
    if(!ice.enter(this.node)) return;
    ice=this.system.reentry.shift();
    ice.character.hp=ice.character.maxhp;
    ice.ap=this.ap-ice.rollinitiative();
    ice.obfuscate();
    if(envinronment.scannodes){
      ice.scan();
      ice.scanned=true;
    }
  }
}
