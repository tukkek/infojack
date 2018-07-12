import {rpg} from '../../rpg';
import {console} from '../console';
import {Character} from '../../character/character';
import {webcrawler} from '../../character/class/webcrawler';
import {occupations} from '../../character/occupation';

export class Avatar{
  constructor(system){
    this.setimage('nodes/process.png');
    this.system=system;
    this.node=null;
    this.x=-1;
    this.y=-1;
    this.scanned=false;
    this.scandc=this.system+rpg.randomize(10);
    if(this.scandc<1) this.scandc=1;
    this.setname('A process');
    this.create(webcrawler,occupations.adventurer,
      system.level);
    this.ap=-(rpg.r(1,20)+this.character.getinitiative())/20;
  }
  
  create(characterclass,occupation,level){
    this.character=new Character();
    this.character.setoccupation(occupation);
    for(let i=0;i<level;i++) 
      characterclass.advance(this.character);
  }
  
  setname(name){
    this.name=name;
    this.tooltip=name;
  }
  
  setimage(image){this.image='./images/'+image;}

  enter(node){return node.enter(this);}
  
  click(){alert('Unimplemented.');}
  
  scan(){return true;}
  
  act(){this.ap+=.5;}
}
