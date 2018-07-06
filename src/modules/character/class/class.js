/* TODO 
 * - for advanced classes, have edge dice as part of levelup
 */

import {checkskills} from '../skill';
import {rpg} from '../../rpg';
import {webcrawler} from './webcrawler';

export class Class{
    constructor(){this.talents=new Map();}
    
    advance(character){
        let level=character.classes[this.name];
        if(!level) level=0;
        level+=1;
        if(level>10) {
            throw 'Cannot advance past level 10!';
        }
        character.level+=1;
        this.levelup(character,level);
        character.classes[this.name]=level;
    }
    
    upgradehp(character){
      if(character.level==1){
          character.maxhp=this.hd;
          character.hp=character.maxhp;
      }else{
          let hp=Math.round((1+this.hd)/2);
          character.maxhp+=hp;
          character.hp+=hp;
      }
    }
    
    upgraderanks(character,classlevel){
      let ranks=this.ranks+
        character.getmodifier(character.intelligence);
      character.ranks+=Math.max(1,ranks);
      if(character.level==1) character.ranks*=4;
      if(classlevel==1) for(let s of this.skills)
        character.addclassskill(s);
    }
    
    levelup(character,classlevel){
      for(let stat of ['bab','fort','ref','will','defence'])
        this.upgradestat(classlevel,stat,character);
      this.upgradeedgedice(classlevel,character);
      this.upgradereputation(character,classlevel);
      this.upgradehp(character);
      this.upgraderanks(character,classlevel);
      if(character.level%3==0) character.newfeats+=1;
      if(character.level%4==0) character.pointextra+=1;
      //TODO may want to do this through external means to make it explicit to the player (as mission payment rates for example):
      if(character.level>1) character.upgradewealth(); 
    }
    
    upgradestat(level,stat,character){
        let last=level>1?this[stat][level-2]:0;
        let current=this[stat][level-1];
        character[stat]+=current-last;
    }
    
    upgradeedgedice(level,character){
        let target=this.edgedice[level-1].split('d');
        target=[parseInt(target[0]),parseInt(target[1])];
        if(target[0]>character.edgedice[0]||
          (target[0]==character.edgedice[0]&&
            target[1]>=character.edgedice[1]))
              character.edgedice[0]=target[0];
              character.edgedice[1]=target[1];
        if(character.level==1) 
          character.edge+=character.edgedice[0];
    }
    
    upgradereputation(character,level){
        if(level==1){
            if(this.reputation[0]>0){
                //TODO boost
            }
        }else if(this.reputation[level-1]>
                this.reputation[level-2]){
            //TODO boost
        }
    }
    
    check(skills){
      return checkskills(skills);
    }
}

Class.classes=new Map();
