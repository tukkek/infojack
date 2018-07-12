import {Avatar} from './avatar';
import {console} from '../console';
import {hero} from '../../character/character';

export class Player extends Avatar{
  constructor(system){
    super('characters/'+hero.image+'.png',system);
    this.scanned=true;
    this.tooltip=hero.name;
    this.target=false; //ICE target
    system.player=this;
  }
  
  create(characterclass,level){
    this.character=hero.connect();
  }
  
  enter(node){
    if(!super.enter(node)) return false;
    node.visited=true;
    node.scan(); //TODO passive scan, roll-4
    return true;
  }
  
  act(){throw "Players don't act programatically!";}
}
