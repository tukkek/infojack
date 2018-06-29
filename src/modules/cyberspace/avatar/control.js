import {Avatar} from './avatar';

export class Control extends Avatar{
  constructor(system){
    super('nodes/core.png',system);
    this.tooltip='Process';
  }
  
  scan(){
    this.setimage('nodes/control.png');
    this.tooltip='Control';
  }
}