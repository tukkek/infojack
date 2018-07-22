import {Ice} from './ice';
import {rpg} from '../../../rpg';
import {save} from '../../../save';
import {sound} from '../../../sound';
import {console} from '../../console';

const DUMMY=[0,0];
const FINISHED=100;

export class Tracer extends Ice{
  constructor(system,level){
    super('Tracer','tracer.png',system,level);
  }
  
  create(characterclass,occupation,level){
    super.create(characterclass,occupation,level);
    let c=this.character;
    while(c.learnability('intelligence')) continue;
    for(let s of ['search','stealth','perceive','bluff'])
      c.learnskill(s);
    c.learnfeat('meticulous');
    c.learnfeat('stealthy');
    while(c.learnfeat('toughness')) continue;
  }
  
  getattack(ranged=true){return DUMMY;}
  
  attack(bonus,target,damage,roll=false){
    if(this.system.alert!=2||target.node!=this.node)
      return false;
    this.ap+=.5;
    let p=this.system.player;
    let stealth=p.roll(p.character.getstealth(),10);
    if(rpg.r(1,20)+this.character.getsearch()>=stealth){
      let level=this.character.level;
      p.trace+=level+rpg.randomize(level);
      if(p.trace>=FINISHED){
        save.clear();
        alert('Your identity has been traced. Game over.');
        location.reload();
      }else{
        sound.play('Scan.wav');
        console.print('A trace is active ('+p.trace+'%)!');
      }
    }
    return true;
  }
  
  deploy(node){return false;}
}
