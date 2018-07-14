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
    this.setname('A process');
    this.create(webcrawler,occupations.adventurer,
      system.level);
    this.scandc=this.system.level+rpg.randomize(4);
    let stealth=10+this.character.getstealth();
    this.scandc=Math.max(this.scandc,stealth,1);
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
  
  describehealth(){
    let health=this.hp/this.maxhp;
    if(health<=0) return 'deallocated';
    if(health==1) return 'unharmed';
    if(health>=.5) return 'OK';
    if(health>=.25) return 'unstable';
    return 'critical';
  }
  
  damage(damage){
    this.hp-=damage;
    console.print(
      this.name+' is '+this.describehealth()+'.');
  }
  
  hit(roll,bonus){
    if(roll==1) return false;
    if(roll==20) return true;
    return roll+bonus>=this.character.defence;
  }
  
  attack(bonus,target,damage,roll=false){
    if(!roll) roll=rpg.r(1,20);
    if(!target.hit(roll,bonus)) return false;
    target.damage(damage);
    return true;
  }
}
