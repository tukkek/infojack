import {rpg} from '../../rpg';
import {Node} from './node';
import {Alarm} from '../avatar/secure/alarm';
import {Entry} from '../avatar/secure/entry';
import {Shutdown} from '../avatar/secure/shutdown';
import {Map} from '../avatar/map';
import {Terminal} from '../avatar/secure/terminal';

var FUNCTIONS=4;

export class Cpu extends Node{
  constructor(x,y,system,main=false){
    super(x,y,system,'cpu');
    this.priority=main?3:2;
    if(main){
      new Alarm(this.system).enter(this);
      new Entry(this.system).enter(this);
      new Map(this.system).enter(this);
      new Terminal(this.system).enter(this);
      if(rpg.chancein(Math.round(20/this.system.level)))
        new Shutdown(this.system).enter(this);
    }
  }
  
  generate(){
    while(this.avatars.length==0){
      if(rpg.chancein(FUNCTIONS)) 
        new Alarm(this.system).enter(this);
      if(rpg.chancein(FUNCTIONS)) 
        new Entry(this.system).enter(this);
      if(rpg.chancein(FUNCTIONS)) 
        new Map(this.system).enter(this);
      if(rpg.chancein(FUNCTIONS)) 
        new Shutdown(this.system).enter(this);
    }
  }
}
