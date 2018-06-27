import {Node} from './node.js';
import {rpg} from '../../rpg.js';

class Datastore extends Node{
  generate(){
    let files=RPG.r(1,4);
    for(let i=0;i<files;i++){
      this.enter(new Avatar('nodes/file.bmp',this.system));
    }
  }
}
