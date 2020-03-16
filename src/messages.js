import {connect} from './modules/world/business';

export class ShowView{
  constructor(view){this.view=view;}
}

export class Connect{
  constructor(system=connect()){
    system.connect();
    this.system=system;
  }
}

export class Disconnect{
  constructor(message=false){
    this.message=message;
    this.safe=false;
    this.win=false;
    this.reconnect=false;//jumping between systems
  }
}

export class Refresh{
  constructor(target){this.target=target;}
}
