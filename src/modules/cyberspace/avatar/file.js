import {Avatar} from './avatar';
import {rpg,CRITICALMISS} from '../../rpg';
import {console} from '../console';
import {hero as offlinehero} from '../../character/character';
import {deck} from '../../deck';

var NOTDOWNLOADING=-1;

//TODO would be great to have a filename generator based on the grade of the file
//TODO have a chance of it being a program! (purchasedc==purchasedc)
export class File extends Avatar{
  constructor(system){
    super(system);
    this.setname('Data');
    this.setimage('nodes/fileunscanned.png');
    this.purchasedc=system.level+rpg.randomize(4);
    this.worthless=
      this.purchasedc<1||rpg.chancein(system.level+1);
    this.trap=!this.worthless&&
      rpg.chancein(60/system.level);
    this.protected=!this.worthless&&!this.trap&&
      rpg.chancein(21/system.level);
    if(this.worthless) this.purchasedc=0;
    else if(this.protected&&this.purchasedc<system.level) 
      this.purchasedc=system.level;
    this.size=rpg.r(1,this.getscale());
    this.downloading=NOTDOWNLOADING;
  }
  
  scan(){
    this.scanned=true; //redundant (for File#setname)
    if(this.worthless){
      this.leave(this.node);
    }else if(this.protected){
      this.setimage('nodes/fileprotected.png');
      this.setname('Encrypted data');
    }else if(this.trap&&false){ //TODO only show if player has a verification program running (plus test)
      this.setimage('nodes/filetrap.png');
      this.setname('Trap data');
    }else{
      this.setimage('nodes/file.png');
      this.setname('Unencrypted data');
    }
  }
  
  decrypt(){
    if(!this.protected) return true;
    let p=this.system.player;
    let decrypt=p.roll(p.character.getdecryption());
    if(decrypt==CRITICALMISS){
      sound.play(sound.CRASH);
      console.print('You destroy the file by accident!');
      this.leave(this.node);
      return false;
    }
    return this.hack(false,decrypt);
  }
  
  download(){
    let name='File '+this.getserial();
    this.setname(name);
    console.print('You start downloading '+name+
      ' ('+this.size+' blocks)...');
    this.downloading=0;
    deck.storageused+=this.size;
    this.ap=this.system.player.ap;
  }
  
  click(){
    if(this.downloading!=NOTDOWNLOADING){
      console.print('You are already downloading this.');
      return;
    }
    this.system.player.ap+=.5;
    if(this.trap){
      this.leave(this.node);
      console.print('The file was a honeypot!');
      this.system.raisealert(2);
      return;
    }
    if(this.size>deck.getfreestorage()){
      console.print("You need "+this.size+
        " free storage blocks.");
      return;
    }
    this.system.player.ap+=.5;
    if(this.decrypt()) this.download();
  }
  
  act(){ //TODO deck download speed upgrade?
    this.ap+=.5;
    if(this.downloading==NOTDOWNLOADING) return;
    this.downloading+=.5;
    if(this.downloading<this.size){
      let done=Math.round(100*this.downloading/this.size);
      console.print('Downloading '+this.name+'... '+
        done+'% done.');
      return;
    }
    let value=offlinehero.sell(this.purchasedc);
    let result='Downloaded '+this.name+'. ';
    if(value==0){
      result+='It was worthless and discarded.';
      deck.storageused-=this.size;
    }else{
      result+='It is worth '+value+'¥!';
    }
    console.print(result);
    this.leave(this.node);
  }
  
  die(){
    if(this.downloading!=NOTDOWNLOADING)
      deck.storageused+=this.size;
  }
  
  setname(name){
    super.setname(name);
    if(this.scanned)
      this.tooltip+=' ('+this.size+' blocks)';
  }
}
