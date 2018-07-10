import {hero} from './character/character';
import environment from '../environment';
import {deck} from './deck';
import {PROGRAMS} from './program/program';

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

  saveprograms(programs){
    return programs.map(p=>p.name);
  }
  
  save(){
    let data={};
    data.hero=hero;
    data.deck=Object.assign({},deck);
    data.deck.loaded=this.saveprograms(data.deck.loaded);
    data.deck.programs=this.saveprograms(data.deck.programs);
    localStorage.setItem('infojack-save',
      JSON.stringify(data));
    this.debug();
  }

  loadprograms(deck){
    let programs=[];
    let loaded=[];
    for(let name of deck.programs){
      let p=PROGRAMS.get(name);
      programs.push(p);
      if(deck.loaded.indexOf(name)>=0) loaded.push(p);
    }
    deck.programs=programs;
    deck.loaded=loaded;
  }
  
  populate(data){
    hero.assign(data.hero);
    deck.assign(data.deck);
    this.loadprograms(deck);
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

  initialize(){}

  //TODO use on game lost
  //TODO use on game won
  clear(){localStorage.setItem('infojack-save','');}
}

export var save=new Save();
