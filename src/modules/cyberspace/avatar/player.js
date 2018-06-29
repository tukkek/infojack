import {Avatar} from './avatar';

export class Player extends Avatar{
  constructor(image,system){
    super(image,system);
    this.scanned=true;
  }
  
  enter(node){
    if(!super.enter(node)) return false;
    node.visited=true;
    node.scan(); //TODO passive scan, roll-4
    return true;
  }
}
