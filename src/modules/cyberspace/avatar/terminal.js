import {Avatar} from './avatar';

export class Terminal extends Avatar{
  constructor(system){
    super('nodes/core.png',system);
    this.tooltip='Process';
  }
  
  scan(){
    this.setimage('nodes/terminal.png');
    this.tooltip='Terminal';
  }
  
  click(){
    super.click();
  }
}
