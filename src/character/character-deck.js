import {deck} from '../modules/deck';
import {hero,sign} from '../modules/character/character';

var GRADES=['Ø','I','II','III','IV'];

//TODO move to a city shop screen instead of character
export class CharacterDeck {
    constructor(){}
    
    attached(){this.refresh();}
    
    refresh(){
      this.memory=deck.memory;
      this.storage=deck.storage;
      this.name=hero.name;
      this.name+=this.name[this.name.lenght-1]=='s'?"'":"'s";
      this.wealth=hero.wealth;
      this.electronics=sign(hero.getelectronics());
      this.deckgrade=deck.deckgrade;
      this.memorygrade=deck.memorygrade;
      this.storagegrade=deck.storagegrade;
      this.stealthgrade=deck.stealthgrade;
      this.canupgradedeck=deck.upgradedeck(false);
      this.canupgradememory=deck.upgradememory(false);
      this.canupgradestorage=deck.upgradestorage(false);
      this.canupgradestealth=deck.upgradestealth(false);
    }
    
    grade(i){return GRADES[i];}
    
    upgradedeck(){
      debugger;
      deck.upgradedeck(true);
      this.refresh();
    }
    
    upgradememory(){
      deck.upgradememory(true);
      this.refresh();
    }
    
    upgradestorage(){
      deck.upgradestorage(true);
      this.refresh();
    }
    
    upgradestealth(){
      deck.upgradestealth(true);
      this.refresh();
    }
}
