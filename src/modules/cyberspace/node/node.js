import {rpg} from '../../rpg.js';

var SIZE=4;
var TILES=[];

for(let x=0;x<SIZE;x++) for(let y=0;y<SIZE;y++)
  TILES.push([x,y]);

export class Node{
  constructor(x,y,system){
    this.x=x;
    this.y=y;
    this.id=system.nodes.length;
    this.size=SIZE;
    this.system=system;
    this.avatars=[];
    this.visited=false;
    this.generate();
  }
  
  generate(){
    // override
  }
  
  getneighbors(){
    let neighbors=[];
    for(let xy of [[-1,0],[+1,0],[0,+1],[0,-1]]){
      let n=this.system.getnode(this.x+xy[0],this.y+xy[1]);
      if(n) neighbors.push(n);
    }
    return neighbors;
  }
  
  getavatar(x,y){
    for(let a of this.avatars) if(a.x==x&&a.y==y) return a;
    return null;
  }
  
  remove(avatar){
    this.avatars.splice(this.avatars.indexOf(avatar),1);
  }
  
  /* return true if found free spot */
  enter(avatar){
    if(avatar.node==this) return true;
    rpg.shuffle(TILES);
    for(let xy of TILES) if(!this.getavatar(xy[0],xy[1])){
      if(avatar.node) avatar.node.remove(avatar);
      avatar.x=xy[0];
      avatar.y=xy[1];
      avatar.node=this;
      this.avatars.push(avatar);
      return true;
    }
    return false;
  }
}
