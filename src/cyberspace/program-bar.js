import {deck} from '../modules/deck';
import {console} from '../modules/cyberspace/console';
import {inject} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';
import {refresh as refreshcyberspace} from './infojack-cyberspace';
import {sound} from '../modules/sound';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Connect,Refresh} from '../messages';

@inject(BindingSignaler,EventAggregator)
export class ProgramBar{
  constructor(BindingSignaler,EventAggregator) {
    this.signals=BindingSignaler;
    this.messaging=EventAggregator;
    let me=this;
    this.messaging.subscribe(Connect,function(e){
      me.system=e.system;
      me.collapsed=true;
      deck.sort();
      me.refresh(false);
    });
    this.messaging.subscribe(Refresh,function(e){
      if(e.target!='ProgramBar') return;
      me.refresh(false);
    });
  }

  gethpcolor(hp){
    let green=[124,252,0];
    let red=[255,0,0];
    let r=red[0]+hp*(green[0]-red[0]);
    let g=red[1]+hp*(green[1]-red[1]);
    let b=red[2]+hp*(green[2]-red[2]);
    return 'rgb('+r+','+g+','+b+')';
  }

  //not all data needs to be update every single turn
  //prevent a cyberspace<->program bar refresh loop
  refreshdetails(){
    let c=this.system.player.character;
    let hp=c.hp/c.maxhp;
    this.hpcolor='color:'+this.gethpcolor(hp)+';';
    this.hp=Math.round(100*hp);
    this.load=deck.memoryused;
    this.totalload=deck.memory;
    let load=deck.getload();
    if(load==0) this.loadcolor='white';
    else if(load==1) this.loadcolor='orange';
    else this.loadcolor='red';
    this.loadcolor='color:'+this.loadcolor+';';
    this.freestorage=deck.storage-deck.storageused;
  }

  refresh(turn=true){
    this.programs=deck.programs.slice();
    this.refreshdetails();
    this.signals.signal('update-program-bar');
    if(turn) refreshcyberspace();
  }

  toggle(){this.collapsed=!this.collapsed;}

  isloaded(program){
    return deck.loaded.indexOf(program)>=0;
  }

  geticonclass(program){
    return this.isloaded(program)?"loaded":"unloaded";
  }

  doload(program){
    let load=program.load(this.system);
    sound.play(load?sound.LOAD:sound.ERROR);
    this.refresh();
    return load;
  }

  dounload(program){
    let unload=program.unload(this.system);
    if(unload) sound.play(sound.UNLOAD);
    this.refresh();
    return unload;
  }

  run(program){
    //TODO skill roll
    if(!this.isloaded(program)){
      console.print('Load '+program.name+' first...');
    }else if(program.run(this.system)){
      //TODO duration callback and skill check
    }
    this.refresh();
  }
}
