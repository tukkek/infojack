import {rpg} from '../../rpg';
import {console} from '../console';

export class Avatar{
  constructor(image,system){
    this.setimage(image);
    this.system=system;
    this.node=null;
    this.x=-1;
    this.y=-1;
    this.scanned=false;
    this.scandc=this.system+rpg.randomize(10);
    if(this.scandc<1) this.scandc=1;
    this.setname(this.constructor.name);
  }
  
  setname(name){
    this.name=name;
    this.tooltip=name;
  }
  
  setimage(image){this.image='./images/'+image;}
  
  enter(node){
    let source=this.node;
    if(node==source) return false;
    if(source&&source.getneighbors().indexOf(node)<0){
      console.print("Can only access adjacent nodes...");
      return false;
    }
    return node.enter(this);
  }
  
  click(){alert('Unimplemented.');}
  
  scan(){return true;}
}
