import {Node} from './node/node.js';
import {rpg} from './rpg.js';

export class System{
  constructor(level){
    this.level=level;
    this.nodes=[];
    this.ice=[];
    this.generate();
  }
  
  getnode(x,y){
    for(let n of this.nodes) if(x==n.x&&y==n.y) return n;
    return null;
  }
  
  generate(){
    this.nodes.push(new Node(0,0,this));
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
    for(let n of this.nodes){ //ensure x>=0 y>=0
      n.x-=leastx;
      n.y-=leasty;
    }
  }
}
