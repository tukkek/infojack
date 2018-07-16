import {Avatar} from './avatar';
import {rpg,CRITICALMISS} from '../../rpg';
import {console} from '../console';
import {deck} from '../../deck';

export class Control extends Avatar{
  constructor(system){
    super(system);
    this.memory=rpg.chancein(2)?rpg.r(1,this.getscale()):0;
    this.privilege=0;
    while(rpg.chancein(2)) this.privilege+=1;
  }
  
  scan(){
    if(!this.memory&&!this.privilege) this.leave(this.node);
    this.setimage('nodes/control2.png');
    this.setname('External device');
  }
  
  abuse(){
    if(this.memory){
      console.print("You gain to access "+this.memory+
        " blocks of memory!");
      deck.memorytemporary+=this.memory;
      deck.memoryused-=this.memory;
    }
    if(this.privilege){
      let p=this.system.player;
      let result;
      if(p.privilege<this.privilege){
        p.privilege+=this.privilege;
        result="Your privilege escalated to +"
          +this.privilege+"!";
      }else result="You're already at privilege +"+
        p.privilege+'...';
      console.print(result);
    }
    this.hide();
  }
  
  click(){
    let p=this.system.player;
    let hacking=p.roll(p.character.gethacking());
    if(hacking==CRITICALMISS){
      console.print('You trigger an alarm!');
      this.system.raisealert(+1);
      return;
    }
    if(this.hack(hacking)) this.abuse();
  }
}
