import {Avatar} from './avatar';

export class Map extends Avatar{
  constructor(system){
    super(system);
  }
  
  scan(){
    this.setimage('nodes/map.bmp');
    this.tooltip='Map';
  }
  
  click(){
    this.system.reveal();
    this.node.remove(this);
  }
}
