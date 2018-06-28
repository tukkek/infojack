import {Node} from './node.js';
import {Gateway} from '../avatar/gateway.js';

//TODO make it part of the normal generation to hop to other systems
//TODO at first can even have it as "stairs down"
export class Portal extends Node{
  constructor(x,y,system){
    super(x,y,system)
    this.priority=2;
  }
  
  generate(){
    this.enter(new Gateway(this.system));
  }
}
