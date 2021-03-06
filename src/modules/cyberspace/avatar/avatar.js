import {rpg,CRITICALMISS,CRITICALHIT} from '../../rpg';
import {console} from '../console';
import {Character} from '../../character/character';
import {webcrawler} from '../../character/class/webcrawler';
import {occupations} from '../../character/occupation';
import {sound} from '../../sound';
import environment from '../../../environment';

export class Avatar{
  constructor(system,level=system.level){
    this.obfuscate();
    this.system=system;
    this.node=null;
    this.x=-1;
    this.y=-1;
    this.create(webcrawler,occupations.adventurer,level);
    this.character.enhance();
    this.scandc=10+this.system.level;
    this.rollinitiative();
  }
  
  rollinitiative(){
    this.ap=-(rpg.r(1,20)+this.character.getinitiative())/20;
  }
  
  obfuscate(){
    this.setname('A process');
    this.setimage('nodes/process.png');
    this.scanned=false;
  }
  
  create(characterclass,occupation,level){
    this.character=new Character();
    this.character.setoccupation(occupation);
    if(level>10){
      console.log('Cannot raise avatar past level 10!');
      level=10;
    }
    for(let i=0;i<level;i++) 
      characterclass.advance(this.character);
    this.character.pointbuy=0;
    this.character.pointextra=9;
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
    let health=this.character.hp/this.character.maxhp;
    if(health<=0) return 'deallocated';
    if(health==1) return 'unharmed';
    if(health>=.5) return 'OK';
    if(health>=.25) return 'unstable';
    return 'critical';
  }
  
  die(){this.leave(this.node);}
  
  damage(damage){
    this.character.hp-=damage;
    console.print(
      this.name+' is '+this.describehealth()+'.');
    if(this.character.hp<=0) this.die();
  }
  
  hit(roll,bonus){
    if(roll==1) return false;
    if(roll==20) return true;
    return roll+bonus>=this.character.getdefence();
  }

  //returns true on hit, false on miss
  attack(bonus,target,damage,roll=false){
    if(!roll) roll=rpg.r(1,20);
    if(!target.hit(roll,bonus)) return false;
    target.damage(damage);
    return true;
  }
  
  authenticate(){
    let dc=10+this.character.getbluff();
    let p=this.system.player;
    return p.hide(this)||p.query(dc,this);
  }
  
  hack(authenticate=false,roll=undefined){
    let p=this.system.player;
    p.ap+=1;
    if(roll===undefined)
      roll=p.roll(p.character.gethacking());
    let discovered=authenticate&&!this.authenticate();
    if(discovered||roll==CRITICALMISS){
      this.system.raisealert(+1);
      return false;
    }
    let dc=this.character.getdefence()+this.system.level;
    if(environment.debug)
      console.print('Hack: '+roll+' DC'+dc+'.');
    if(roll==CRITICALHIT||roll>=dc) return true;
    sound.play(sound.ERROR);
    let name=this.name.toLowerCase();
    console.print('You fail to hack: '+name+'...');
    return false;
  }
  
  leave(node){node.remove(this);}
  
  getserial(){
    let serial=Number(rpg.r(0,9999)).toString();
    while(serial.length<4) serial='0'+serial;
    return serial;
  }
  
  getscale(){ //a die size scaled to this level (d4 to d20)
    let level=Math.min(20,this.character.level);
    for(let die of [4,6,8,10,12,20]) if(level<=die)
      return die;
    throw 'Unknown damage level';
  }
  
  reset(){
    this.character.hp=this.character.maxhp;
    this.rollinitiative();
  }
  
  hide(){
    this.node.hidden.push(this);
    this.leave(this.node);
  }
  
  show(){return true;}
  
  onevent(e){return;}
}
