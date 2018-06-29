import {Avatar} from './avatar';
import {rpg} from '../../rpg';

export class File extends Avatar{
  constructor(system){
    super('nodes/fileunscanned.png',system);
    this.tooltip='Data';
    this.level=system.level+rpg.randomize(4);
    this.worthless=this.level<1||rpg.chancein(system.level+1);
    this.trap=!this.worthless&&
      rpg.chancein(60/system.level);
    this.protected=!this.worthless&&!this.trap&&
      rpg.chancein(21/system.level);
    if(this.worthless) this.level=0;
    else if(this.protected&&this.level<system.level) 
      this.level=system.level;
  }
  
  click(){
    super.click();
  }
  
  scan(){
    if(this.worthless){
      this.node.remove(this);
    }else if(this.protected){
      this.setimage('nodes/fileprotected.png');
      this.tooltip='Protected data';
    }else if(this.trap){
      this.setimage('nodes/filetrap.png');
      this.tooltip='Trap data';
    }else{
      this.setimage('nodes/file.png');
    }
  }
}
