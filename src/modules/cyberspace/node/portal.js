import {Node} from './node';
import {Gateway} from '../avatar/gateway';

/*TODO 
 * - make it part of the normal generation to hop to other systems
 * - at first can even have it as "stairs down" */
export class Portal extends Node{
  constructor(x,y,system,destination=false){
    super(x,y,system,'portal');
    this.destination=destination;
    this.priority=destination?2:3;//prioritize entrance
  }
  
  generate(){
    new Gateway(this.system,this.destination).enter(this);
  }
}
