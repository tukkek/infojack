import {hero,sign} from './character/character'

var OK='';
var MEMORYUPGRADE=[+10,+5,+5,+5];

class Deck{
  constructor(){
    this.memory=10;
    this.storage=20;
    this.deckgrade=1;
    this.memorygrade=0;
    this.storagegrade=0;
    this.stealthgrade=0;
  }
  
  upgrade(checkgrade,currentgrade,purchasedc,installdc,apply){
    if(currentgrade==4)
      return 'Already at maximum grade.';
    let upgrade=currentgrade+1;
    if(checkgrade&&upgrade>this.deckgrade) 
      return 'Requires a deck upgrade.';
    purchasedc+=2*(upgrade-1);
    if(hero.wealth<purchasedc-10) 
      return 'Requires '+(purchasedc-10)+'¥.';
    installdc+=1*(upgrade-1);
    if(hero.getelectronics()<installdc-10) 
      return 'Requires electronics '+sign(installdc-10)+'.';
    if(apply&&!hero.buy(purchasedc))
      return 'Unexpected not buy error.';
    return OK;
  }
  
  upgradedeck(apply){
    let result=this.upgrade(false,this.deckgrade,10,12,apply);
    if(result==OK&&apply) this.deckgrade+=1;
    return result;
  }
  
  upgradememory(apply){
    let result=
      this.upgrade(true,this.memorygrade,9,14,apply);
    if(result==OK&&apply){
      this.memory+=MEMORYUPGRADE[this.memorygrade];
      this.memorygrade+=1;
    }
    return result;
  }
  
  upgradestorage(apply){
    let result=
      this.upgrade(true,this.storagegrade,8,14,apply);
    if(result==OK&&apply){
      this.storage+=10;
      this.storagegrade+=1;
    }
    return result;
  }
  
  upgradestealth(apply){
    let result=
      this.upgrade(true,this.stealthgrade,10,12,apply);
    if(result==OK&&apply) this.stealthgrade+=1;
    return result;
  }
  
  assign(data){
    for(let key in data){
      if(key in this){
        this[key]=data[key];
      }
    }
  }
}

export var deck=new Deck();
