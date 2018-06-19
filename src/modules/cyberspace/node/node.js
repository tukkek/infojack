class Node{
  constructor(system){
    this.id=system.nodes.length;
    system.nodes.push(this);
    this.ice=[];
    this.size=5;
    this.top=false;
    this.left=false;
    this.bottom=false;
    this.right=false;
  }
  
  click(){
    alert(this.id);
  }
}
