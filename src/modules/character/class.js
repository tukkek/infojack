/* TODO 
 * - for advanced classes, have edge dice as part of levelup
 * - Webcrawler talents (use hero.feats)
 *  - Hackmastery (+2 to all damage inflicted)
 *  - Phreakmastery (safe connections, +1 against traces)
 *  - Power of belief (+1 to bluff, decryption, stealth and search rolls)
 *  - The web is alive (add your Will to Perception rolls, requires level 3 and Power of belief)
 *  - Specialized equipment (+1 to hacking rolls, +5 speed, safe disconnections, requires hacking 4, electronics 4 and technology 4)
 */

import {Talent} from './feat';
import {checkskills} from './skill';
import {rpg} from '../rpg';

class Class{
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
}

class Webcrawler extends Class{
    constructor(){
        super();
        this.name='Webcrawler';
        this.skills=checkskills(['Hacking', 'Electronics', 'Decryption', /*'Disable device',*/ 'Forgery', 'Technology', 'Profession', 'Research', 'Technology', 'Search']);
        this.hd=4;
        this.ranks=7;
        this.bab=[0,1,1,2,2,3,3,4,4,5];
        this.fort=[0,0,1,1,1,2,2,2,3,3];
        this.ref=[1,2,2,2,3,3,4,4,4,5];
        this.will=[1,2,2,2,3,3,4,4,4,5];
        this.defence=[1,1,2,2,2,3,3,3,4,4];
        this.reputation=[0,1,1,2,2,3,3,4,4,5];
        this.edgedice=['1d4','1d4','2d4','2d6','2d6','3d6','3d8','3d8','4d8','4d10'];
        for(let t of [new Talent('Test','dummy'),])
          this.talents.set(t.name,t);
    }
    
    levelup(character,classlevel){
        super.levelup(character,classlevel);
        let level=character.level;
        if(level==1||level==3||level==6||level==9){
            character.talent+=1;
        }else if(level==4||level==7){
            character.ranks+=1;
        }else if(level==5||level==8){
            character.contacts+=1;
        }else if(level==10){
            character.wealth+=5;
            //TODO +5 reputation to law and hackers
        }
    }
}

export var webcrawler=new Webcrawler();
export var classes=[webcrawler,];
export var classmap=new Map();

for(let c of classes) classmap.set(c.name,c);
