import {Avatar} from './avatar.js';

export class Entry extends Avatar{
  constructor(system){
    super('nodes/core.png',system);
    this.tooltip='Process';
  }
  
  scan(){
    this.setimage('nodes/entry.png');
    this.tooltip='ICE entry';
  }
  
  click(){
    super.click();
  }
}
