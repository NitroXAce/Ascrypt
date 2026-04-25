function KeepOnly() {
    this.result = {};

    for (this.i in arguments[0])
        for (this.j in arguments[1])
            if (this.i === arguments[1][this.j])
                this.result[this.i] = arguments[0][this.i];

    if (arguments[1].length === 1)
        return this.result[arguments[1][0]];
    return this.result;
}

function TokenMaker() {
    return {
        token: arguments[1] || arguments[0].obj.token,
        def: arguments[2] || arguments[0].obj.def,
        ln: arguments[3] || arguments[0].ln,
        pos: arguments[4] || arguments[0].pos
    };
}

function SplitCheck() {
    this.hold = [[]];
    this.bool = false;

    for (this.i = -1; ++this.i < arguments[0].length;)
        if (arguments[0][this.i] !== arguments[1])
            this.hold[this.hold.length - 1] += arguments[0][this.i];
        else if (arguments[2] && arguments[2] === this.hold[this.hold.length - 1])
            return this.bool = true;
        else this.hold[this.hold.length] = [];

    if(!arguments[2])
        return this.hold;

    if(arguments[2] !== this.hold[this.hold.length - 1])
        return this.bool;

    return this.bool = true;
}

function CharLexer() {
    //static start
    this.src = arguments[0].split('') || "";
    this.tokenizer = require('./tokenizer.js');
    this.types = this.tokenizer.types;
    this.end = this.src.length;
    
    //toggle state variables
    this.debug = true;
    
    //buffers and volatile memory
    this.obj = this.tokenizer;
    this.buffer = [];
    this.typeNest = [];
    
    //position markers
    this.i = -1;
    this.ln = 1;
    this.pos = 1;
    while (++this.i < this.end) {

        // DO NOT EDIT THISSSS ------------------------------------------------------
        ++this.pos;
        this.preBuffer = this.buffer || [];
        this.char = this.src[this.i];
        if (this.src[this.i + 1])
            this.nextChar = this.src[this.i + 1];
        
        //determine object nesting by character, or paste known definition and token!
        if (typeof this.obj[this.char] === 'object') {

            //if a nest is found, seek ahead til not
            this.obj = this.obj[this.char];
            if (typeof this.obj[this.nextChar] === 'object')
                continue;

            //now time to add the non-spaced, non stringed token into the buffer!    
            this.buffer[this.buffer.length] = new TokenMaker(
                this,
                '',
                '',
                new SplitCheck(this.obj.def, '-', 'newline').bool
                    ? ++this.ln : this.ln,
                new SplitCheck(this.obj.def, '-', 'newline').bool
                    ? (this.pos = 1, this.pos) : this.pos - this.obj.token.length 
            );

        }

        //any non-tokenized token gets pushed as a raw char token
        else this.buffer[this.buffer.length] = 
            new TokenMaker(this, this.char, 'char');

        // DO NOT EDIT ANYTHING ABOVE!!! ---------------------------------------------

        //  NOW WE CHECK TOKENS BELOW ------------------------------------------------

        //reset token checking scope til next loop iteration
        this.obj = this.tokenizer;

        //character position in buffer
        if (this.buffer[this.buffer.length - 1])
            this.currToken = this.buffer[this.buffer.length - 1];
        
        //lets also make a prev token context marker
        if (this.buffer[this.buffer.length - 2])
            this.prevToken = this.buffer[this.buffer.length - 2];

        //if no screening of tokens, continue til I do
        if (!(this.currToken && this.prevToken)) continue;

        //whiteSpace cleanup
        if (new SplitCheck(this.currToken.def, '-', 'whitespace').bool) {
            if (new SplitCheck(this.prevToken.def, '-', 'string').bool)
                this.buffer[this.buffer.length - 2].token += this.currToken.token;
            this.buffer.length -= 1;
            continue;
        }
        
        //letter and char crunching
        if (
            new SplitCheck(this.currToken.def, '-', 'char').bool ||
            new SplitCheck(this.currToken.def, '-', 'letter').bool
        ) {
            //append to a current identifier or string
            if (
                new SplitCheck(this.prevToken.def, '-', 'identifier').bool ||
                new SplitCheck(this.prevToken.def, '-', 'string').bool
            ) {
                this.buffer[this.buffer.length - 2].token += this.currToken.token;
                this.buffer.length -= 1;
                continue;
            }

            if (new SplitCheck(this.prevToken.def, '-', 'type').bool) {
                for (this.type = 0; ++this.type < this.types.length;)
                    if (new SplitCheck(
                        this.prevToken.def,
                        '-',
                        this.types[this.type]
                    ).bool) {
                        this.typeKept = this.types[this.type];
                        break;
                    }

                this.buffer[this.buffer.length - 1] = new TokenMaker(
                    this,
                    this.currToken.token,
                    'identifier-' + this.typeKept
                );
                
                continue;
            }
            continue;
        }
        
        //operations characters
        if(new SplitCheck(this.currToken.def,'-','open').bool){
            
            //string handling
            if(new SplitCheck(this.prevToken.def,'-','str').bool){}
            
            //identifier landling
            if(new SplitCheck(this.prevToken.def,'-','identifier').bool){
                
                //function definition/call
                if(new SplitCheck(this.currToken.def,'-','paren').bool){}
                
                //object definiton/call
                if(new SplitCheck(this.currToken.def,'-','curly').bool){}
                
                //array definition/call
                if(new SplitCheck(this.currToken.def,'-','square').bool){}
                
                //assignments
                if(new SplitCheck(this.currToken.def,'-','assign').bool){}
            }
            
            
        }
        
        //lets check for symbols prior to condensing child identifiers
        //if (!this.pprevToken) continue;


        // TOKEN CHECKING ZONE ABOVE ------------------------------------------------
    }


    return this.buffer;
}


module.exports = {
    CharLexer:CharLexer,
    KeepOnly: KeepOnly
}


/*class Lexer {
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

}*/