import {Node} from './node';
import {Gateway} from '../avatar/gateway';

/*TODO 
 * - make it part of the normal generation to hop to other systems
 * - at first can even have it as "stairs down" */
export class Portal extends Node{
  constructor(x,y,system){
    super(x,y,system)
    this.priority=2;
  }
  
  generate(){
    this.enter(new Gateway(this.system));
  }
}
