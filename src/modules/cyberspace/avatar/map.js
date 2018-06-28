import {Avatar} from './avatar.js';

export class Map extends Avatar{
  constructor(system){
    super('nodes/core.png',system);
    this.tooltip='Process';
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
