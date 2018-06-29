import {Avatar} from './avatar';

export class Gateway extends Avatar{
  constructor(system){
    super('nodes/gateway.png',system);
    this.scanned=true;
  }
}
