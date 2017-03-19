export class Save{
    load(){
        let data=localStorage.getItem('infojack-save');
        if(data===null){
            return false;
        }
        this.populate(data);
        this.initialize();
        return true;
    }

    populate(data){
    }

    initialize(){
    }

    //TODO use on game lost
    //TODO use on game won
    clear(){
        localStorage.setItem('infojack-save',null);
    }

    save(){
        localStorage.setItem('infojack-save','something'); //TODO
    } 
}
