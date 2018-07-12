import {rpg} from '../../rpg';
import environment from '../../../environment';
import {console} from '../console';

var TILES=[];

for(let x=0;x<environment.nodesize;x++) 
  for(let y=0;y<environment.nodesize;y++)
    TILES.push([x,y]);

export class Node{
  constructor(x,y,system){
    this.x=x;
    this.y=y;
    this.id=system.nodes.length;
    this.priority=0;
    this.system=system;
    this.avatars=[];
    this.visited=false;
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
    let p=this.system.player;
    if(p==avatar) p.target=false;
    else if(p.target==avatar){
      p.target=false;
      console.print(avatar.name+' leaves the node...');
    }
  }
  
  /* return true if found free spot 
   * always prefer Avatar#enter(node) */
  enter(avatar){
    let source=avatar.node;
    if(source==this) return false;
    if(source&&source.getneighbors().indexOf(this)<0){
      console.print("Can only move into adjacent nodes...");
      return false;
    }
    rpg.shuffle(TILES);
    for(let xy of TILES) if(!this.getavatar(xy[0],xy[1])){
      if(avatar.node) avatar.node.remove(avatar);
      avatar.x=xy[0];
      avatar.y=xy[1];
      avatar.node=this;
      avatar.ap+=avatar.character.move();
      this.avatars.push(avatar);
      return true;
    }
    return false;
  }
  
  /* scan avatars randomly
   * return false if one fails or true if all done */
  scan(){ //TODO skill test
    let avatars=rpg.shuffle(this.avatars.slice());
    for(let a of avatars){
      if(!a) alert(JSON.stringify(avatars));
      if(!a.scanned){
        if(false) return false;
        a.scan();
        a.scanned=true;
      }
    }
    return true;
  }
}
