import {Avatar} from './avatar';
import {rpg} from '../../rpg';

var OUTCOMES=2;

export class Control extends Avatar{
  constructor(system){
    super('nodes/core.png',system);
    this.tooltip='Process';
    this.memory=rpg.chancein(OUTCOMES);
    this.privilege=rpg.chancein(OUTCOMES);
  }
  
  scan(){
    if(!this.memory&&!this.privilege) this.node.remove(this);
    this.setimage('nodes/control.png');
    this.tooltip='Control';
  }
}
