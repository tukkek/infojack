import {Avatar} from './avatar';

export class Terminal extends Avatar{
  constructor(system){
    super(system);
  }
  
  scan(){
    this.setimage('nodes/terminal.png');
    this.tooltip='Terminal';
  }
  
  click(){
    super.click();
  }
}
