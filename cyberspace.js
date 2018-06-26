import {System} from './src/modules/system.js';
      
var TILESIZE=2.5;
var SPACING=1.1;

var map=false;
var system=new System(5);

function clicktile(e){
  let tile=e.target;
  window.alert('node '+tile.nodeid+' '+tile.nodex+':'+tile.nodey);
}

function placetile(x,y,node){
  let tile=document.createElement('div');
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

function placenode(node){
  for(let x=0;x<node.size;x++) for(let y=0;y<node.size;y++)
    map.appendChild(placetile(x,y,node));
}

function placespacer(){
  let farx=0;
  let fary=0;
  for(let tile of document.querySelectorAll('.tile')){
    let bounds=tile.getBoundingClientRect();
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
  for(let n of system.nodes) placenode(n);
  placespacer();
}
