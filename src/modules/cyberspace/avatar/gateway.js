import {Avatar} from './avatar';

export class Gateway extends Avatar{
  constructor(system){
    super(system);
    this.setname('Gateway');
    this.setimage('nodes/gateway.png');
    this.scanned=true;
  }
}
