import {System} from './src/modules/cyberspace/system.js';
import {Player} from './src/modules/cyberspace/avatar/player.js';
      
var TILESIZE=2.5;
var SPACING=1.1;
var FADETIME=2000;

var map=false;
var system=new System(1);
var player=new Player('characters/tile000.png',system);
var tiles=[];
var drawn=[];

function clicktile(e){
  let tile=e.target;
  if(tile.tagName=='IMG') tile=tile.parentNode;
  let node=system.nodes[tile.nodeid];
  let avatar=node==player.node&&
    node.getavatar(tile.nodex,tile.nodey);
  if(avatar){
    avatar.click();
  }else{
    player.enter(node);
    placenode(node,true);
  }
  refresh();
}

function placetile(x,y,node){
  let tile=document.createElement('div');
  tiles.push(tile);
  tile.classList.add('tile');
  tile.nodeid=node.id;
  tile.nodex=x;
  tile.nodey=y;
  tile.onclick=clicktile;
  let style=tile.style;
  style.width=TILESIZE+'em';
  style.height=TILESIZE+'em';
  style.left=(((node.x*SPACING)*node.size+x)*TILESIZE)+'em';
  style.top=(((node.y*SPACING)*node.size+y)*TILESIZE)+'em';
  return tile;
}

function placenode(node,expand){
  if(drawn.indexOf(node)<0){
    drawn.push(node);
    for(let x=0;x<node.size;x++)
      for(let y=0;y<node.size;y++)
        map.appendChild(placetile(x,y,node));
  }
  if(expand) for(let n of node.getneighbors())
    placenode(n,false);
  placespacer();
}

function placespacer(){
  let farx=0;
  let fary=0;
  for(let t of tiles){
    let bounds=t.getBoundingClientRect();
    if(bounds.right>farx) farx=bounds.right;
    if(bounds.bottom>fary) fary=bounds.bottom;
  }
  let spacer=document.createElement('div');
  spacer.classList.add('spacer');
  spacer.style.top=(document.body.scrollTop+fary)+'px';
  spacer.style.left=(document.body.scrollLeft+farx)+'px';
  map.appendChild(spacer);
}

export function draw(){
  map=document.querySelector('#map');
  let entry=system.nodes[0];
  placenode(entry,true);
  player.enter(entry);
  refresh();
  for(let t of tiles){
    if(t.nodeid==player.node.id&&
      t.nodex==player.x&&t.nodey==player.y){
      t.scrollIntoView();
      break;
    }
  }
}

function refresh(){
  for(let t of tiles){
    let node=system.nodes[t.nodeid];
    let style=t.style;
    if(style.opacity==0) setTimeout(function(){
      t.classList.add('discovered');
    },1);
    if(!node.visited) continue;
    if(!style.border) t.classList.add('visited');
    let avatar=node.getavatar(t.nodex,t.nodey);
    if(t.image&&(!avatar||avatar!=t.avatar)){
      t.avatar=null;
      t.image.style.opacity=0;
      let fade=t.image;
      t.image=null;
      setTimeout(function(){t.removeChild(fade);},FADETIME);
    }
    if(avatar&&avatar!=t.avatar){
      t.avatar=avatar;
      t.image=document.createElement('img');
      t.image.src=avatar.image;
      t.image.title=avatar.tooltip;
      t.appendChild(t.image);
    }
  }
}
