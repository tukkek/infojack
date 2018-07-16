import {rpg} from '../../rpg';
import environment from '../../../environment';
import {console} from '../console';
import {sound} from '../../sound';
import {Ice} from '../avatar/ice/ice';

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
    this.hidden=[];
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
  
  remove(avatar){//TODO should be called leave
    if(avatar.node!=this)
      throw 'Removing '+avatar.name+' from random node?';
    let p=this.system.player;
    if(avatar instanceof Ice&&this==p.node&&
      avatar.character.hp>0){
        sound.play(sound.ICELEAVE);
        console.print(avatar.name+' leaves the node...');
    }
    avatar.node=false;
    this.avatars.splice(this.avatars.indexOf(avatar),1);
    if(p==avatar) p.target=false;
    else if(p.target==avatar) p.target=false;
  }
  
  checkadjacent(source,avatar){
    if(environment.debug&&avatar==this.system.player)
      return true;
    return source.getneighbors().indexOf(this)>=0;
  }
  
  receive(avatar,xy){
    if(this.system.player&&this==this.system.player.node){
      sound.play(sound.ICEENTER);
      console.print(avatar.name+' enters the node.');
    }
    if(avatar.node) avatar.leave(avatar.node);
    avatar.x=xy[0];
    avatar.y=xy[1];
    avatar.node=this;
    avatar.ap+=avatar.character.move();
    this.avatars.push(avatar);
  }
  
  /* return true if found free spot 
   * always prefer Avatar#enter(node) */
  enter(avatar){
    let source=avatar.node;
    if(source==this) return false;
    if(source&&!this.checkadjacent(source,avatar)){
      console.print("Can only enter adjacent nodes...");
      return false;
    }
    rpg.shuffle(TILES);
    for(let xy of TILES) if(!this.getavatar(xy[0],xy[1])){
      this.receive(avatar,xy);
      return true;
    }
    return false;
  }
  
  scan(roll){
    for(let a of this.avatars.slice())
      if(!a.scanned&&roll>=a.scandc){
        a.scan();
        a.scanned=true;
      }
  }
  
  reset(){
    for(let a of this.hidden) a.enter(this);
    this.hidden=[];
    for(let a of this.avatars.slice()) a.reset();
  }
}
