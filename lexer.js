function KeepOnly() {
    this.result = {};

    for (this.i in arguments[0])
        for (this.j in arguments[1])
            if (this.i === arguments[1][this.j]){
                this.result[this.i] = arguments[0][this.i];
                if (arguments[1].length === 1)
                    return this.result[arguments[1][0]];
                else continue;
            }

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
    this.heap = {
        //primitive types
        'bool':{},
        'bin':{},
        'oct':{},
        'num':{},
        'hex':{},
        'str':{},
        'const':{},
        
        //vehicular types
        'arr':{},
        'obj':{},
        'fn':{},
        
        //very complex types
        'module':{},
        'super':{},
    };
    
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
                this.obj.def.indexOf( 'newline')+1
                    ? ++this.ln : this.ln,
                this.obj.def.indexOf( 'newline')+1
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
        if (!this.prevToken) continue;

        //whiteSpace cleanup
        if (this.currToken.def.indexOf('whitespace')+1) {
            if (this.prevToken.def.indexOf('string')+1)
                this.buffer[this.buffer.length - 2].token += this.currToken.token;
            this.buffer.length -= 1;
            continue;
        }
        
        //letter and char crunching
        if (
            this.currToken.def.indexOf('char')+1 ||
            this.currToken.def.indexOf('letter')+1
        ) {
            //append to a current identifier or string
            if (
                this.prevToken.def.indexOf('identifier')+1 ||
                this.prevToken.def.indexOf('string')+1
            ) {
                this.buffer[this.buffer.length - 2].token += this.currToken.token;
                this.buffer.length -= 1;
                continue;
            }

            //handling types based on identifier context
            if (this.prevToken.def.indexOf('type')+1) {
                for (this.type = 0; ++this.type < this.types.length;)
                    if (!(this.prevToken.def.indexOf(this.types[this.type]) +1)) 
                        continue;
                    else {
                        this.buffer[this.buffer.length - 1] = new TokenMaker(
                            this,
                            this.currToken.token,
                            'identifier-' + this.types[this.type]
                        );
                        break;
                    }
                
                continue;
            }
        }

        //string handling
        /*if(this.prevToken.def.indexOf('quote')+1){

        }*/

        //comment handling
        if(this.prevToken.def.indexOf('comment')+1){

            //line comment til
            if(
                this.prevToken.def.indexOf('line')+1 &&
                this.currToken.def.indexOf('newline')+1
            )
                continue;

            //block comment exit
            else if(this.currToken.def.indexOf('close-comment')+1)
                continue;


            else {
                this.buffer[this.buffer.length - 2].token += this.currToken.token;
                this.buffer.length -= 1;
                continue;
            }
            
        }
        
        //operations characters based on identifier
        if(
            this.currToken.def.indexOf('open')+1
        ){
            //comment context

            //identifier context
            /*if(this.prevToken.def.indexOf('identifier')+1){
                //function definition/call
                if(this.currToken.def.indexOf('paren')+1){
                    
                }
                
                //object definiton/call
                if(this.currToken.def.indexOf('curly')+1){
                    
                }
                
                //array definition/call
                if(this.currToken.def.indexOf('square')+1){
                    
                }
                
                //assignments
                if(this.currToken.def.indexOf('assign')+1){
                    
                }
            }*/
            
            
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