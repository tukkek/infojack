/*A couple skills here are cross-class but they're too few to bother enforcing the rules properly. Also the Adventurer occupation gives you 2 extra skills from a list to use as cross class. Those skill aren't there but it evens out anyway since that isn't being taken into account currently.
 
Cross skills are actually implemented on character-abilities.html but disabled.*/

class Skill{
    constructor(name,ability,description){
        this.name=name;
        this.ability=ability; //used only as a label
        this.description=description;
    }
}

export var skills=new Map();

for (let skill of [
    new Skill('Bluff','Charisma',
        "Convince ICE you're not an intruder"),
    new Skill('Concentration','Constitution',
        "Focus your mind while in danger"),
    new Skill('Decryption','Intelligence',
        "Break into protected data"),
    new Skill('Electronics','Intelligence',
        "Build and install hardware"),
    new Skill('Forgery','Intelligence',
        "Forge authentication credentials"),
    new Skill('Hacking','Intelligence',
        "Act on the Web"),
    new Skill('Information','Charisma',
        "Find more shopping items and missions"),
    new Skill('Medicine','Wisdom',
        "Treat your injuries"),
    new Skill('Perceive','Wisdom',
        "Passive node scanning."),
    new Skill('Profession','Wisdom',
        "Earn more money per contract"),
    new Skill('Research','Intelligence',
        "Do perimeter checks on Frames"),
    new Skill('Search','Intelligence',
        "Active node scanning."),
    new Skill('Stealth','Dexterity',
        "Avoid being detected on the Web"),
    new Skill('Technology','Intelligence',
        "Create your own programs"),
]){
    skills.set(skill.name,skill);
}

export function checkskills(ss){
    for(let s of ss) if(!skills.get(s)) alert('Unknown skill: '+s);
    return ss;
}
