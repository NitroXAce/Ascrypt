function Splitters(){
    this.__proto__ = null;
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

    delete this.stringy;
    delete this.splitter;
    delete this.matcher;
    delete this.hold;
    delete this.i;

    return this.result;
}

function TokenSearch(){
    this.__proto__= null;
    this.result = undefined;
    this.tokenObject = require('./ref/tokens.js').tokens;
    this.tokenArray = arguments;
    this.tokenKept = "";
    this.obj = this.tokenObject;
    this.i = -1;

    while (++this.i < arguments.length) {
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

    delete this.i;
    delete this.obj;
    delete this.tokenArray;
    delete this.tokenKept;
    delete this.tokenObject;
    return this.result;
}