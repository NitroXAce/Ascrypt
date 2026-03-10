function MergeObj(){
    this.obj1 = arguments[0];
    this.obj2 = arguments[1];
    for(this.key in this.obj2)
        this.obj1[this.key]=this.obj2[this.key];
    return new KeepOnly(this,['obj1']).obj1;
}

function CondenseToken(){
    this.buffer = arguments[0];
    this.result = [];
    this.i = -1;
    this.end = this.buffer.length;
    while(this.i++<this.end)
        if(this.buffer[this.i] != '')
            this.result[this.result.length]=this.buffer[this.i];
    return new KeepOnly(this, ['result']).result;
}

function KeepOnly(){
    this.obj = arguments[0];
    this.keep = arguments[1];
    this.result = {};
    for(this.index in this.keep)
        for(this.key in this.obj)
            if(this.key==this.keep[this.index])
                this.result[this.key]=this.obj[this.key];
    delete this.obj;
    delete this.keep;
    delete this.index;
    delete this.key;
    return this.result;
}

function SplitCheck() {
    this.stringy = arguments[0];
    this.splitter = arguments[1];
    this.matcher = arguments[2];
    this.hold = [[]];
    this.result = null;
    
    for (this.i in this.stringy)
        if (this.stringy[this.i] != this.splitter)
            this.hold[this.hold.length - 1] += this.stringy[this.i];
        else this.hold[this.hold.length] = [];
    
    if (!!this.matcher) {
        for (this.i in this.hold)
            if (this.hold[this.i] == this.matcher)
                return (
                    this.result = true,
                    new KeepOnly(this,['result']).result
                );
        new KeepOnly(this, ['result']);
        this.result = false;
    }
    
    return new KeepOnly(this, ['hold']).hold;
}

function TokenSearch() {
    this.obj = require('./tokenizer').tokens;
    this.tokenArray = arguments;
    this.tokenObject = this.obj;
    this.tokenKept = "";
    this.i = -1;
    this.result = undefined;
    
    while (++this.i < this.tokenArray.length)
        if (
            typeof this.tokenObject[this.tokenArray[this.i]] != "undefined"
        ) {
            this.tokenKept += this.tokenArray[this.i];
            this.tokenObject = this.tokenObject[this.tokenArray[this.i]];
            
            if (typeof this.tokenObject == "object") continue;
            if (typeof this.tokenObject == "string"){
                this.result = {
                    length: this.tokenKept.length,
                    token: this.tokenKept,
                    name: this.tokenObject
                };
                return new KeepOnly(this, ['result']).result;
            }
        }
        if (
            typeof this.tokenObject[""] != "undefined"
        ){
            this.result = {
                length: this.tokenKept.length,
                token: this.tokenKept,
                name: this.tokenObject[""]
            };
            return new KeepOnly(this, ['result']).result;    
        }
    return new KeepOnly(this, ['result']).result;    
}

function TokenCrammer(){
    this.buffer = arguments[0];
    this.token = arguments[1];
    this.keyword = arguments[2];
    if(new SplitCheck(this.token.name,'-',this.keyword))
        if(
            typeof this.buffer[this.buffer.length-1]=='object' &&
            new SplitCheck(this.buffer[this.buffer.length-1].name,'-',this.keyword)
        ) this.buffer[this.buffer.length-1] = this.token;
        else this.buffer[this.buffer.length]=this.token;
    return new KeepOnly(this, ['buffer']).buffer;
}

function CharLexer(){
    this.buffer     = [];
    this.src        = arguments[0]||"";
    this.end        = this.src.length;
    this.i          = -1;
    this.ln         = 0;
    this.pos        = 0;
    while(++this.i<this.end){
        this.charToken = new TokenSearch(this.src);

        if(!this.charToken){
            this.charToken={
                length:1,
                name:'char',
                token:this.src[this.i]
            };
            this.buffer[this.buffer.length]= this.charToken;
            this.src.shift();
            this.end = this.src.length;
            continue;
        }

        this.buffer[this.buffer.length]= this.charToken;
        this.i+=this.charToken.length;
        for(this.j = -1; ++this.j < this.charToken.length;)
            this.src.shift();
        this.end = this.src.length;
    }

    
    return new KeepOnly(this, ['buffer', 'tokenBank', 'wordBank']);
}





module.exports={
    CharLexer, SplitCheck, KeepOnly, TokenSearch
}