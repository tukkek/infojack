class Skill{
    constructor(name,description){
        this.name=name;
        this.description=description;
    }
}

export var skills=new Map();

for (let skill of [
    new Skill('Bluff',
        "Convince ICE you're not an intruder."),
    new Skill('Decryption',
        "Break into protected data."),
    new Skill('Electronics',
        "Build and install hardware."),
    new Skill('Forgery',
        "Forge authentication credentials."),
    new Skill('Information',
        "Find more shopping items and missions."),
    new Skill('Hacking',
        "Act on the Web."),
    new Skill('Perceive',
        "Detect ICE and files on the Web."),
    new Skill('Medicine',
        "Treat your injuries."),
    new Skill('Stealth',
        "Avoid being detected on the Web."),
    new Skill('Profession',
        "Earn more money."),
    new Skill('Research',
        "Do perimeter checks on Frames."),
    new Skill('Search',
        "Locate files in datastores."),
    new Skill('Technology',
        "Create your own programs."),
]){
    skills.set(skill.name,skill);
}

export function checkskills(ss){
    for(let s of ss) if(!skills.get(s)) alert('Unknown skill: '+s);
    return ss;
}
