import {hero} from '../modules/character/character';
import environment from '../environment';

export class CharacterGeneral {
    constructor() {
      this.hero=hero;
      this.avatar=hero.image;
      this.avatars=environment.playeravatars;
    }
    
    attached(){this.name.focus();}
    
    select(avatar){
      this.avatar=avatar;
      hero.image=avatar;
    }
}
