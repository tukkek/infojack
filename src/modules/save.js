import {hero} from './characters';

export class Save{
    constructor(){
        this.dodebug=true;
    }
    
    checkload(){
        return localStorage.getItem('infojack-save');
    }
    
    load(){
        let data=this.checkload();
        if(!data){
            return false;
        }
        data=JSON.parse(data);
        this.populate(data);
        this.initialize();
        return true;
    }

    populate(data){
        Object.assign(hero,data.hero);
        this.debug();
    }

    initialize(){
    }

    //TODO use on game lost
    //TODO use on game won
    clear(){
        localStorage.setItem('infojack-save','');
    }

    save(){
        let data={};
        data.hero=hero;
        localStorage.setItem('infojack-save',JSON.stringify(data));
        this.debug();
    } 
    
    debug(){
        if(!this.dodebug)return;
        let data=this.checkload();
        if(data){
            alert(data);
        }
    }
}
