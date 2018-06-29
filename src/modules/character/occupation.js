import {skills,checkskills} from './skill';

//TODO feats
class Occupation{
    constructor(wealth,skillsp){
        this.wealth=wealth;
        this.skills=skillsp;
        checkskills(skillsp);
    }
}

export var occupations={};

occupations.adventurer=new Occupation(+1,['Bluff','Technology','Stealth','Perceive','Medicine']);
