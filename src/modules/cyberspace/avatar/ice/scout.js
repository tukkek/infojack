import {Ice} from './ice';
import {rpg} from '../../../rpg';
import {console} from '../../console';

//prevents 50% of turning back into a room, on worst-case
var PATHHISTORY=2;

export class Scout extends Ice{
  constructor(system){
    super('ice/scout.png',system);
    this.path=[];
  }
  
  create(characterclass,occupation,level){
    super.create(characterclass,occupation,level);
    let c=this.character;
    c.learnability('wisdom');
    for(let s of ['perceive','stealth']) c.learnskill(s);
    c.learnfeat('improved initiative'); //TODO Alert-style feat would be better
    c.speed+=this.character.level;
  }
  
  enter(node){
    if(!super.enter(node)) return false;
    this.path.push(node);
    if(this.path.length>PATHHISTORY) this.path.shift();
    return true;
  }
  
  query(){ //return false if failed query
    if(this.system.alert==2) return true;
    let p=this.system.player;
    if(p.node!=this.node) return true;
    let c=p.character;
    if(p.hide(this)) return true;
    this.ap+=.5;
    let bluff=rpg.r(1,20)+this.character.getbluff();
    if(p.query(bluff,this)) return true;
    this.system.raisealert();
    this.path=[];
    return false;
  }
  
  move(){
    if(this.system.alert>0&&
      this.system.player.node==this.node) 
        return; //don't move
    let destinations=rpg.shuffle(this.node.getneighbors());
    let destination=false;
    for(let d of destinations) if(this.path.indexOf(d)<0){
      destination=d;
      break;
    }
    this.enter(destination?
      destination:rpg.choose(destinations));
    this.query();
  }
  
  act(){
    let ranged=this.character.getranged();
    let damage=this.getdamage();
    if(this.attack(ranged,this.system.player,damage))   
      return;
    if(!this.query()) return;
    this.move();
  }
}
