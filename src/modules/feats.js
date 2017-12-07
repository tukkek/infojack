export var feats=new Map();

class Feat{
    constructor(name,description){
        this.name=name;
        this.description=description;
    }
    
    validate(character){
        return !character.hasfeat(this);
    }
    
    apply(character){
        character.addfeat(this);
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

for(let feat of [
    new Educated(),
    new Meticulous(),
    new Stealthy(),
    new Stealthy(),
    new Studious(),
    new Trustworthy(),
]) feats.set(feat.name.toLowerCase(),feat);
