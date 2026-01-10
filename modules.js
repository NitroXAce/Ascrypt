function KeepOnly(){
    delete this.__proto__;
    this.properties = arguments[0];
    this.arrKeep = arguments[1];
    this.result = {};

    for (this.i in this.properties)
        for(this.j in this.arrKeep)
            if (this.i == this.arrKeep[this.j])
                this.result[this.i] = this.properties[this.i];
    delete this.properties;
    delete this.arrKeep;
    delete this.i;
    delete this.j;
    return this.result;
}

function Splitter(){
    //this.__proto__ = null;
    delete this.__proto__;
    this.stringy = arguments[0];
    this.splitter = arguments[1];
    this.matcher = arguments[2];
    this.hold=[[]];
    this.result = null;

    for (this.i in this.stringy)
        if (this.stringy[this.i] != this.splitter)
            this.hold[this.hold.length - 1] += this.stringy[this.i];
        else this.hold[this.hold.length] = [];

    this.result = this.hold;
    if (!!this.matcher)
        for (this.i in this.hold)
            if (this.hold[this.i] != this.matcher)
                this.result = false;
            else {
                this.result = true;
                break;
            }

    return new KeepOnly(this, ['result']).result;
}

function TokenSearch(){
    this.__proto__= null;
    this.result = undefined;
    this.tokenObject = require('./ref/tokens.js').tokens;
    this.tokenArray = arguments;
    this.tokenKept = "";
    this.obj = this.tokenObject;
    this.i = -1;

    while (arguments.length[++this.i]) {
        if (!!this.tokenObject[this.tokenArray[this.i]]) {
            this.tokenKept += this.tokenArray[this.i];
            this.tokenObject = this.tokenObject[this.tokenArray[this.i]];
            
            if (typeof this.tokenObject == "object") continue;
            if (typeof this.tokenObject == "string") {
                this.result = {
                    length: this.tokenKept.length,
                    name: this.tokenObject,
                    token: this.tokenKept
                };
                break;
            }
        }

        if (!!this.tokenObject[""]){
            this.result = {
                length: this.tokenKept.length,
                name: this.tokenObject[""],
                token: this.tokenKept
            };
            break;
        }
        
    }

    return new KeepOnly(this, ['result']).result;
}

module.exports={
    splitter:Splitter,
    tokenSearch:TokenSearch
}
