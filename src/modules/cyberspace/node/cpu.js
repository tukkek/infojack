import {rpg} from '../../rpg';
import {Node} from './node';
import {Alarm} from '../avatar/secure/alarm';
import {Entry} from '../avatar/secure/entry';
import {Map} from '../avatar/map';
import {Terminal} from '../avatar/secure/terminal';

var FUNCTIONS=4;

export class Cpu extends Node{
  constructor(x,y,system){
    super(x,y,system,'cpu');
    this.priority=2;
  }
  
  setmain(){
    this.enter(new Alarm(this.system));
    this.enter(new Entry(this.system));
    this.enter(new Map(this.system));
    this.enter(new Terminal(this.system));
  }
  
  generate(){
    while(this.avatars.length==0){
      if(rpg.chancein(FUNCTIONS)) 
        this.enter(new Alarm(this.system));
      if(rpg.chancein(FUNCTIONS)) 
        this.enter(new Entry(this.system));
      if(rpg.chancein(FUNCTIONS)) 
        this.enter(new Map(this.system));
    }
  }
}
