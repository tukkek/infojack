import {Avatar} from '../avatar';
import {console} from '../../console';
import {rpg} from '../../../rpg';
import {sound} from '../../../sound';
import environment from '../../../../environment';

export class Ice extends Avatar{
  constructor(name,image,system,level){
    super(system,level);
    this.revealedname=name;
    this.revealedimage=image;
    if(environment.debug) this.checkcharacter();
  }
  
  checkcharacter(){
    let c=this.character;
    let level=' (level '+c.level+')';
    let name=this.constructor.name;
    if(c.pointextra)
      console.log(c.pointextra+' unspent ability points: '+
        name+level);
    if(c.ranks)
      console.log(c.ranks+' unspent ranks: '+name+level);
    if(c.newfeats)
      console.log(c.newfeats+' unspent feats: '+name+level);
  }
  
  click(){
    if(!this.scanned) return;
    let p=this.system.player;
    if(p.target==this){
      p.target=false;
      console.print('Target cleared...');
    }else{
      p.target=this;
      console.print('Targeting '+this.name+'...');
    }
  }
  
  scan(){
    this.setname(this.revealedname+' '+this.getserial());
    this.setimage(this.revealedimage);
  }
  
  act(){throw 'Unimplemented Ice#act() for '+this.name;}
  
  //returns true on attempt, hit or not
  attack(bonus,target,damage,roll=false){
    if(this.system.alert!=2||target.node!=this.node)
      return false;
    this.ap+=.5;
    sound.play(sound.ICEATTACK);
    console.print(this.name+' attacks!');
    super.attack(bonus,target,damage)
    return true;
  }
  
  getdamage(){return rpg.r(1,this.getscale());}
  
  die(){
    super.die();
    sound.play(sound.ICEDEATH);
    this.system.reentry.push(this);
  }
  
  reset(){
    super.reset();
    this.leave(this.node);
  }
  
  show(){
    if(this.system.revealed) return true;
    if(this.node!=this.system.player.node) return false;
    return this.scanned;
  }
  
  query(){//return false if failed query
    if(this.system.alert==2) return true;
    let p=this.system.player;
    if(p.node!=this.node) return true;
    if(p.hide(this)) return true;
    this.ap+=.5;
    let bluff=rpg.r(1,20)+this.character.getbluff();
    if(p.query(bluff,this)) return true;
    this.system.raisealert();
    return false;
  }
  
  findplayer(){//return player if adjacent
    let p=this.system.player;
    let spotdc=p.roll(p.character.getstealth(),10);
    let spot=rpg.r(1,20)+this.character.getperceive();
    if(spot<spotdc) return false;
    for(let n of this.node.getneighbors())
      if(n==p.node) return p;
    return false;
  }
  
  getdestination(){
    if(this.system.alert){
      let player=this.findplayer();
      if(player) return player.node;
    }
    return rpg.choose(this.node.getneighbors());
  }
  
  move(){
    if(this.system.alert>0&&
      this.system.player.node==this.node) return false;
    this.enter(this.getdestination());
    return true;
  }
  
  getattack(ranged=true){ //bonus and damage, default: ranged
    if(ranged)
      return [this.character.getranged(),this.getdamage()];
    let c=this.character;
    let meleedamage=this.getdamage();
    meleedamage+=c.getmodifier(c.intelligence);
    return [this.character.getmelee(),meleedamage];
  }
  
  act(){
    let attack=this.getattack();
    if(this.attack(attack[0],this.system.player,attack[1]))
      return;
    if(!this.query()) return;
    if(this.move()) return;
    this.ap+=.5; //wait
  }
  
  //return true if ICE likes being deployed in this node
  //no randomness: return always false for random deploy
  deploy(node){return node.priority;}
}
