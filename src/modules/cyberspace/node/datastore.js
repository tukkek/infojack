import {Node} from './node.js';
import {File} from '../avatar/file.js';
import {rpg} from '../../rpg.js';

export class Datastore extends Node{
  constructor(x,y,system){
    super(x,y,system)
    this.priority=1;
  }
  
  generate(){
    let files=rpg.r(1,4);
    for(let i=0;i<files;i++){
      this.enter(new File(this.system));
    }
  }
}
