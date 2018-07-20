export var feats=new Map();

export class Feat{
    constructor(name,description){
        this.name=name;
        this.description=description;
        this.talent=false;
    }
    
    validate(character){
        return !character.hasfeat(this);
    }
    
    apply(character){
        character.addfeat(this);
    }
}

export class Talent extends Feat{
  constructor(name,description){
    super(name,description);
    this.talent=true;
  }
}

class Educated extends Feat{
    constructor(){
        super('Educated','+3 to Techonology rolls');
    }
}

class Meticulous extends Feat{
    constructor(){
        super('Meticulous','+2 to Forgery and Search rolls');
    }
}

class Stealthy extends Feat{
    constructor(){
        super('Stealthy','+3 to Stealth rolls');
    }
}

class Studious extends Feat{
    constructor(){
        super('Studious','+2 to Decrypt and Research rolls');
    }
}

class Trustworthy extends Feat{
    constructor(){
        super('Trustworthy','+3 to Information rolls');
    }
}

class ImprovedInitiative extends Feat{
   constructor(){
        super('Improved initiative',
              '+4 to initiative rolls');
    }
}

class Toughness extends Feat{
  constructor(){
    super('Toughness',
      '+3 hit points (may be taken multiple times)');
  }
  validate(character){return true;}
  apply(character){
    character.maxhp+=3;
    character.hp+=3;
  }
}

class Windfall extends Feat{
  constructor(){
    super('Windfall',
      '+3 wealth (may be taken multiple times)');
  }
  validate(character){return true;}
  apply(character){character.wealth+=3;}
}

for(let feat of [
    new Educated(),
    new ImprovedInitiative(),
    new Meticulous(),
    new Stealthy(),
    new Stealthy(),
    new Studious(),
    new Toughness(),
    new Trustworthy(),
    new Windfall(),
]) feats.set(feat.name.toLowerCase(),feat);
