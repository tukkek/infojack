import {Avatar} from './avatar';
import {rpg,CRITICALMISS} from '../../rpg';
import {console} from '../console';
import {hero as offlinehero} from '../../character/character';
import {deck} from '../../deck';
import {events} from './player';
import {PROGRAMS} from '../../program/program';

var NOTDOWNLOADING=-1;

//TODO would be great to have a filename generator based on the grade of the file
//TODO have a chance of it being a program! (purchasedc==purchasedc)
export class File extends Avatar{
  constructor(system){
    super(system);
    this.setname('Unscanned data');
    this.setimage('nodes/fileunscanned.png');
    this.purchasedc=system.level+rpg.randomize(4);
    this.size=rpg.r(1,this.getscale());
    this.downloading=NOTDOWNLOADING;
    this.worthless=false;
    this.program=false; //TODO need to serialize as name?
    this.trap=false;
    this.protected=false;
    this.define();
  }
  
  getprogram(){
    let eligible=[];
    for(let p of PROGRAMS) if(p.purchasedc==this.purchasedc)
      eligible.push(p);
    return eligible.length==0?false:rpg.choose(eligible);
  }
  
  define(){
    if(this.purchasedc<1||rpg.chancein(system.level+1)){
      this.worthless=true;
      this.purchasedc=0;
      return;
    }
    if(rpg.chancein(20)){
     this.program=this.getprogram();
     if(this.program) return;
    }
    if(rpg.chancein(60/system.level)){
      this.trap=true;
      return;
    }
    if(rpg.chancein(21/system.level)){
      this.protected=true;
      if(this.purchasedc<system.level)
        this.purchasedc=system.level;
      return;
    }
  }
  
  findtrap(){
    if(!this.trap) return false
    let p=this.system.player;
    let perceive=p.roll(p.character.getperceive());
    return perceive>=this.purchasedc;
  }
  
  scan(){
    this.scanned=true; //redundant (for File#setname)
    if(this.worthless){
      this.leave(this.node);
      this.setname('Worthless data');
    }else if(this.program){
      this.setimage('nodes/fileprogram.png');
      this.setname(this.program.name);
    }else if(this.protected){
      this.setimage('nodes/fileprotected.png');
      this.setname('Encrypted data');
    }else if(this.findtrap()){
      this.setimage('nodes/filetrap.png');
      this.setname('Trap data');
    }else{
      this.setimage('nodes/file.png');
      this.setname('Unencrypted data');
    }
    if(this.node==this.system.player.node)
      console.print('File scanned: '+this.name+'.');
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
  
  validate(){
    if(this.size>deck.getfreestorage())
      return "You need "+this.size+" free storage blocks.";
    if(this.program&&deck.programs.indexOf(this.program)>=0)
      return 'You already have '+this.program.name+'.';
    return false;
  }
  
  download(){
    let name=this.name+' '+this.getserial();
    this.setname(name);
    console.print('You start downloading '+name+
      ' ('+this.size+' blocks)...');
    this.downloading=0;
    deck.storageused+=this.size;
    this.ap=this.system.player.ap;
  }
  
  spring(){
    if(!this.trap) return false;
    this.leave(this.node);
    console.print('The file was a honeypot!');
    this.system.raisealert(2);
    return true;
  }
  
  click(){
    if(this.downloading!=NOTDOWNLOADING){
      console.print('You are already downloading this.');
      return;
    }
    let p=this.system.player;
    p.fireevent(events.OPENFILE);
    p.ap+=.5;
    if(this.spring()) return;
    let invalid=this.validate();
    if(invalid){
      console.print(invalid);
      return;
    }
    p.ap+=.5;
    if(this.decrypt()) this.download();
  }
  
  transfer(){
    if(this.program){
      deck.programs.push(this.program);
      console.print('You now have '+this.program.name+'!');
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
  }
  
  act(){ //TODO deck download speed upgrade?
    this.ap+=.5;
    if(this.downloading==NOTDOWNLOADING) return;
    this.downloading+=.5;
    if(this.downloading<this.size){
      let progress=
        Math.round(100*this.downloading/this.size);
      console.print('Downloading '+this.name+'... '+
        '('+progress+'% done)');
    }else{
      this.transfer();
      this.leave(this.node);
    }
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
