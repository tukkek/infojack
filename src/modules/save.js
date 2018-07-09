import {hero} from './character/character';
import environment from '../environment';
import {deck} from './deck';

class Save{
  constructor(){}
  
  checkload(){
    return localStorage.getItem('infojack-save');
  }
  
  debug(){
    if(!environment.printsave) return;
    let data=this.checkload();
    if(data) alert(data);
  }

  save(){
    let data={};
    data.hero=hero;
    data.deck=deck;
    localStorage.setItem('infojack-save',
      JSON.stringify(data));
    this.debug();
  }
  
  load(){
    let data=this.checkload();
    if(!data) return false;
    data=JSON.parse(data);
    this.populate(data);
    this.initialize();
    return true;
  }

  populate(data){
    hero.assign(data.hero);
    deck.assign(data.deck);
    this.debug();
  }

  initialize(){}

  //TODO use on game lost
  //TODO use on game won
  clear(){localStorage.setItem('infojack-save','');}
}

export var save=new Save();
