import {Avatar} from './avatar.js';

export class Terminal extends Avatar{
  constructor(system){
    super('nodes/terminal.png',system);
  }
  
  click(){
    super.click();
  }
}
