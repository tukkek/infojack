export class Avatar{
  constructor(image,system){
    this.image='./images/'+image;
    this.system=system;
    this.node=false;
    this.x=-1;
    this.y=-1;
  }
  
  enter(node){
    return node.enter(this);
  }
}
