//TODO convert primary BAB elsewhere

import {occupations} from './occupation';
import {webcrawler} from './class';
import {skills} from './skill';
import {rpg} from '../rpg';

export var FULL=false; //use physical abilities?
var POINTS=Math.round((15+4*6)/(FULL?1:2));
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

export class Character{
    constructor(){
        this.hp=0;
        this.maxhp=0;
        this.strength=7;
        this.dexterity=7;
        this.constitution=7;
        this.intelligence=7;
        this.wisdom=7;
        this.charisma=7;
        this.pointbuy=POINTS;
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
        this.init=0;
        this.talent=0;
        this.contacts=0;//TODO
        this.feats=[];
        this.newfeats=2;
        for(let s of skills.values()){
            this[s.name.replace(' ','').toLowerCase()]=0;
        }
    }

    /* makes sure not to write new data */
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
        let avatar=new Character();
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
    
    getranks(name){
        return this[name.replace(' ','').toLowerCase()];
    }
    
    setranks(name,value){
        this[name.replace(' ','').toLowerCase()]=value;
    }
    
    hasfeat(f){
        f=f.name||f;
        for(let feat of this.feats)
          if(feat.name.toLowerCase()==f.toLowerCase())
            return feat;
        return false;
    }
    
    addfeat(f){
        this.feats.push(f);
    }
    
    getskill(ranks,ability,feat,featbonus){
      console.log(1,ranks);
        if(feat&&this.hasfeat(feat)) ranks+=featbonus;
      console.log(2,ranks);
      ranks=ranks+this.getmodifier(ability);
      console.log(3,ranks);
        return ranks;
    }
    
    getbluff(){
        return this.getskill(this.bluff,this.charisma,false,0);
    }
    
    getconcentration(){
        return this.getskill(
          this.concentration,this.constitution,false,0);
    }
    
    getdecryption(){
        return this.getskill(
          this.decryption,this.intelligence,'studious',2);
    }
    
    getelectronics(){
        return this.getskill(
          this.electronics,this.intelligence,false,0);
    }
    
    getforgery(){
        return this.getskill(
          this.forgery,this.intelligence,'meticulous',2);
    }
    
    getinformation(){
        return this.getskill(
          this.information,this.charisma,'trustworthy',3);
    }
    
    gethacking(){
        return this.getskill(
          this.hacking,this.intelligence,false,0);
    }
    
    getperceive(){
        return this.getskill(this.perceive,this.wisdom,false,0);
    }
    
    getmedicine(){
        return this.getskill(this.medicine,this.wisdom,false,0);
    }
    
    getstealth(){
        return this.getskill(
          this.stealth,this.dexterity,'stealthy',3);
    }
    
    getprofession(){
        return this.getskill(this.profession,this.wisdom,false,0);
    }
    
    getresearch(){
        return this.getskill(
          this.research,this.intelligence,'studious',2);
    }
    
    getsearch(){
        return this.getskill(
          this.search,this.intelligence,'meticulous',2);
    }
    
    gettechnology(){
        return this.getskill(
          this.technology,this.intelligence,'educated',3);
    }
    
    getfortitude(){
      return this.fort+this.getmodifier(this.constitution);
    }
    
    getreflexes(){
      return this.ref+this.getmodifier(this.dexterity);
    }
    
    getwill(){
      return this.will+this.getmodifier(this.wisdom);
    }
    
    getinitiative(){
      let init=this.init+this.getmodifier(this.dexterity);
      if(this.hasfeat('improved initiative')) init+=4;
      return init;
    }
    
    getdefence(){
      return 10+this.defence+this.getmodifier(this.dexterity);
    }
}

export var hero=new Character();
hero.setoccupation(occupations.adventurer);
webcrawler.advance(hero); //becomes level 1