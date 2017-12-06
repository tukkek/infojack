export feats=new Map();

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

class Educated{
    constructor(){
        super('Educated','+3 to Techonology rolls');
    }
}

class Meticulous{
    constructor(){
        super('Meticulous','+2 to Forgery and Search rolls');
    }
}

class Stealthy{
    constructor(){
        super('Stealthy','+3 to Stealth rolls');
    }
}

class Studious{
    constructor(){
        super('Studious','+2 to Decrypt and Research rolls');
    }
}

class Trustworthy{
    constructor(){
        super('Trustworthy','+3 to Information rolls');
    }
}

for(let feat of [
    new Educated(),
    new Meticulous(),
    new Stealthy(),
]) feats.set(feat.name.toLowerCase(),feat);
