import {Talent} from '../feat'; 
import {Class} from './class'; 

class TheWebIsAlive extends Talent{
  constructor(){
    super('The web is alive',
      'Adds Will to Perception rolls (requires level 3 and Power of Belief)');
  }
  
  validate(character){
    return super.validate(character)&&
      character.level>=3&&
      character.hasfeat('power of belief');
  }
}

class SpecializedEquipment extends Talent{
  constructor(){
    super('Specialized equipment',
      '+1 to hacking rolls, +5 speed, safe disconnections (requires 4 in hacking, electronics and technology)');
  }
  
  validate(character){
    return super.validate(character)
      &&character.hacking>=4
      &&character.electronics>=4
      &&character.technology>=4;
  }
  
  apply(character){
    super.apply(character);
    character.speed+=5;
  }
}

class Webcrawler extends Class{
    constructor(){
        super();
        this.name='Webcrawler';
        this.skills=this.check(['Hacking', 'Electronics', 'Decryption', /*'Disable device',*/ 'Forgery', 'Technology', 'Profession', 'Research', 'Technology', 'Search']);
        this.hd=4;
        this.ranks=7;
        this.bab=[0,1,1,2,2,3,3,4,4,5];
        this.fort=[0,0,1,1,1,2,2,2,3,3];
        this.ref=[1,2,2,2,3,3,4,4,4,5];
        this.will=[1,2,2,2,3,3,4,4,4,5];
        this.defence=[1,1,2,2,2,3,3,3,4,4];
        this.reputation=[0,1,1,2,2,3,3,4,4,5];
        this.edgedice=['1d4','1d4','2d4','2d6','2d6','3d6','3d8','3d8','4d8','4d10'];
        let talents=[
          new Talent('Hackmastery',
            '+2 to all damage inflicted'),
          new Talent('Phreakmastery',
            'Safe connections, +1 against traces'),
          new Talent('Power of belief',
            '+1 to bluff, decryption, search and stealth'),
          new SpecializedEquipment(),
          new TheWebIsAlive(),
          ];
        for(let t of talents)
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
Class.classes.set(webcrawler.name,webcrawler);
