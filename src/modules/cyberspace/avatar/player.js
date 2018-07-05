import {Avatar} from './avatar';
import {console} from '../console';

export class Player extends Avatar{
  constructor(hero,system){
    super('characters/'+hero.image+'.png',system);
    this.scanned=true;
    this.tooltip=hero.name;
    system.hero=this;
  }
  
  enter(node){
    if(!super.enter(node)) return false;
    node.visited=true;
    node.scan(); //TODO passive scan, roll-4
    return true;
  }
}
