import {Avatar} from './avatar.js';

export class Map extends Avatar{
  constructor(system){
    super('nodes/map.bmp',system);
  }
  
  click(){
    super.click();
  }
}
