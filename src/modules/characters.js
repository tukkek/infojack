//TODO convert primary BAB elsewhere

import {occupations} from './occupations';
import {webcrawler} from './classes';
import {skills} from './skills';

export class Character{
    constructor(){
        this.strength=7;
        this.dexterity=7;
        this.constitution=7;
        this.intelligence=7;
        this.wisdom=7;
        this.charisma=7;
        this.pointbuy=15+4*6;
        this.pointextra=0;
        this.wealth=0;
        this.classskills=[];
        this.classes={};//holds levels
        this.level=0;
        this.ranks=0;
        this.bab=0;//hold only primary BAB
        this.edgedice=[0,0];//0d1
        this.edge=0;//current edge
        this.fort=0;
        this.ref=0;
        this.will=0;
        this.defence=0;
        this.talent=0;
        this.contacts=0;//TODO
        for(let s of skills.values()){
            this[s.name.replace(' ','').toLowerCase()]=0;
        }
    }

    //makes sure not to write new data
    assign(data){
        for(let key in data){
            if(key in this){
                this[key]=data[key];
            }
        }
    }
    
    setoccupation(occupation){
        this.wealth+=occupation.wealth;
        for(let s of occupation.skills){
            this.addclassskill(s);
        }
    }
    
    addclassskill(s){
        if(this.classskills.indexOf(s)<0){
            this.classskills.push(s);
        }
    }
    
    //TODO use
    connect(){
        let avatar={};
        Object.assign(avatar,this);
        if('Webcrawler' in this.classes){
            this.enhancecrawler(avatar);
        }
        return avatar;
    }
    
    enhancecrawler(avatar){
        avatar.strength=Math.max(
            avatar.strength,avatar.intelligence);
        avatar.dexterity=Math.max(
            avatar.dexterity,avatar.wisdom);
        avatar.constitution=Math.max(
            avatar.constitution,avatar.charisma);
        let level=this.classes['Webcrawler'];
        avatar.bab-=[0,1,1,2,2,3,3,4,4,5][level-1];
        avatar.bab+=level;
    }
    
    getmodifier(ability){
        if(ability%2==1){
            ability-=1;
        }
        return (ability-10)/2;
    }
    
    getskill(name){
        return this[name.replace(' ','').toLowerCase()];
    }
    
    setskill(name,value){
        this[name.replace(' ','').toLowerCase()]=value;
    }
}

export var hero=new Character();
hero.setoccupation(occupations.adventurer);
webcrawler.advance(hero); //becomes level 1

export var costs={
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
