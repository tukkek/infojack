import {Node} from './node.js';
import {Backdoor} from '../avatar/backdoor.js';
import {Control} from '../avatar/control.js';
import {rpg} from '../../rpg.js';

export class Interface extends Node{
  constructor(x,y,system){
    super(x,y,system)
    this.priority=1;
  }
  
  generate(){
    this.enter(new Control(this.system));
    if(rpg.chancein(3)) this.enter(new Backdoor(this.system));
  }
}
