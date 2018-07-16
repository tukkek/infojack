import {occupations} from './occupation';
import {webcrawler} from './class/webcrawler';
import {skills} from './skill';
import {feats} from './feat';
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
    if(environment.wealth) this.wealth=environment.wealth;
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
    for(let con=this.constitution+1;
      con<=avatar.constitution;con++)
        if(con%2==0) avatar.maxhp+=1;
    avatar.hp=avatar.maxhp;
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
  
  addfeat(f){this.feats.push(f);}
  
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
      return this.getskill(
        this.perceive,this.wisdom,false,0);
  }
  
  getmedicine(){
      return this.getskill(
        this.medicine,this.wisdom,false,0);
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
  
  sell(purchasedc){ /*-3 for selling, -3 for illegal*/
    let price=this.price(purchasedc-3-3);
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
  
  possess(){
    let letter=this.name[this.name.length-1].toLowerCase();
    let name=this.name+"'";
    if(letter!='s') name+='s';
    return name;
  }
  
  move(){return .5*30/this.speed;}
  
  updateranks(ability){//call after adding 1 ability point
    if(ability=='intelligence'&&this[ability]%2==0)
      this.ranks+=this.level==1?4:1;
  }
  
  learnskill(skill){
    if(this[skill]===undefined)
      throw 'Unknown skill '+skill;
    while(this[skill]<this.level+3&&this.ranks>0){
      this[skill]+=1;
      this.ranks-=1;
    }
  }
  
  learnability(ability){
    if(this.ranks==0)
      console.log('Learn skills after abilities!');
    if(this[ability]===undefined)
      throw 'Unknown ability '+ability;
    while(this.pointextra>0){
      this[ability]+=1;
      this.pointextra-=1;
      this.ugpraderanks(ability);
    }
  }
  
  learnfeat(name){
    let feat=feats.get(name.toLowerCase());
    if(!feat) throw 'Unkwnon feat: '+name;
    if(this.newfeats==0) return false;
    if(!feat.validate(this)) throw 'Invalid feat: '+name;
    this.addfeat(feat);
  }
  
  levelup(){
    if(this.level==10) return false; //TODO
    webcrawler.advance(hero);
    return true;
  }
}

export function sign(n){return n>=0?'+'+n:n;}

export var hero=new Character('Player1');
hero.setoccupation(occupations.adventurer);
hero.levelup(); //becomes level 1
hero.buy(10);//basic deck
//TODO ideal program list: flicker,blade,cloak
