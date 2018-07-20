import {Ice} from './ice';
import {Cpu} from '../../node/cpu';
import {Datastore} from '../../node/datastore';
import {Interface} from '../../node/interface';
import {Portal} from '../../node/portal';

export class Bouncer extends Ice{
  constructor(system,level){
    super('Bouncer','ice/bouncer.png',system,level+1);
  }
  
  create(characterclass,occupation,level){
    super.create(characterclass,occupation,level);
    let c=this.character;
    while(c.learnability('intelligence')) continue;
    c.learnskill('perceive');
    while(c.learnfeat('toughness')) continue;
  }
  
  getattack(ranged=true){
    return super.getattack(false);
  }
  
  query(){return true;}
  
  move(){
    if(this.system.alert<2) return false;
    super.move();
  }
  
  deploy(node){
    if(!node.priority) return false;
    if(node instanceof Cpu||node instanceof Datastore||
        node instanceof Interface) return true;
    if(node instanceof Portal) {
      let ice=node.avatars.filter(x=>x instanceof Ice);
      if(ice.length>0) return true;
    }
    return false;
  }
}
