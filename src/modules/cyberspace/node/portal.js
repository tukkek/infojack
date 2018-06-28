import {Node} from './node.js';
import {Gateway} from '../avatar/gateway.js';

export class Portal extends Node{
  constructor(x,y,system){
    super(x,y,system)
    this.priority=2;
  }
  
  generate(){
    this.enter(new Gateway(this.system));
  }
}
