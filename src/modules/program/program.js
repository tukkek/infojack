import {deck} from '../deck';
import {grades} from '../grade';
import {console} from '../cyberspace/console';
import {hero} from '../character/character';

export var SESSION=Number.MAX_SAFE_INTEGER;
export var PROGRAMS=new Map();

export class Program{
  constructor(name,grade,image,hack,buy,code){
    this.hackingdc=hack;
    this.purchasedc=buy;
    this.programmingdc=code;
    this.size=1; //MBs / blocks
    this.apcost=.5;
    this.duration=0; //0=instantaneous SESSION=permanent
    this.basename=name;
    this.name=name;
    this.image='../../images/software/'+image;
    this.grade=grade;
    if(grade){
      this.name+=' '+grades[grade];
      if(grade>1) this.upgrade(grade-1);
    }
    PROGRAMS.set(this.name,this);
  }
  
  upgrade(ntimes){
    this.hackingdc+=ntimes;
    this.purchasedc+=ntimes;
    this.programmingdc+=ntimes;
    this.size+=ntimes/2;
  }
  
  describe(){return this.name;}
  
  conflict(program){return this.basename==program.basename;}
  
  load(system){
    for(let program of deck.loaded) 
      if(this.conflict(program)){
        console.print(
          'You cannot load '+this.name+' while '+
            program.name+' is loaded...');
        return false;
      }
    if(deck.memoryused+this.size>deck.memory){
      console.print(
        'This program requires '+this.size+' free blocks.');
      return false;
    }
    deck.memoryused+=this.size;
    deck.loaded.push(this);
    system.player.ap+=this.apcost;
    return true;
  }
  
  unload(system){
    let i=deck.loaded.indexOf(this);
    if(i<0) return false;
    deck.memoryused-=this.size;
    deck.loaded.splice(i,1);
    return true;
  }
  
  run(system){}
  
  compare(program){
    if(this.basename==program.basename)
      return this.grade-program.grade;
    return this.basename.localeCompare(program.basename);
  }
  
  buy(){
    if(!hero.buy(this.purchasedc)) return false;
    deck.programs.push(this);
    return true;
  }
}
