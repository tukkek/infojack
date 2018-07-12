import {Avatar} from './avatar';

export class Terminal extends Avatar{
  scan(){
    this.setimage('nodes/terminal.png');
    this.tooltip='Terminal';
  }
  
  click(){
    super.click();
  }
}
