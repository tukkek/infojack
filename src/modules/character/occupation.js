import {skills,checkskills} from './skill';

class Occupation{
  constructor(wealth,skillsp){
    this.wealth=wealth;
    this.skills=skillsp;
    checkskills(skillsp);
  }
}

export var occupations={};

//adventurer gives you a choice of Feat but none of them are easy to add to the game. Maybe pick other occupation?
occupations.adventurer=new Occupation(+1,['Bluff','Technology','Stealth','Perceive','Medicine']);
