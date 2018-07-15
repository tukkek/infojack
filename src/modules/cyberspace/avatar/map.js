import {Avatar} from './avatar';

export class Map extends Avatar{
  scan(){
    this.setimage('nodes/map.bmp');
    this.setname('Map');
  }
  
  click(){this.system.reveal();}
}
