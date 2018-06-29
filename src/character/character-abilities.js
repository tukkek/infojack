//TODO needs to boost Character#ranks with int

import {hero,costs,FULL} from '../modules/character/character';

/* TODO add difficulty modes */
export class CharacterAbilities {
    constructor() {}
    
    attached(){
        this.full=FULL;
        this.strength=hero.strength;
        this.dexterity=hero.dexterity;
        this.constitution=hero.constitution;
        this.intelligence=hero.intelligence;
        this.wisdom=hero.wisdom;
        this.charisma=hero.charisma;
        this.pointbuy=hero.pointbuy;
        this.pointextra=hero.pointextra;
    }
    
    detached(){
        let clone={};
        Object.assign(clone,this);
        delete clone.costs;
        delete clone.hero;
        hero.assign(clone);
    }

    upgrade(ability){
        let current=this[ability];
        if(current==18) return;
        let raised=this[ability]+1;
        if(this.pointextra>0){
            this.pointextra-=1;
            this[ability]=raised;
        }else if(this.buy(current)){
            this[ability]=raised;
        }else return;
        if(ability=='intelligence'&&raised%2==0){
            hero.ranks+=hero.level==1?4:1;
        }
    }
    
    buy(current){
        let next=current+1;
        let cost=costs[next]-costs[current];
        if(this.pointbuy>=cost){
            this.pointbuy-=cost;
            return true;
        }
        return false;
    }
}
