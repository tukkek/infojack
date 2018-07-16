export class ShowView{
  constructor(view){this.view=view;}
}

export class Disconnect{
  constructor(message=false){
    this.message=message;
    this.safe=false;
    this.win=false;
  }
}

export class Refresh{
  constructor(target){this.target=target;}
}
