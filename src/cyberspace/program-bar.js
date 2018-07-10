import {deck} from '../modules/deck';
import {getactive as getsystem} from '../modules/cyberspace/system';
import {console} from '../modules/cyberspace/console';
import {inject} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';
import {refresh as refreshcyberspace} from './infojack-cyberspace';

@inject(BindingSignaler)
export class ProgramBar{
  constructor(BindingSignaler) {
    this.signals=BindingSignaler;
    this.collapsed=true;
    deck.sort();
  }
  
  attached(){this.refresh();}
  
  refresh(){
    this.programs=deck.programs.slice();
    this.load=deck.memoryused;
    this.totalload=deck.memory;
    this.system=getsystem();
    refreshcyberspace();
    this.signals.signal('update-program-bar');
  }
  
  toggle(){this.collapsed=!this.collapsed;}
  
  isloaded(program){
    return deck.loaded.indexOf(program)>=0;
  }
  
  geticonclass(program){
    return this.isloaded(program)?"loaded":"unloaded";
  }
  
  doload(program){
    let result=program.load(this.system);
    this.refresh();
    return result;
  }
  
  dounload(program){
    let result=program.unload(this.system);
    this.refresh();
    return result;
  }
  
  run(program){
    //TODO skill roll
    if(!this.isloaded(program)){
      console.print('Load '+program.name+' first...');
    }else if(program.run(this.system)){
      //TODO ap cost
      //TODO duration callback or check
    }
    this.refresh();
  }
}
