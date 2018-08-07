//Corporation are the offline counterpart of Systems and they can be easily serialized, with system being regenerated. See GitHub issue #44.
//TODO generate all available Corporations at save start, 1d4 per level (1-20). make sure names don't overlap.
import {name} from './names';
import {System} from '../cyberspace/system'
import {rpg} from '../rpg';
import {hero as offlinehero} from '../character/character';
import environment from '../../environment';

var active=false;

/* Each business has a certain depth, starting at depth 0 which is the entry-level System. Each System will have Portals to all the following depth's Systems (or none if at maximum depth already). The final depth contains only one System, representing the mainframe. */
export class Business{
  constructor(level){
    this.name=name(level);
    this.systems=[];
    this.systems[0]=[new System(level,this,0)];
    this.backdoor=false; //link to System with backdoor TODO
    let tier=Math.ceil(level/5);
    let levels=level+rpg.randomize(tier);
    for(let depth=1;depth<levels;depth++){
      let l=[];
      let ismainframe=depth==levels-1;
      let branches=ismainframe?1:rpg.r(1,tier);
      for(let branch=0;branch<branches;branch++)
        l.push(new System(level+depth,this,0+depth));
      this.systems[depth]=l;
    }
    this.entry=this.systems[0][0];
    this.mainframe=this.systems[this.systems.length-1][0];
  }
  
  crash(system){active=false;}
}

/*Enters the entry-level Sysstem for this Business or exploits a backdoor.*/
export function connect(){
  if(!active){
    let level=environment.systemlevel||offlinehero.level;
    active=new Business(level);
  }
  let target=active.entry;//TODO check backdoor
  target.connect();
  return target;
}

