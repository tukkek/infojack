import {rpg} from '../../rpg.js';
import {Node} from './node.js';
import {Alarm} from '../avatar/alarm.js';
import {Entry} from '../avatar/entry.js';
import {Map} from '../avatar/map.js';
import {Terminal} from '../avatar/terminal.js';

var FUNCTIONS=4;

export class Cpu extends Node{
  setmain(){
    this.enter(new Alarm(this));
    this.enter(new Entry(this));
    this.enter(new Map(this));
    this.enter(new Terminal(this));
  }
  
  generate(){
    while(this.avatars.length==0){
      if(RPG.chancein(FUNCTIONS)) 
        this.enter(new Alarm(this));
      if(RPG.chancein(FUNCTIONS)) 
        this.enter(new Entry(this));
      if(RPG.chancein(FUNCTIONS)) 
        this.enter(new Map(this));
      if(RPG.chancein(FUNCTIONS)) 
        this.enter(new Terminal(this));
    }
  }
}
