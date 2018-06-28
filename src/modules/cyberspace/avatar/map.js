import {Avatar} from './avatar.js';

export class Map extends Avatar{
  constructor(system){
    super('nodes/map.bmp',system);
  }
  
  click(){
    this.system.reveal=true;
    for(let n of this.system.nodes) n.visited=true;
    this.node.remove(this);
  }
}
