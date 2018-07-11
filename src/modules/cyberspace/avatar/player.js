import {Avatar} from './avatar';
import {console} from '../console';
import {hero as offlinehero} from '../../character/character';

export class Player extends Avatar{
  constructor(system){
    super('characters/'+offlinehero.image+'.png',system);
    this.hero=offlinehero.connect();
    this.scanned=true;
    this.tooltip=this.hero.name;
    this.target=false; //ICE target
    system.player=this;
  }
  
  enter(node){
    if(!super.enter(node)) return false;
    node.visited=true;
    node.scan(); //TODO passive scan, roll-4
    return true;
  }
}
