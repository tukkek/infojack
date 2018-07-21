import {hero,sign} from './character/character'
import {console} from './cyberspace/console'
import {sound} from './sound'
import {SESSION} from './program/program';
import {grades as armor} from './program/armor';
import {grades as blade} from './program/weapon/blade';
import {grades as blaster} from './program/weapon/blaster';
import './program/cloak';
import {eject} from './program/eject';
import envinronment from '../environment';

var OK='';
var MEMORYUPGRADE=[+10,+5,+5,+5];

class Deck{
  constructor(){
    this.memory=10;
    this.memoryused=0;
    this.memorytemporary=0;
    this.storage=20;
    this.storageused=0;
    this.deckgrade=1;
    this.memorygrade=0;
    this.storagegrade=0;
    this.stealthgrade=0;
    this.loaded=[];
    this.programs=[];
  }
  
  upgrade(checkgrade,currentgrade,purchasedc,installdc,
    apply){
      if(currentgrade==4)
        return 'Already at maximum grade.';
      let upgrade=currentgrade+1;
      if(checkgrade&&upgrade>this.deckgrade) 
        return 'Requires a deck upgrade.';
      purchasedc+=2*(upgrade-1);
      if(hero.wealth<purchasedc-10) 
        return 'Requires '+(purchasedc-10)+'¥.';
      installdc+=1*(upgrade-1);
      if(hero.getelectronics()<installdc-10) 
        return 'Requires electronics '+sign(installdc-10)
          +'.';
      if(apply&&!hero.buy(purchasedc))
        return 'Unexpected not buy error.';
      return OK;
  }
  
  upgradedeck(apply){
    let result=this.upgrade(false,this.deckgrade,10,12,apply);
    if(result==OK&&apply) this.deckgrade+=1;
    return result;
  }
  
  upgradememory(apply){
    let result=
      this.upgrade(true,this.memorygrade,9,14,apply);
    if(result==OK&&apply){
      this.memory+=MEMORYUPGRADE[this.memorygrade];
      this.memorygrade+=1;
    }
    return result;
  }
  
  upgradestorage(apply){
    let result=
      this.upgrade(true,this.storagegrade,8,14,apply);
    if(result==OK&&apply){
      this.storage+=10;
      this.storagegrade+=1;
    }
    return result;
  }
  
  upgradestealth(apply){
    let result=
      this.upgrade(true,this.stealthgrade,10,12,apply);
    if(result==OK&&apply) this.stealthgrade+=1;
    return result;
  }
  
  assign(data){
    for(let key in data){
      if(key in this){
        this[key]=data[key];
      }
    }
  }
  
  sort(){
    this.programs.sort((a,b)=>a.compare(b));
    this.loaded.sort((a,b)=>a.compare(b));
  }
  
  getload(){
    let load=this.memoryused/this.memory;
    if(load>=.75) return 2;
    if(load>=.5) return 1;
    return 0;
  }
  
  connect(system){ //refresh effects for loaded programs
    let loaded=this.loaded;
    this.loaded=[];
    for(let program of loaded){
      program.load(system,true);
    }
  }
  
  disconnect(){
    this.memoryused=0;
    this.memorytemporary=0;
    this.storageused=0;
  }
  
  getfreestorage(){return this.storage-this.storageused;}
  
  act(roll,system){ //called once per turn
    for(let program of deck.loaded.slice())
      if(program.duration!=SESSION){
        program.duration-=1;
        if(program.duration>0) continue;
        sound.play(sound.UNLOAD);
        console.print(program.name+' expired...');
        program.unload(system);
      }
    for(let program of deck.loaded.slice())
      if(roll<program.hackingdc){
        sound.play(sound.UNLOAD);
        console.print('You failed to keep '+program.name+
          ' running...');
        program.unload(system);
      }
  }
}

export var deck=new Deck();
for(let program of [armor[0],blaster[0],eject]){
  if(!program.buy()&&envinronment.debug)
    throw 'Cannot buy '+program.name;
  deck.loaded.push(program);
}
