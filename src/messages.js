import {connect} from './modules/world/business';

export class ShowView{
  constructor(view){this.view=view;}
}

export class Connect{
  constructor(){this.system=connect();}
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
