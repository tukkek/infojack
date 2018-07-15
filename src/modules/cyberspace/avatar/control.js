import {Avatar} from './avatar';
import {rpg} from '../../rpg';

var OUTCOMES=2;

export class Control extends Avatar{
  constructor(system){
    super(system);
    this.memory=rpg.chancein(OUTCOMES);
    this.privilege=rpg.chancein(OUTCOMES);
  }
  
  scan(){
    if(!this.memory&&!this.privilege) this.leave(this.node);
    this.setimage('nodes/control.png');
    this.setname('External device');
  }
}
