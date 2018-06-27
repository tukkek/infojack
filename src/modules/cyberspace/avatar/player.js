import {Avatar} from './avatar.js';

export class Player extends Avatar{
  enter(node){
    if(!super.enter(node)) return false;
    node.visited=true;
    node.scan(); //TODO passive scan, roll-4
    return true;
  }
}
