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
        this.levelup(character,level);
        character.classes[this.name]=level;
    }
    
    levelup(c,classlevel){
        c.level+=1;
        for(let stat of ['bab','fort','ref','will','defence'])
          this.upgradestat(classlevel,stat,c);
        this.upgradeedgedice(classlevel,c);
        this.upgradereputation(classlevel);
        c.ranks+=Math.max(
          1,this.ranks+c.getmodifier(c.intelligence));
        if(c.level==1){
            c.maxhp=this.hd;
            c.hp=c.maxhp;
            c.edge+=c.edgedice[0];
            c.ranks*=4;
            this.addskills(c);
        }else{
            let hp=rpg.d(1,this.hd);
            c.maxhp+=hp;
            c.hp+=hp;
            if(c.level%3==0) c.newfeats+=1;
            if(c.level%4==0) c.pointextra+=1;
        }
    }
    
    addskills(c){
        for(let s of this.skills){
            c.addclassskill(s);
        }
    }
    
    upgradestat(level,stat,character){
        let last=level>1?this[stat][level-2]:0;
        let current=this[stat][level-1];
        character[stat]+=current-last;
    }
    
    upgradeedgedice(level,c){
        let target=
            this.edgedice[level-1].split('d');
        target=[parseInt(target[0]),
            parseInt(target[1])];
        if(target[0]>c.edgedice[0]||
            (target[0]==c.edgedice[0]&&
                target[1]>=c.edgedice[1])){
            c.edgedice[0]=target[0];
            c.edgedice[1]=target[1];
        }
    }
    
    upgradereputation(level){
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
