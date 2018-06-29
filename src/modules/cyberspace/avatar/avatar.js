import {System} from '../system';
import {rpg} from '../../rpg';

export class Avatar{
  constructor(image,system){
    this.setimage(image);
    if(!(system instanceof System))
      throw 'system type: '+system.constructor.name;
    this.system=system;
    this.node=null;
    this.x=-1;
    this.y=-1;
    this.tooltip=this.constructor.name;
    this.scanned=false;
    this.scandc=this.system+rpg.randomize(10);
    if(this.scandc<1) this.scandc=1;
  }
  
  setimage(image){
    this.image='./images/'+image;
  }
  
  enter(node){
    return node.enter(this);
  }
  
  click(){
    alert('clicky!');
  }
  
  scan(){
    return true;
  }
}
