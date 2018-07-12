import {Avatar} from './avatar';
import {console} from '../console';
import {hero} from '../../character/character';

export class Player extends Avatar{
  constructor(system){
    super(system);
    this.setname(hero.name);
    this.setimage('characters/'+hero.image+'.png');
    this.scanned=true;
    this.target=false; //current target (ICE)
    system.player=this;
  }
  
  create(characterclass,level){
    this.character=hero.connect();
  }
  
  enter(node){
    if(!super.enter(node)) return false;
    node.visited=true;
    node.scan(); //TODO passive scan using perception, roll-4
    return true;
  }
  
  act(){throw "Players don't act programatically!";}
}
