import {Avatar} from './avatar';
import {rpg} from '../../rpg';
import envinronment from '../../../environment';

export class Entry extends Avatar{
  scan(){
    this.setimage('nodes/entry.png');
    this.tooltip='ICE entry';
  }
  
  click(){
    super.click();
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
