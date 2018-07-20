import {Ice} from './ice';
import {rpg} from '../../../rpg';
import {console} from '../../console';

export class Scout extends Ice{
  constructor(system,level){
    super('Scout','ice/scout.png',system,level);
    this.path=[]; //prevents looping between rooms
  }
  
  create(characterclass,occupation,level){
    super.create(characterclass,occupation,level);
    let c=this.character;
    while(c.learnability('wisdom')) continue;
    for(let skill of ['perceive','bluff','stealth']) 
      c.learnskill(skill);
    //TODO Alert or bluff style feat would be better
    for(let feat of ['improved initiative','stealthy'])
      c.learnfeat(feat);
    while(c.learnfeat('toughness')) continue;
    c.speed+=this.character.level;
  }
  
  enter(node){
    if(!super.enter(node)) return false;
    this.path.push(node);
    let history=1+Math.round(this.character.speed/30);
    if(this.path.length>history) this.path.shift();
    return true;
  }
  
  getdestination(){
    if(this.system.alert){
      let player=this.findplayer();
      if(player) return player.node;
    }
    let ns=rpg.shuffle(this.node.getneighbors());
    for(let n of ns) if(this.path.indexOf(n)<0) return n;
    return ns[0];
  }
  
  move(){
    let moved=super.move();
    if(moved) this.query();
    return moved;
  }
  
  act(){
    super.act();
    if(this.system.alert==2) this.path=[];
  }
  
  deploy(node){return false;}
}
