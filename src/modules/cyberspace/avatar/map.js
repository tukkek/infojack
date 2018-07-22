import {Avatar} from './avatar';
import {CRITICALMISS} from '../../rpg';
import {console} from '../console';
import {sound} from '../../sound';
import {events} from './player';

export class Map extends Avatar{
  scan(){
    this.setimage('nodes/map.bmp');
    this.setname('Map');
  }
  
  click(){
    let p=this.system.player;
    let hack=p.roll(p.character.gethacking());
    if(hack==CRITICALMISS){
      console.print(
        'You trigger an aler while reading the map!');
      this.system.raisealert(+1);
      return;
    }
    if(this.hack(false,hack)){
      console.print('You download the system map!');
      sound.play(sound.SUCCESS);
      this.system.reveal();
    }
  }
  
  onevent(e){if(e==events.MAPREVEALED) this.hide();}
}
