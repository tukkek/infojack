export class CharacterScreen {
    constructor() {
        this.hide=false;
        this.hideabilities=true;
        this.hideskills=true;
        this.hidefeats=true;
        this.hidedetails=true;
    }
    
    attached(){
        this.selectid('character-abilities');
    }
    
    selectid(id){
        for(let button of this.charactermenu.childNodes){
            let classes=button.classList;
            if(!classes){
                continue;
            }
            var hide=button.id==id;
            this['hide'+id.replace('character-','')]=hide;
            if(hide){
                classes.add('highlightbg');
            } else {
                classes.remove('highlightbg');
            }
        }
    }
    
    select(e){
        this.selectid(e.target.id);
    }
}

