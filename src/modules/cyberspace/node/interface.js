import {Node} from './node';
import {Backdoor} from '../avatar/backdoor';
import {Control} from '../avatar/control';
import {rpg} from '../../rpg';

export class Interface extends Node{
  constructor(x,y,system){
    super(x,y,system,'interface');
    this.priority=1;
  }
  
  generate(){
    this.enter(new Control(this.system));
    if(rpg.chancein(4))
      this.enter(new Backdoor(this.system));
  }
}
