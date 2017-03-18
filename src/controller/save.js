var save={};

save.load=function(){
    let data=localStorage.getItem('infojack-save');
    if(data===null){
        return false;
    }
    save.populate(data);
    save.initialize();
    return true;
}

save.populate=function(data){
}

save.initialize=function(){
}

//TODO use on game lost
//TODO use on game won
save.clear=function(){
    localStorage.setItem('infojack-save',null);
}

save.save=function(){
    localStorage.setItem('infojack-save','something'); //TODO
}
