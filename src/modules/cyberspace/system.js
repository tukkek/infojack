import {rpg} from '../rpg';
import {Node} from './node/node';
import {Datastore} from './node/datastore';
import {Cpu} from './node/cpu';
import {Portal} from './node/portal';
import {Interface} from './node/interface';
import environment from '../../environment';
import {Scout} from './avatar/ice/scout';
import {console} from './console';
import {sound} from '../sound';
import {deck} from '../deck';
import {Player} from './avatar/player';

var active=false;

export class System{
  constructor(level){
    this.revealed=false; //reveal all map
    this.level=level;
    if(this.level<1) this.level=1;
    else if(this.level>20) this.level=20;
    this.alert=0;
    this.nodes=[];
    this.ice=[];
    this.reentry=[];
    this.entrance=null;
    this.generatemap();
    this.definenodes();
    for(let n of this.nodes) n.generate();
    this.generateice();
    this.player=new Player(this); //set by Player
    this.debug();
  }
  
  debug(){
    if(environment.revealmap) this.reveal();
    if(environment.scannodes) for(let n of this.nodes)
      for(let a of n.avatars.slice()){
        a.scan();
        a.scanned=true;
      }
  }
  
  getnode(x,y){
    for(let n of this.nodes) if(x==n.x&&y==n.y) return n;
    return null;
  }
  
  generatemap(){
    this.nodes.push(new Cpu(0,0,this));
    let size=rpg.r(3,7)+this.level;
    let leastx=0;
    let leasty=0;
    while(this.nodes.length<size){
      let n=rpg.choose(this.nodes);
      if(rpg.chancein(5-n.getneighbors().length)) continue;
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
  
  generatenode(){
    if(rpg.chancein(10)) return new Cpu(-1,-1,this);
    if(rpg.chancein(3)) return new Interface(-1,-1,this);
    return new Datastore(-1,-1,this);
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
      let corridor=neighbors>2&&rpg.chancein(5-neighbors);
      if(corridor) continue;
      this.replacenode(this.generatenode(),i);
    }
  }
  
  reveal(){
    this.revealed=true;
    for(let n of this.nodes) n.visited=true;
  }
  
  raisealert(raise=+1){
    let previous=this.alert;
    this.alert+=raise;
    if(this.alert>2) this.alert=2;
    else if (this.alert<0) this.alert=0;
    if(this.alert==previous) return;
    if(this.alert==0)
      console.print('The alert is cleared.');
    else if(this.alert==1){
      console.print('The system is now in yellow alert...');
      if(this.alert>previous) sound.play(sound.ALERTYELLOW);
    }else{
      console.print('The system is now in red alert!');
      this.player.credentials=-1;
      if(this.alert>previous) sound.play(sound.ALERTRED);
    }
    if(this.alert<previous) sound.play(sound.ALERTCANCEL);
  }
  
  generateice(){
    if(environment.noice) return;
    let s=new Scout(this);
    this.ice.push(s);
    s.enter(this.nodes[0]);
  }
  
  act(){ //return false when it's the player's turn
    let next=this.player;
    for(let n of this.nodes) for(let a of n.avatars)
      if(a.ap<next.ap) next=a;
    if(next==this.player) return false;
    next.act();
    return true;
  }
  
  setactive(){active=this;}
}

export function getactive(){return active;}
