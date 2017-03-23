/* TODO add difficulty modes */
export class CharacterAbilities {
    constructor() {
        this.strength=7;
        this.dexterity=7;
        this.constitution=7;
        this.intelligence=7;
        this.wisdom=7;
        this.charisma=7;
        this.pointbuy=15+4*6;
        this.pointextra=3;
        this.costs={
            7:-4,
            8:-2,
            9:-1,
            10:0,
            11:1,
            12:2,
            13:3,
            14:5,
            15:7,
            16:10,
            17:13,
            18:17,
        }
    }

    upgrade(ability){
        let current=this[ability];
        if(current==18){
            return;
        }
        if(this.pointextra>0){
            this.pointextra-=1;
            this[ability]+=1;        
            this.save();
        }else if(this.buy(current)){
            this[ability]+=1;        
            this.save();
        }
    }
    
    save(){
        //TODO
    }
    
    buy(current){
        let next=current+1;
        let cost=this.costs[next]-this.costs[current];
        if(this.pointbuy>=cost){
            this.pointbuy-=cost;
            return true;
        }
        return false;
    }
}
