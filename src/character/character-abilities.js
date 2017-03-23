/* TODO add difficulty modes */
export class CharacterAbilities {
    constructor() {
        this.strength=8;
        this.dexterity=8;
        this.constitution=8;
        this.intelligence=8;
        this.wisdom=8;
        this.charisma=8;
        this.pointbuy=15;
        this.pointextra=0;
    }
    
    upgrade(ability){
        if(this[ability]==8&&amount<0){
            return;
        }
        this[ability]+=amount;
    }
}
