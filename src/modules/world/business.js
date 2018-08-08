//Corporation are the offline counterpart of Systems and they can be easily serialized, with system being regenerated. See GitHub issue #44.
//TODO generate all available Corporations at save start, 1d4 per level (1-20). make sure names don't overlap.
import {name} from './names';
import {System} from '../cyberspace/system'
import {rpg} from '../rpg';
import {hero as offlinehero} from '../character/character';
import environment from '../../environment';

const LETTERS='ABCDEFGHIJKLMNOPQRSTUVXWYZ';
const DEBUG=environment.debug&&true;

var active=false;

/* Each business has a certain depth, starting at depth 0 which is the entry-level System. Each System will have Portals to all the following depth's Systems (or none if at maximum depth already). The final depth contains only one System, representing the mainframe. */
export class Business{
  constructor(level){
    this.name=name(level);
    this.level=level;
    this.backdoor=false;
    this.systems=[];
    this.map();
    for(let depth of this.systems) for(let system of depth) 
      system.generate();
  }
  
  map(){
    this.entry=
      new System(this.name+' (entry)',this.level,this,0);
    this.systems[0]=[this.entry];
    let tier=Math.ceil(this.level/5);
    let levels=tier+rpg.randomize(tier);
    if(DEBUG) levels=tier;
    for(let depth=1;depth<levels;depth++){
      let l=[];
      let ismainframe=depth==levels-1;
      let branches=ismainframe?1:rpg.r(1,tier);
      if(DEBUG&&!ismainframe) branches=tier;
      for(let branch=0;branch<branches;branch++){
        let name=this.name+' ('+depth+LETTERS[branch]+')';
        let s=new System(name,this.level+depth,this,0+depth);
        l.push(s);
      }
      this.systems[depth]=l;
    }
    this.mainframe=this.systems[this.systems.length-1][0];
  }
  
  crash(system){active=false;}
}

/*Enters the entry-level System for this Business or exploits a backdoor.*/
export function connect(){
  if(!active){
    let level=environment.systemlevel||offlinehero.level;
    active=new Business(level);
  }
  if(active.backdoor&&active.backdoor.backdoor)
    return active.backdoor;
  return active.entry;
}

