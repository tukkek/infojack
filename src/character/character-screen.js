export class CharacterScreen {
    constructor() {
        this.hide=false;
        this.showabilities=true;
        this.showskills=false;
        this.showfeats=false;
        this.showdetails=false;
    }
    
    /*attached(){
        this.selectid('character-abilities');
    }*/
    
    select(e){
        let id=e.target.id;
        for(let button of this.charactermenu.childNodes){
            let classes=button.classList;
            if(!classes){
                continue;
            }
            var show=button.id==id;
            this['show'+button.id.replace('character-','')]=show;
            if(show){
                classes.add('highlightbg');
            } else {
                classes.remove('highlightbg');
            }
        }
    }
}

