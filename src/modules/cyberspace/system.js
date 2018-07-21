import {rpg} from '../rpg';
import {Node} from './node/node';
import {Datastore} from './node/datastore';
import {Cpu} from './node/cpu';
import {Portal} from './node/portal';
import {Interface} from './node/interface';
import environment from '../../environment';
import {Ice} from './avatar/ice/ice';
import {Scout} from './avatar/ice/scout';
import {Greeter} from './avatar/ice/greeter';
import {Bouncer} from './avatar/ice/bouncer';
import {console} from './console';
import {sound} from '../sound';
import {deck} from '../deck';
import {Player} from './avatar/player';
import {hero as offlinehero} from '../character/character';
import {name} from '../world/names';

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
    this.backdoor=false;
    this.disconnected=false; //throw this if set
    this.name=name(level); //TODO this is to be taken from a business, not generated here
    this.generatemap();
    this.definenodes();
    for(let n of this.nodes) n.generate();
    this.generateice();
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
    this.nodes.push(new Cpu(0,0,this,true));
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
    let entrancei=-1;
    for(let neighbors=1;entrancei==-1;neighbors++){
      entrancei=this.findentrance(neighbors);
    }
    this.entrance=new Portal(-1,-1,this,true);
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
  
  raisealert(raise=+1,silent=false){
    let previous=this.alert;
    this.alert+=raise;
    if(this.alert>2) this.alert=2;
    else if(this.alert<0) this.alert=0;
    if(this.alert==2) this.player.credentials=-20;
    if(silent||this.alert==previous) return;
    let cancelling=this.alert<previous;
    if(cancelling) sound.play(sound.ALERTCANCEL);
    if(this.alert==0)
      console.print('The alert is cleared.');
    else if(this.alert==1){
      console.print('The system is now in yellow alert...');
      if(!cancelling) sound.play(sound.ALERTYELLOW);
    }else{
      console.print('The system is now in red alert!');
      if(!cancelling) sound.play(sound.ALERTRED);
    }
  }
  
  generateice(){
    let types=[Scout,Greeter,Bouncer];
    let budget=this.level*4;//TODO
    let passes=Math.min(this.level,4);
    for(let pass=0;pass<passes;pass++){
      let level=this.level;
      let quantity=1;
      let doublings=rpg.r(1,4);
      for(let i=1;i<doublings&&level>=3;i++){
        level-=2;
        quantity*=2;
      }
      let type=rpg.choose(types);
      for(let i=0;i<quantity;i++){
        this.ice.push(new type(this,level));
      }
    }
  }
  
  //guarantees same ice placement for non-random deployment
  deployice(){
    let random=[];
    for(let i of this.ice){
      let nodes=this.nodes.slice();
      nodes.sort((a,b)=>{
        let na=a.avatars.filter(x=>x instanceof Ice).length;
        let nb=b.avatars.filter(x=>x instanceof Ice).length;
        return (b.priority-nb)-(a.priority-na);
      });
      for(let n of nodes) if(i.deploy(n)){
        i.enter(n);
        break;
      }
      if(!i.node) random.push(i);
    }
    for(let ice of random)
      ice.enter(rpg.choose(this.nodes));
  }
  
  act(){ //return false when it's the player's turn
    if(this.disconnected) throw this.disconnected;
    let next=this.player;
    for(let n of this.nodes) for(let a of n.avatars)
      if(a.ap<next.ap) next=a;
    next.act();
    return next!=this.player;
  }
  
  connect(){
    active=this;
    this.player=new Player(this); //set by Player
    deck.connect(this);
    this.raisealert(-1,true); //TODO once per day, not immediate
    console.system=this;
    this.player.connect();
    this.player.enter(this.backdoor||this.entrance);
    if(!environment.noice) this.deployice();
    this.debug();
  }
  
  disconnect(e){
    console.system=false;
    this.disconnected=false;
    this.revealed=false;
    this.player.disconnect(e)
    for(let ice of this.reentry) this.ice.push(ice);
    this.reentry=[];
    for(let n of this.nodes) n.reset();
    deck.disconnect();
    if(rpg.chancein(30-this.level)) this.backdoor=false;
  }
}

export function getactive(){return active;}
export function setactive(s){active=s;}

export function connect(){
  if(!active){
    let level=environment.systemlevel||offlinehero.level;
    active=new System(level);
  }
  active.connect();
  return active;
}
