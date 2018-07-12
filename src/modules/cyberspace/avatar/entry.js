import {Avatar} from './avatar';

export class Entry extends Avatar{
  constructor(system){
    super(system);
  }
  
  scan(){
    this.setimage('nodes/entry.png');
    this.tooltip='ICE entry';
  }
  
  click(){
    super.click();
  }
}
