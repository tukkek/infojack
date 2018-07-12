class Message{
  constructor(text,system){
    this.text=text;
    this.alert=system.alert;
  }
}

class Console{
  constructor(){
    this.messages=[];
    this.system=false;
  }
  
  print(message){
    if(!this.system) throw 'System not set';
    this.messages.push(
      new Message(message,this.system));
  }
  
  next(){
    return this.messages.shift();
  }
  
  log(...args){window.console.log(args);}
}

export var console=new Console();
