import {System} from './modules/cyberspace/system';
import {Player} from './modules/cyberspace/avatar/player';
import {console} from './modules/cyberspace/console';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Sound} from './modules/sound';
import {ShowView} from './messages';
import environment from './environment';
import {hero} from './modules/character/character';

var TILESIZE=2.5;
var SPACING=1.1;
var FADETIME=2000;

@inject(Sound,EventAggregator)
export class Cyberspace{
  constructor(sound,messaging){
    this.showconsole=false;
    let me=this;
    messaging.subscribe(ShowView,function(show){
        if(show.view=='Cyberspace') me.init();
    });
  }
  
  init(){
    //TODO clean previous run
    this.map=document.querySelector('#cyberspace');
    this.map.innerHTML='';
    this.showconsole=true;
    this.console=document.querySelector('#console');
    this.console.innerHTML='';
    this.system=
      new System(environment.systemlevel||hero.level);
    this.player=
      new Player('characters/tile000.png',this.system);
    this.tiles=[];
    this.drawn=[];
    this.draw();
  }

  clicktile(tile){
    if(tile.tagName=='IMG') tile=tile.parentNode;
    let node=this.system.nodes[tile.nodeid];
    let avatar=node==this.player.node&&
      node.getavatar(tile.nodex,tile.nodey);
    if(avatar){
      avatar.click();
    }else{
      this.player.enter(node);
      this.placenode(node,true);
    }
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
      let bounds=t.getBoundingClientRect();
      if(bounds.right>farx) farx=bounds.right;
      if(bounds.bottom>fary) fary=bounds.bottom;
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
    this.placespacer();
  }

  draw(){
    console.system=this.system;
    console.print('You enter the system...');
    this.placenode(this.system.entrance,true);
    this.player.enter(this.system.entrance);
    this.refresh();
    for(let t of this.tiles){
      if(t.nodeid==this.player.node.id&&
        t.nodex==this.player.x&&t.nodey==this.player.y){
        t.scrollIntoView();
        break;
      }
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
    for(let m=console.pop();m;m=console.pop()){
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
  
  refresh(){
    this.printmessages();
    if(this.system.revealed) for(let n of this.system.nodes) 
      this.placenode(n,false);
    for(let t of this.tiles){
      let node=this.system.nodes[t.nodeid];
      if(t.style.opacity==0) setTimeout(function(){
        t.classList.add('discovered');
      },1);
      if(!node.visited) continue;
      if(!t.style.border) t.classList.add('visited');
      let avatar=node.getavatar(t.nodex,t.nodey);
      if(t.image&&(!avatar||
        avatar!=t.avatar||t.scanned!=avatar.scanned)) 
          this.removeimage(t);
      if(avatar&&avatar!=t.avatar) this.addimage(t,avatar);
    }
  }
}
