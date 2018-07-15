export class ShowView{
  constructor(view){this.view=view;}
}

export class Disconnect{
  constructor(win=false){
    this.win=win;
    this.message='You have been disconnected!';
  }
}
