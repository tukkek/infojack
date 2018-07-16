import {Avatar} from './avatar';
import {console} from '../console';
import {hero as offline} from '../../character/character';
import {rpg,CRITICALHIT,CRITICALMISS} from '../../rpg';
import {sound} from '../../sound';
import {Disconnect} from '../../../messages';
import {deck} from '../../deck';

export class Player extends Avatar{
  constructor(system){
    super(system);
    this.setname(offline.name);
    this.setimage('characters/'+offline.image+'.png');
    this.scanned=true;
    this.target=false; //current target (ICE)
    this.credentials=10+this.character.getforgery();
    this.privilege=0;
  }
  
  create(characterclass,level){
    this.character=offline.connect();
  }
  
  roll(bonus,roll=false){
    if(!roll) roll=rpg.r(1,20);
    if(roll==1) return CRITICALMISS;
    if(roll==20) return CRITICALHIT;
    if(this.system.alert){
      let concentration=rpg.r(1,20)+
        this.character.getconcentration();
      let penalty=2*this.system.alert-concentration/5;
      bonus-=Math.max(0,Math.round(penalty));
    }
    bonus+=this.privilege-deck.getload();
    return roll+bonus;
  }
  
  enter(node){
    let first=!this.node;
    if(first) console.print('You enter the system...');
    if(!super.enter(node)) return false;
    sound.play(first?sound.CONNECT:sound.MOVE);
    node.visited=true;
    this.node.scan(
      this.roll(this.character.getperceive(),10));
    return true;
  }
  
  wait(){
    sound.play(sound.SCAN);
    console.print('You scan the node...');
    this.ap+=.5;
    this.node.scan(this.roll(this.character.getsearch()));
  }
  
  click(){
    //TODO maybe add % to deck and revert this to #wait()
    let c=this.character;
    let percent=Math.round(100*c.hp/c.maxhp);
    let status='You currently have '+c.hp+
      ' out of '+c.maxhp+' hit points '+
      '('+percent+'%).';
    console.print(status);
  }
  
  act(){throw "Players don't act programatically!";}
  
  query(dc,source){ //ICE queries player
    if(this.credentials>=dc) return true;
    sound.play(sound.QUERY);
    console.print(source.name+' queries you...');
    let bluff=this.roll(this.character.getbluff());
    if(bluff<dc) return false;
    this.credentials=bluff;
    return true;
  }
  
  attack(bonus,target,damage,roll=false){
    if(!roll){
      roll=this.roll(bonus);
      bonus=0;
      if(roll==CRITICALMISS) roll=1;
      else if(roll==CRITICALHIT) roll=20;
    }
    return super.attack(bonus,target,damage,roll);
  }
  
  die(){
    sound.play(sound.DISCONNECTED);
    throw new Disconnect();
  }
  
  hide(spotter){
    return this.roll(this.character.getstealth())>=
      10+spotter.character.getperceive();
  }
  
  connect(){
    this.system.setactive();
    console.system=this.system;
    deck.connect(this.system);
  }
  
  disconnect(){deck.disconnect();}
}
