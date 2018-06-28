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
    while(this.avatars.length==0){
      if(rpg.chancein(4)) this.enter(new Control(this.system));
      if(rpg.chancein(6)) this.enter(new Backdoor(this.system));
    }
  }
}
