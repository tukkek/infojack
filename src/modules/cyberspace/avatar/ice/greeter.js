import {Scout} from './scout';

export class Greeter extends Scout{
  constructor(system,level){
    super(system,level+1);
    this.revealedname='Greeter';
    this.revealedimage='ice/greeter.png';
  }
  
  create(characterclass,occupation,level){
    super.create(characterclass,occupation,level);
    this.character.speed=5;
  }
  
  move(){this.ap+=.5;}
}
