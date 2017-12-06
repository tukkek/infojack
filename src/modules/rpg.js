//TODO save RNG if possble
class Rpg{
    constructor(){
    }
    
    roll(min,max){
        return Math.floor((Math.random()*max)+min); 
    }
    
    d(dice,sides){
        let sum=0;
        for(let i=0;i<dice;i++){
            sum+=this.roll(1,sides);
        }
        return sum;
    }
    
    d20(){
        return d(1,20);
    }
}

export var rpg=new Rpg();
