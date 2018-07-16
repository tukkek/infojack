import {System,setactive} from '../modules/cyberspace/system';
import {Player} from '../modules/cyberspace/avatar/player';
import {console} from '../modules/cyberspace/console';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {sound} from '../modules/sound';
import {ShowView} from '../messages';
import environment from '../environment';
import {hero} from '../modules/character/character';
import {Disconnect,Refresh} from '../messages';
import {deck} from '../modules/deck';

var TILESIZE=2.5;
var SPACING=1.1;
var FADETIME=2000;
var MINIMUMWAIT=environment.debug?0:1000/2;

var current=false;
var lastclick=0;

@inject(EventAggregator)
export class Cyberspace{
  constructor(messaging){
    this.messaging=messaging;
    this.showconsole=false;
    current=this;
    let me=this;
    messaging.subscribe(ShowView,function(show){
      if(show.view=='Cyberspace') me.init();
    });
  }
  
  init(){
    //TODO clean previous run
    this.showconsole=true;
    this.map=document.querySelector('#cyberspace');
    this.console=document.querySelector('#console');
    this.system=
      new System(environment.systemlevel||hero.level);
    setactive(this.system);
    this.player=new Player(this.system);
    this.tiles=[];
    this.drawn=[];
    this.draw();
    deck.connect(this.system);
  }
  
  clicktile(tile){
    let now=new Date().getTime();
    if(lastclick+MINIMUMWAIT>now) return;
    lastclick=now;
    if(tile.tagName=='IMG') tile=tile.parentNode;
    let node=this.system.nodes[tile.nodeid];
    if(node==this.player.node){
      let avatar=node.getavatar(tile.nodex,tile.nodey);
      try{
        if(avatar&&avatar.scanned) avatar.click();
        else this.player.wait();
      }catch(e){
        if(!this.disconnect(e)) throw e;
        return;
      }
    }else if(this.player.enter(node)) 
      this.placenode(node,true);
    this.refresh();
  }

  placetile(x,y,node){
    let tile=document.createElement('div');
    this.tiles.push(tile);
    tile.classList.add('tile');
    tile.nodeid=node.id;
    tile.nodex=x;
    tile.nodey=y;
    let me=this;
    tile.onclick=function(){me.clicktile(this);};
    let style=tile.style;
    style.width=TILESIZE+'em';
    style.height=TILESIZE+'em';
    style.left=(node.x*SPACING*environment.nodesize+x)
      *TILESIZE+'em';
    style.top=(node.y*SPACING*environment.nodesize+y)
      *TILESIZE+'em';
    return tile;
  }

  placespacer(){
    let farx=0;
    let fary=0;
    for(let t of this.tiles){
      if(t.offsetLeft>farx) farx=t.offsetLeft;
      if(t.offsetTop>fary) fary=t.offsetTop;
    }
    let spacer=document.createElement('div');
    spacer.classList.add('spacer');
    spacer.style.top=(document.body.scrollTop+fary)+'px';
    spacer.style.left=(document.body.scrollLeft+farx)+'px';
    this.map.appendChild(spacer);
  }

  placenode(node,expand){
    if(this.drawn.indexOf(node)<0){
      this.drawn.push(node);
      for(let x=0;x<environment.nodesize;x++)
        for(let y=0;y<environment.nodesize;y++)
          this.map.appendChild(this.placetile(x,y,node));
    }
    if(expand) for(let n of node.getneighbors())
      this.placenode(n,false);
    let me=this;
    setTimeout(function(){me.placespacer();},500);
  }

  draw(){
    console.system=this.system;
    this.placenode(this.system.entrance,true);
    this.player.enter(this.system.entrance);
    //this.refresh();
    this.scroll();
  }
  
  scroll(){
    for(let t of this.tiles) 
      if(t.nodeid==this.player.node.id&&
        t.nodex==this.player.x&&t.nodey==this.player.y){
          setTimeout(function(){t.scrollIntoView();},250);
          return;
      }
  }

  addimage(tile,avatar){
    tile.avatar=avatar;
    tile.scanned=avatar.scanned;
    let image=document.createElement('img');
    image.src=avatar.image;
    image.title=avatar.tooltip;
    tile.appendChild(image);
    tile.image=image;
  }

  removeimage(tile){
    tile.avatar=null;
    tile.image.style.opacity=0;
    let fade=tile.image;
    tile.image=null;
    setTimeout(function(){tile.removeChild(fade);},FADETIME);
  }

  printmessages(){
    this.console.innerHTML='';
    for(let m=console.next();m;m=console.next()){
      let color=false;
      if(m.alert==0) color='white';
      else if(m.alert==1) color='yellow';
      else if(m.alert==2) color='red';
      else throw 'Unknown alert level';
      let div=document.createElement('div');
      div.style.color=color;
      div.appendChild(document.createTextNode(m.text));
      this.console.appendChild(div);
    }
    this.console.scrollTop=this.console.scrollHeight;
  }
  
  refreshtile(t){
    let node=this.system.nodes[t.nodeid];
    if(t.style.opacity==0) setTimeout(function(){
      t.classList.add('discovered');
    },1);
    if(!node.visited) return;
    if(!t.style.border) t.classList.add('visited');
    let avatar=node.getavatar(t.nodex,t.nodey);
    if(t.image&&(!avatar||
      avatar!=t.avatar||t.scanned!=avatar.scanned)) 
        this.removeimage(t);
    if(avatar&&avatar!=t.avatar) this.addimage(t,avatar);
    if(avatar&&this.player.target==t.avatar){
      t.classList.add('target');
    }else t.classList.remove('target');
  }
  
  disconnect(e){
    if(!(e instanceof Disconnect)) return;
    this.refresh(false);
    alert(e.message);
    this.showconsole=false;
    this.map.innerHTML='';
    this.console.innerHTML='';
    this.messaging.publish(new ShowView('CharacterScreen'));
    if(e.win) this.messaging.publish(new ShowView('Win'));
  }
  
  refresh(act=true){
    try{
      if(act) while(this.system.act()){ /* process NPCs */ }
    }catch(e){
      this.disconnect(e);
      return;
    }
    this.printmessages();
    if(this.system.revealed) for(let n of this.system.nodes) 
      this.placenode(n,false);
    for(let t of this.tiles) this.refreshtile(t);
    this.messaging.publish(new Refresh('ProgramBar'));
  }
}

export function refresh(){current.refresh();}
