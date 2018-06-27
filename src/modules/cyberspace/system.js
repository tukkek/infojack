import {Node} from './node/node.js';
import {Datastore} from './node/datastore.js';
import {Cpu} from './node/cpu.js';
import {rpg} from '../rpg.js';

export class System{
  constructor(level){
    this.level=level;
    if(this.level<1) this.level=1;
    else if(this.level>20) this.level=20;
    this.nodes=[];
    this.ice=[];
    this.generatemap();
    this.definenodes();
    for(let n of this.nodes) n.generate();
  }
  
  getnode(x,y){
    for(let n of this.nodes) if(x==n.x&&y==n.y) return n;
    return null;
  }
  
  normalize(){
  }
  
  generatemap(){
    this.nodes.push(new Cpu(0,0,this));
    let size=rpg.r(3,7)+this.level;
    let leastx=0;
    let leasty=0;
    while(this.nodes.length<size){
      let n=rpg.choose(this.nodes);
      let x=n.x;
      let y=n.y;
      if(rpg.chancein(2)) x+=rpg.chancein(2)?+1:-1;
      else y+=rpg.chancein(2)?+1:-1;
      if(this.getnode(x,y)) continue;
      this.nodes.push(new Node(x,y,this));
      if(x<leastx) leastx=x;
      if(y<leasty) leasty=y;
    }
    for(let n of this.nodes){ //ensure node.x>=0 node.y>=0
      n.x-=leastx;
      n.y-=leasty;
    }
  }
  
  definenodes(){
    this.nodes[0].setmain();
    for(let i=1;i<this.nodes.length;i++){
      let n=this.nodes[i];
      let neighbors=n.getneighbors().length;
      let corridor=neighbors>1&&rpg.chancein(6-neighbors);
      if(corridor) continue;
      let type=new Datastore(n.x,n.y,this);
      type.id=n.id;
      this.nodes[i]=type;
    }
  }
}
