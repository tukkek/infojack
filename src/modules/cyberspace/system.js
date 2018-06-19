class System{
  constructor(level){
      this.nodes=[];
      this.ice=[];
      this.generate();
  }
  
  generate(){
    let n=new Node(this);
    n.right=new Node(this);
    n.bottom=new Node(this);
    n.top=new Node(this);
    n.left=new Node(this);
  }
}
