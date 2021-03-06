export var CRITICALHIT=9001;
export var CRITICALMISS=-CRITICALHIT;

class Rpg{
    constructor(){}
    
    r(min,max){
      return Math.floor(Math.random()*(max-min+1))+min;
    }
    
    d(dice,sides){
      let sum=0;
      for(let i=0;i<dice;i++){
          sum+=this.r(1,sides);
      }
      return sum;
    }
    
    choose(list){return list[this.r(0,list.length-1)];}
    
    chancein(n){return this.r(1,n)==1;}
    
    shuffle(array){
      for (let i=array.length-1;i>0;i--) {
        let j=this.r(0,i);
        let swap=array[i];
        array[i]=array[j];
        array[j]=swap;
      }
      return array;
    }
    
    randomize(amount){
      return this.r(1,amount)-this.r(1,amount);
    }
}

export var rpg=new Rpg();
