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
    }
    
    assign(data){
        Object.assign(this,data);
    }
}

export var hero=new Character();

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
