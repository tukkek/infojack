var ui={};

ui.register=function(element){
    ui[element.constructor.is]=element;
}
