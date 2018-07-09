//TODO convert primary BAB elsewhere

import {occupations} from './occupation';
import {webcrawler} from './class/webcrawler';
import {skills} from './skill';
import {rpg} from '../rpg';
import environment from '../../environment';

var ABILITYPOINTS=
  Math.round((15+4*6)/(environment.fullattributes?1:2));

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
    constructor(name){
      this.name=name;
      this.image=rpg.r(0,environment.playeravatars-1);
      this.hp=0;
      this.maxhp=0;
      this.strength=7;
      this.dexterity=7;
      this.constitution=7;
      this.intelligence=7;
      this.wisdom=7;
      this.charisma=7;
      this.pointbuy=ABILITYPOINTS;
      this.pointextra=0;
      this.wealth=5; //average of 2d4 to prevent scumming
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
      this.speed=30;
      this.talent=0;
      if(environment.extratalents)
        this.talent+=environment.extratalents;
      this.contacts=0;//TODO
      this.feats=[];
      this.newfeats=2;
      for(let s of skills.values()){
        this[s.name.replace(' ','').toLowerCase()]=0;
      }
    }

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
    
    connect(){
        let avatar=new Character();
        Object.assign(avatar,this);
        if(this.classes['Webcrawler']){
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
        if(feat&&this.hasfeat(feat)) ranks+=featbonus;
        ranks=ranks+this.getmodifier(ability);
        return ranks;
    }
    
    getbluff(){
      return this.getskill(this.bluff,this.charisma,'power of belief',1);
    }
    
    getconcentration(){
        return this.getskill(
          this.concentration,this.constitution,false,0);
    }
    
    getdecryption(){
      let decryption=this.getskill(
        this.decryption,this.intelligence,'studious',2);
      if(this.hasfeat('power of belief')) decryption+=1;
      return decryption;
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
          this.hacking,this.intelligence,
          'specialized equipment',1);
    }
    
    getperceive(){
        return this.getskill(this.perceive,this.wisdom,false,0);
    }
    
    getmedicine(){
        return this.getskill(this.medicine,this.wisdom,false,0);
    }
    
    getstealth(){
      let stealth=this.getskill(
        this.stealth,this.dexterity,'stealthy',3);
      if(this.hasfeat('power of belief')) stealth+=1;
      return stealth;
    }
    
    getprofession(){
      return this.getskill(
        this.profession,this.wisdom,false,0);
    }
    
    getresearch(){
        return this.getskill(
          this.research,this.intelligence,'studious',2);
    }
    
    getsearch(){
      let search=this.getskill(
        this.search,this.intelligence,'meticulous',2);
      if(this.hasfeat('power of belief')) search+=1;
      return search;
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
    
    getmelee(){
      return this.bab+this.getmodifier(this.strength);
    }
    
    getranged(){
      return this.bab+this.getmodifier(this.dexterity);
    }
    
    price(purchasedc){
      let price=purchasedc>=15?1:0;
      let difference=purchasedc-this.wealth;
      if(difference<1) return price;
      if(difference<=10) return price+1;
      price+=difference-10;
      return price>12?12:price; 
    }
    
    /*TODO gather information takes 1 hour per purchasedc
     * use this to find items of interest (1 store per type of buy: programs, deck, cyber) and create as many options until the total purchasedc is equal or bigger than 16 in a day (or 24h with manual sleeping/tired routines). Each gather information roll returns the maximum purchasedc of the found object (or manybe result-10).
     * */
    buy(purchasedc){
      if(10+this.wealth<purchasedc) return false;
      this.wealth-=this.price(purchasedc);
      if(this.wealth<0) this.wealth=0;
      return true;
    }
    
    /*-3 for selling, -3 for illegal*/
    sell(purchasedc){
      let price=this.price(purchasedc-6);
      this.wealth+=price;
      return price;
    }
    
    /* As per level-up rules, in Infojack may be used to
     * represent mission payment values or similar. TODO */
    upgradewealth(){
      let taketen=10+this.getprofession();
      if(taketen<this.wealth) return 0;
      let wealth=1;
      taketen-=this.wealth;
      while(taketen>=5){
        wealth+=1;
        taketen-=5;
      }
      return wealth;
    }
}

export function sign(n){return n>=0?'+'+n:n;}

export var hero=new Character('Player1');
hero.setoccupation(occupations.adventurer);
webcrawler.advance(hero); //becomes level 1

//TODO actually buy these programs once they're ready
console.log('Initial wealth: '+hero.wealth);
console.log('Purchase deck: '+hero.price(10));
console.log('Purchase flicker: '+hero.price(14));
console.log('Purchase blade: '+hero.price(9));
console.log('Purchase cloak: '+hero.price(9));
hero.buy(10);hero.buy(9);hero.buy(9);hero.buy(14);//TODO CHECK
console.log('Final wealth: '+hero.wealth);
