//TODO convert primary BAB elsewhere

import {occupations} from './occupations';
import {webcrawler} from './classes';
import {skills} from './skills';
import {rpg} from './rpg';

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
        this.feats=[];
        this.newfeats=2;
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
    
    hasfeat(f){
        f=f.name||f;
        for(let feat of this.feats) if(feat.name==f) return feat;
        return false;
    }
    
    addfeat(f){
        this.feats.push(f);
    }
    
    rollskill(ranks,feat,bonus){
        if(feat&&hasfeat(feat)) ranks+=bonus;
        return rpg.r(1,20)+ranks;
    }
    
    rollbluff(){
        return rollskill(this.bluff,false,0);
    }
    
    rolldecryption(){
        return rollskill(this.decryption,'studious',2);
    }
    
    rolleletronics(){
        return rollskill(this.eletronics,false,0);
    }
    
    rollforgery(){
        return rollskill(this.forgery,'meticulous',2);
    }
    
    rollinformation(){
        return rollskill(this.information,'trustworthy',3);
    }
    
    rollhacking(){
        return rollskill(this.hacking,false,0);
    }
    
    rollperceive(){
        return rollskill(this.perceive,false,0);
    }
    
    rollmedicine(){
        return rollskill(this.medicine,false,0);
    }
    
    rollstealth(){
        return rollskill(this.stealth,'stealthy',3);
    }
    
    rollprofession(){
        return rollskill(this.profession,fase,0);
    }
    
    rollresearch(){
        return rollskill(this.research,'studious',2);
    }
    
    rollsearch(){
        return rollskill(this.search,'meticulous',2);
    }
    
    rolltechnology(){
        return rollskill(this.technology,'educated',3);
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
