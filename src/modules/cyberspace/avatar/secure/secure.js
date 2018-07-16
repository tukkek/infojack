import {Avatar} from '../avatar';

export class SecureAvatar extends Avatar{
  create(characterclass,occupation,level){
    super.create(characterclass,occupation,level);
    let c=this.character;
    for(let s of ['bluff','perceive']) c.learnskill(s);
  }
  
  click(){return this.hack(true);}
}
