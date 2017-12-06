//TODO needs to boost Character#ranks with int

import {hero,costs} from '../modules/characters';
import {Save} from '../modules/save';
import {inject} from 'aurelia-framework';

/* TODO add difficulty modes */
@inject(hero,costs,Save)
export class CharacterAbilities {
    constructor(hero,costs,save) {
        this.hero=hero;
        this.costs=costs;
        this.save=save;
        this.strength=-1;
    }
    
    attached(){
        this.strength=this.hero.strength;
        this.dexterity=this.hero.dexterity;
        this.constitution=this.hero.constitution;
        this.intelligence=this.hero.intelligence;
        this.wisdom=this.hero.wisdom;
        this.charisma=this.hero.charisma;
        this.pointbuy=this.hero.pointbuy;
        this.pointextra=this.hero.pointextra;
    }
    
    detached(){
        let clone={};
        Object.assign(clone,this);
        delete clone.costs;
        delete clone.hero;
        delete clone.save;
        this.hero.assign(clone);
        this.save.save();
    }

    upgrade(ability){
        let current=this[ability];
        if(current==18){
            return;
        }
        if(this.pointextra>0){
            this.pointextra-=1;
            this[ability]+=1;        
        }else if(this.buy(current)){
            this[ability]+=1;        
        }else return;
        if(ability=='intelligence'){
            this.hero.ranks+=this.hero.level==1?4:1;
        }
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
