import {System} from './system.js';
      
var TILESIZE=2.5;

var map=false;
var system=new System(1);
var drawn=[];
var farx=0;
var fary=0;

function clicktile(e){
  let tile=e.target;
  system.nodes[tile.nodeid].click();
}

function placetile(x,y,node){
  let tile=document.createElement('div');
  tile.classList.add('tile');
  tile.nodeid=node.id;
  tile.x=x;
  tile.y=y;
  tile.onclick=clicktile;
  return tile;
}

function placenode(node,rootx,rooty){
  if(drawn.indexOf(node)>=0)
    return;
  drawn.push(node);
  if(rootx<farx)
    farx=rootx;
  if(rooty<fary)
    fary=rooty;
  for(let x=0;x<node.size;x++)
    for(let y=0;y<node.size;y++)
      map.appendChild(placetile(x+rootx,y+rooty,node));
  if(node.left) 
    placenode(node.left,rootx-1-node.left.size,rooty);
  if(node.right)
    placenode(node.right,rootx+1+node.right.size,rooty);
  if(node.top)
    placenode(node.top,rootx,rooty-1-node.top.size);
  if(node.bottom)
    placenode(node.bottom,rootx,rooty+1+node.bottom.size);
}

export function draw(){
  map=document.querySelector('#map');
  placenode(system.nodes[0],0,0);
  for(let t of document.querySelectorAll('.tile')){
    let style=t.style;
    style.width=TILESIZE+'em';
    style.height=TILESIZE+'em';
    style.left=(t.x-farx)*TILESIZE+'em';
    style.top=(t.y-fary)*TILESIZE+'em';
  }
}
