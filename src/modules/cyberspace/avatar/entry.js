import {Avatar} from './avatar.js';

export class Entry extends Avatar{
  constructor(system){
    super('nodes/entry.png',system);
    this.tooltip='ICE entry';
  }
  
  click(){
    super.click();
  }
}
