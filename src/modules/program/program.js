import {deck} from '../deck';
import {grades} from '../grade';
import {console} from '../cyberspace/console';

export var SESSION=Number.MAX_SAFE_INTEGER;
export var PROGRAMS=new Map();

export class Program{
  constructor(name,grade,hack,buy,code){
    this.hackingdc=hack;
    this.purchasedc=buy;
    this.programmingdc=code;
    this.size=1; //MBs / blocks
    this.apcost=.5;
    this.duration=0; //0=instantaneous SESSION=permanent
    this.basename=name;
    this.name=name;
    this.grade=grade;
    if(grade){
      this.name+=' '+grades[grade];
      if(grade>1) this.upgrade(grade-1);
    }
    PROGRAMS.set(this.name,this);
  }
  
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
    return true;
  }
  
  unload(system){
    let i=deck.loaded.indexOf(this);
    if(i<0) return false;
    deck.memoryused-=this.size;
    deck.loaded.splice(i,1);
    return true;
  }
  
  run(system){return false;}
  
  upgrade(ntimes){
    this.hackingdc+=ntimes;
    this.purchasedc+=ntimes;
    this.programmingdc+=ntimes;
    this.size+=ntimes/2;
  }
  
  describe(){return this.name;}
  
  compare(program){
    if(this.basename==program.basename)
      return this.grade-program.grade;
    return this.basename.localeCompare(program.basename);
  }
}