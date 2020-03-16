import {Ice} from './ice';

export class Greeter extends Ice{
  constructor(system,level){
    super('Greeter','greeter.png',system,level+1);
  }
  
  create(characterclass,occupation,level){
    super.create(characterclass,occupation,level);
    let c=this.character;
    while(c.learnability('wisdom')) continue;
    for(let skill of ['bluff','perceive','stealth']) 
      c.learnskill(skill);
    //TODO Alert or bluff style feat would be better
    for(let feat of ['stealthy','improved initiative'])
      c.learnfeat(feat);
    while(c.learnfeat('toughness')) continue;
  }
  
  move(){return false;}
  
  deploy(node){
    for(let a of node.avatars) if(a instanceof Greeter)
      return false;
    return true;
  }
}
