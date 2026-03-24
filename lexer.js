function TokenMaker(){
    return {
        token:arguments[1] || arguments[0].obj.token,
        def:arguments[2] || arguments[0].obj.def 
    };
}

function SplitCheck(){
    this.src = arguments[0];
    this.splitter = arguments[1];
    this.match = arguments[2];
    this.hold = [[]];
    
    for(this.i in this.src)
        if(this.src[this.i] === this.splitter) this.hold[this.hold.length] = [];
        else this.hold[this.hold.length -1] = this.src[this.i];
        
    if(!!this.match) {
        for (this.i in this.hold)
            if (this.hold[this.i] === this.match)
                return true;
        return false;
    }
    return this.hold;
}

function CharLexer() {
    this.src = arguments[0].split('') || "";
    this.tokenizer = require('./tokenizer.js');
    this.end = this.src.length;
    this.obj = this.tokenizer;
    this.debug = true;
    this.buffer = [];
    this.i = -1;
    this.ln = 0;
    this.pos = 0;
    while (++this.i < this.end){
        
        // DO NOT EDIT THISSSS ------------------------------------------------------

        this.char = this.src[this.i];
        if(this.src[this.i+1])
            this.nextChar = this.src[this.i+1];
        
        if(typeof this.obj[this.char] === 'object'){
            
            //if a nest is found, seek ahead til not
            this.obj = this.obj[this.char];
            if(typeof this.obj[this.nextChar] === 'object')
                continue;
            
            this.buffer[this.buffer.length] = {
                token: this.obj.token,
                def: this.obj.def
            };
        } else this.buffer[this.buffer.length] = {
            token: this.char,
            def: 'char'
        };
        
        // DO NOT EDIT ANYTHING ABOVE!!! ---------------------------------------------
        
        //reset scope
        this.obj = this.tokenizer;
        this.currToken = this.buffer[this.buffer.length-1];
        if(!!this.buffer[this.buffer.length -2]) {
            this.prevToken = this.buffer[this.buffer.length - 2];
            this.currToken = this.buffer[this.buffer.length - 1];
            
            if(!(
                new SplitCheck(this.currToken,'-','whitespace') &&
                new SplitCheck(this.prevToken,'-','string')
            ))
            
            //lets create an identifier!
            if(
                new SplitCheck(this.prevToken,'-','type') &&
                (
                    new SplitCheck(this.currToken,'-','letter') ||
                    new SplitCheck(this.currToken,'-','char')
                )
            ){
                this.buffer[this.buffer.length -1].def = 'identifier';
                continue;
            }

            
            
        }
            
    }


    return this.buffer;
}


module.exports = {
    CharLexer
}


class Lexer {
    tokens = [];
    tokenType = {};
    tokenStart = -1;
    tokenEnd = 0;
    currentLine = 0;
    currentCol = 0;

    constructor(buffer) {
        this.buffer = buffer ?? '';
    }

    advance() {
        if (this.tokenEnd === this.buffer.length)
            return false;

        this.tokenStart = this.tokenEnd;
        const directorChar = this.buffer[this.tokenStart];
        switch (directorChar) {

        }

        return true;
    }

}