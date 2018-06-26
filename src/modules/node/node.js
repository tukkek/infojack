export class Node{
  constructor(x,y,system){
    this.x=x;
    this.y=y;
    this.id=system.nodes.length;
    this.ice=[];
    this.size=4;
  }
}
