class Rpg{
    constructor(){}
    
    roll(min,max){
        return this.r(min,max);
    }
    
    r(min,max){
      return Math.floor((Math.random()*max)+min);
    }
    
    d(dice,sides){
        let sum=0;
        for(let i=0;i<dice;i++){
            sum+=this.roll(1,sides);
        }
        return sum;
    }
    
    choose(list){
      return list[this.roll(0,list.length-1)];
    }
    
    chancein(n){
      return this.r(1,Math.floor(n))==1;
    }
    
    shuffle(array){
      for (let i=array.length-1;i>0;i--) {
        let j=this.r(0,i+1);
        let swap=array[i];
        array[i]=array[j];
        array[j]=swap;
      }
      return array;
    }
    
    randomize(amount){
      return this.r(1,amount)-this.r(1,amount);
    }

    d20(){
        return d(1,20);
    }
}

export var rpg=new Rpg();
