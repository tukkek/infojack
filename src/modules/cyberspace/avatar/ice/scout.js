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
    this.character.learnskill('perceive');
    this.character.learnability('wisdom');
    this.character.learnfeat('improved initiative'); //TODO Alert-style feat would be better
    this.character.speed+=this.character.level;
  }
  
  enter(node){
    if(!super.enter(node)) return false;
    this.path.push(node);
    if(this.path.length>PATHHISTORY) this.path.shift();
    return true;
  }
  
  query(){ //return false on failed query
    if(this.system.player.node!=this.node) return true;
    console.print(this.name+' queries you...');
    this.ap+=.5;
    if(false) return true; //TODO opposed skill roll
    this.system.raisealert();
    this.path=[];
    return false;
  }
  
  act(){
    if(!this.query()) return;
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
}
