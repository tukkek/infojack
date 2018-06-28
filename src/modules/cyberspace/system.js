import {Node} from './node/node.js';
import {Datastore} from './node/datastore.js';
import {Cpu} from './node/cpu.js';
import {Portal} from './node/portal.js';
import {rpg} from '../rpg.js';

export class System{
  constructor(level){
    this.level=level;
    if(this.level<1) this.level=1;
    else if(this.level>20) this.level=20;
    this.nodes=[];
    this.ice=[];
    this.entrance=null;
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
  
  replacenode(target,i){
    let original=this.nodes[i];
    target.id=original.id;
    target.x=original.x;
    target.y=original.y;
    this.nodes[i]=target;
  }
  
  findentrance(neighbors){
    let portals=this.nodes.filter(
      n=>n.id!=0&&n.getneighbors().length==neighbors); 
    if(portals.length==0) return -1;
    return this.nodes.indexOf(rpg.choose(portals));
  }
  
  definenodes(){
    this.nodes[0].setmain();
    let entrancei=-1;
    for(let neighbors=1;entrancei==-1;neighbors++){
      entrancei=this.findentrance(neighbors);
    }
    this.entrance=new Portal(-1,-1,this);
    this.replacenode(this.entrance,entrancei);
    for(let i=1;i<this.nodes.length;i++){
      if(i==entrancei) continue;
      let neighbors=this.nodes[i].getneighbors().length;
      let corridor=neighbors>1&&rpg.chancein(6-neighbors);
      if(corridor) continue;
      this.replacenode(new Datastore(-1,-1,this),i);
    }
  }
}
