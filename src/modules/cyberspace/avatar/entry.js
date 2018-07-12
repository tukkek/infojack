import {Avatar} from './avatar';

export class Entry extends Avatar{
  scan(){
    this.setimage('nodes/entry.png');
    this.tooltip='ICE entry';
  }
  
  click(){
    super.click();
  }
}
