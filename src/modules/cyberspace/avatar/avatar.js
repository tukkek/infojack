export class Avatar{
  constructor(image,system){
    this.setimage(image);
    this.system=system;
    this.node=null;
    this.x=-1;
    this.y=-1;
    this.scanned=false;
    this.tooltip=this.constructor.name;
  }
  
  setimage(image){
    this.image='./images/'+image;
  }
  
  enter(node){
    return node.enter(this);
  }
  
  click(){
    alert('clicky!');
  }
  
  scan(){
    return true;
  }
}
