var PREFIX='./sounds/';

var queue=[];
var running=false;

class Sound{
  constructor(){
    this.ALERTCANCEL='CancelAlert.wav';
    this.ALERTRED='RedAlert.wav';
    this.ALERTYELLOW='YellowAlert.wav';
    this.ATTACK='9mmPistol.wav';
    this.CONNECT='Dialup.wav';
    this.CRASH='Spike.wav';
    this.DISCONNECTED='EndOfLine.wav';
    this.ERROR='Computer Error Alert-SoundBible.com-783113881.mp3';
    this.ICEATTACK='Pulse1.wav';
    this.ICEENTER='ICEEnter.wav';
    this.ICELEAVE='ICEEnter.wav';
    this.LOAD='Misc2.wav';
    this.MOVE='Move.wav';
    this.QUERY='ICELeave.wav';
    this.UNLOAD='Misc5.wav';
  }
  
  process(){
    if(queue.length==0){
      running=false;
      return;
    }
    running=true;
    let a=new Audio(queue.shift());
    let me=this;
    a.onended=function(){me.process();};
    a.play();
  }
    
  play(file){
    file=PREFIX+file;
    if(queue.indexOf(file)>=0) return;
    queue.push(file);
    if(!running) this.process();
  }
}

export var sound=new Sound();
