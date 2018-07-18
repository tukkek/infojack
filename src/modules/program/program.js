import {deck} from '../deck';
import {grades} from '../grade';
import {console} from '../cyberspace/console';
import {hero} from '../character/character';

export var SESSION=Number.MAX_SAFE_INTEGER;
export var PROGRAMS=new Map();

//For design parameters: https://github.com/tukkek/infojack/wiki/Program-parameters-reference
export class Program{
  constructor(name,grade,image,size,hack,buy,code){
    this.hackingdc=hack;
    this.purchasedc=buy;
    this.programmingdc=code;
    this.size=size; //MBs / blocks
    this.apcost=.5;
    this.duration=SESSION; //0=instantaneous
    this.basename=name;
    this.name=name;
    this.image='./images/software/'+image;
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
  
  validate(){
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
    return true;
  }

  boot(system){
    let p=system.player;
    let hack=p.roll(p.character.gethacking());
    if(hack>=this.hackingdc)
      return true;
    console.print('You failed to load '+this.name+'...');
    return false;
  }
  
  load(system,safe=false){
    if(!this.validate()) return false;
    system.player.ap+=this.apcost;
    if(!safe&&!this.boot(system)) return false;
    console.print(this.name+' loaded.');
    deck.memoryused+=this.size;
    deck.loaded.push(this);
    return true;
  }
  
  unload(system){
    let i=deck.loaded.indexOf(this);
    if(i<0) return false;
    console.print(this.name+' unloaded.');
    system.player.ap+=this.apcost;
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
