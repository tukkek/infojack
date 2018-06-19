import {Node} from './node/node.js';
import {rpg} from './rpg.js';

export class System{
  constructor(level){
    this.level=level;
    this.nodes=[];
    this.ice=[];
    this.generate();
  }
  
  generate(){
    let root=new Node(this);
    let size=rpg.r(3,7)+this.level;
    while(this.nodes.length<size){
      let n=rpg.choose(this.nodes);
      let next=rpg.r(1,4);
      if(next==1&&!n.top) n.top=new Node(this);
      else if(next==2&&!n.right) n.right=new Node(this);
      else if(next==3&&!n.bottom) n.bottom=new Node(this);
      else if(next==4&&!n.left) n.left=new Node(this);
    }
  }
}
