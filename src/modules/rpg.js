class Rpg{
    constructor(){}
    
    roll(min,max){
        return Math.floor((Math.random()*max)+min); 
    }
    
    r(min,max){
      return this.roll(min,max);
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
      return this.r(1,n)==1;
    }
}

export var rpg=new Rpg();
