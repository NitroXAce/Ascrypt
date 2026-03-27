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
        
    if(!this.match) 
        return this.hold;
        
    for (this.i in this.hold)
        if (this.hold[this.i] === this.match)
            return true;
    return false;
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
            
            //gather a previous token, if found
            //set current token value to eval from
            this.currToken = this.obj;
            if(this.buffer[this.buffer.length -1])
                this.prevToken = this.buffer[this.buffer.length - 1];
            
            //lets work on some whitespacing
            if(
                this.prevToken &&
                new SplitCheck(this.currToken,'-','whitespace')
            ){
                //if we DO have a prev token of stringm append, otherwise just continue
                if(new SplitCheck(this.prevToken,'-','string'))
                    this.buffer[this.buffer.length - 1].token += this.currToken.token;    
                continue;
            }

            //now time to add the non-spaced, non stringed token into the buffer!    
            this.buffer[this.buffer.length] = {
                token: this.obj.token,
                def: this.obj.def
            };

        }
        
        //any non-tokenized token gets pushed as a raw char token
        else this.buffer[this.buffer.length] = {
            token: this.char,
            def: 'char'
        };
        
        // DO NOT EDIT ANYTHING ABOVE!!! ---------------------------------------------
        
        //  NOW WE CHECK TOKENS BELOW ------------------------------------------------
        
        //reset token checking scope til next loop iteration
        this.obj = this.tokenizer;
        this.currToken = this.buffer[this.buffer.length-1];

        //if we dont have a prev token to check, lets just continue til we do!
        if(!this.buffer[this.buffer.length -2]) continue;

        this.prevToken = this.buffer[this.buffer.length - 2];
        this.currToken = this.buffer[this.buffer.length - 1];
        
        if(
            new SplitCheck(this.currToken,'-','whitespace') &&
            new SplitCheck(this.prevToken,'-','string')
        ){
            this.buffer[this.buffer.length - 2].token += this.currToken.token;
            this.buffer[this.buffer.length-1] = undefined;
            this.buffer.length -= 1;
            continue;
        }
        
        //lets create an identifier!
        if(
            new SplitCheck(this.prevToken,'-','type') && (
                new SplitCheck(this.currToken,'-','letter') ||
                new SplitCheck(this.currToken,'-','char')
        )){
            this.buffer[this.buffer.length -1].def = 'identifier';
            continue;
        }   


        // TOKEN CHECKING ZONE ABOVE ------------------------------------------------
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