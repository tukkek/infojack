import {Avatar} from './avatar';
import {console} from '../console';
import {hero as offline} from '../../character/character';
import {rpg,CRITICALHIT,CRITICALMISS} from '../../rpg';
import {sound} from '../../sound';
import {Disconnect} from '../../../messages';
import {deck} from '../../deck';
import environment from '../../../environment';

export const events={
  ATTACK:'ATTACK',CONNECT:'CONNECT',MAPREVEALED:'MAPREVEALED',OPENFILE:'OPENFILE',}

var lastact=-9000;

export class Player extends Avatar{
  constructor(system){
    super(system);
    this.setname(offline.name);
    this.setimage('characters/'+offline.image+'.png');
    this.scanned=true;
    this.target=false; //current target (ICE)
    this.credentials=10+this.character.getforgery();
    this.privilege=0; //global roll() bonus
    this.trace=0; //see Tracer ICE
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
    if(!super.enter(node)) return false;
    if(!first){
      sound.play(sound.MOVE);
      console.print('You enter a node...');
    }
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

  act(){
    if(this.ap<lastact+1) return;
    lastact=this.ap;
    let hacking=Math.max(
      this.roll(this.character.gethacking()),
      this.roll(this.character.gethacking(),10));
    deck.act(hacking,this.system);
  }

  query(dc,source){ //ICE queries player
    if(this.credentials>=dc) return true;
    sound.play(sound.QUERY);
    console.print(source.name+' queries you...');
    let bluff=this.roll(this.character.getbluff());
    if(bluff<dc) return false;
    this.credentials=bluff;
    return true;
  }

  //returns true on hit, false on miss
  attack(bonus,target,damage,roll=false){
    this.fireevent(events.ATTACK);
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
    this.system.raisealert(+2,true);
    //TODO transfer extra damage
    let d=new Disconnect('You have been disconnected!');
    d.safe=true;
    throw d;
  }

  hide(spotter){
    let perceive=10+spotter.character.getperceive();
    let search=rpg.r(1,20)+spotter.character.getsearch()
    let dc=Math.max(perceive,search);
    let roll=this.roll(this.character.getstealth());
    if(environment.debug)
      console.print('Hide: '+roll+' DC'+dc+'.');
    return roll>=dc;
  }

  login(){ //or logout
    if(!this.node&&this.system.backdoor) return true;
    let login=this.roll(this.character.gethacking());
    if(this.credentials>login) login=this.credentials;
    if(login>=10+this.system.level) return true;
    this.system.raisealert(+1);
    this.fireevent(events.CONNECT);
    return false;
  }

  connect(){
    sound.play(sound.CONNECT);
    console.print('You connect to: '+this.system.name+'.');
    if(!this.login())
      console.print('Your unauthorized login is detected!');
  }

  disconnect(e){
    this.leave(this.node);
    let message=e.message;
    if(!e.safe&&!this.login())
      message='Your disconnection is detected!'
    if(message) window.alert(message);
    sound.clear();
  }

  fireevent(e){
    for(let n of this.system.nodes) for(let a of n.avatars)
      a.onevent(e);
    for(let program of deck.loaded.slice())
      program.onevent(e,this.system);
  }
}
