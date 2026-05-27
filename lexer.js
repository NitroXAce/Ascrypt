function KeepOnly() {
    this.result = {};

    if (arguments[1].length === 0)
        return this.result;
    
    if (arguments[1].length === 1)
        return this.result[arguments[1][0]];

    for (this.i in arguments[0])
        for (this.j in arguments[1])
            if (this.i === arguments[1][this.j])
                this.result[this.i] = arguments[0][this.i];

    return this.result;
}

function LexicalError() {
    this.name = 'LexicalError';
    this.message = 'Unexpected token';
    this.obj = arguments[0];
}

function AssignmentError(){
    this.obj = arguments[0];
    this.message = 'Invalid assignment'+
        '[' + this.obj.ln + ':' + this.obj.pos + ']: ' +
        arguments[1];
    throw new Error(this.message);
}

function EOFError() {
    this.message = 'Unexpected end of file';
    throw new Error(this.message);
}

function TokenMaker() {
    this.token = arguments[1] || arguments[0].obj.token;
    this.def = arguments[2] || arguments[0].obj.def;
    this.ln = arguments[3] || arguments[0].ln;
    this.pos = arguments[4] || arguments[0].pos;
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
    this.scope = [];
    this.heap = {
        //primitive types
        'bool':{},
        'bin':{},
        'oct':{},
        'num':{},
        'hex':{},
        'str':{},
        
        //vehicular types
        'arr':{},
        'obj':{},
        'fn':{},
        'const':{},
        
        //very complex types
        'module':{},
        'type':{},
    };
    
    //position markers
    this.i = -1;
    this.ln = 1;
    this.pos = 1;

    //loop once, do it all!
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
                    ? ++this.ln
                    : this.ln,
                this.obj.def.indexOf( 'newline')+1
                    ? (this.pos = 1, this.pos) 
                    : this.pos - this.obj.token.length 
            );
        }

        //any non-tokenized token gets pushed as a raw char token
        else this.buffer[this.buffer.length] = new TokenMaker(this, this.char, 'char');
        
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

        //bumber crunching tokens
        if(
            this.prevToken.def.indexOf('hex')+1  &&
            this.currToken.def.indexOf('hex')+1
        ) {
            this.buffer[this.buffer.length - 2].token += this.currToken.token;
            this.buffer.length -= 1;
            if(this.nextChar) continue;
            else throw new EOFError();
        }

        //complete handling
        if(!(this.prevToken.def.indexOf('complete')+1)){
            //comment handling, if line comment, til newline, if block comment, til close
            if(this.prevToken.def.indexOf('comment')+1){
                //continual comment handling, if line comment, til newline, if block comment, til close
                if((
                    //line comment til newline
                    this.currToken.def.indexOf('newline')+1 &&
                    this.prevToken.def.indexOf('unop')+1
                ) || (
                    //block comment til
                    this.currToken.def.indexOf('close')+1 &&
                    this.currToken.def.indexOf('comment')+1 &&
                    this.prevToken.def.indexOf('open')+1
                )) this.buffer[this.buffer.length - 2].def += '-complete';
                
                //if still in comment, condense token and continue
                this.buffer[this.buffer.length - 2].token += this.currToken.token;
                this.buffer.length -= 1;

                if(this.prevToken.def.indexOf('complete')+1)
                    this.buffer.length -= 1;
                if(this.nextChar) continue;
                else throw new EOFError();
            }

            //string handling
            if(this.prevToken.def.indexOf('quote')+1){
                //if the previous token either appended or singular
                //and oour current token matches
                //then we can mark the string as complete
                if(this.prevToken.def === this.currToken.def)
                    this.buffer[this.buffer.length - 2].def += '-complete';

                //if still in string, condense token and continue
                this.buffer[this.buffer.length - 2].token += this.currToken.token;
                this.buffer.length -= 1;
                if(this.nextChar) continue;
                else throw new EOFError();
            }
        }

        //early whiteSpace cleanup
        if (this.currToken.def.indexOf('whitespace')+1) {
            this.buffer.length -= 1;
            continue;
        }

        // DO NOT EDIT ANYTHING ABOVE!!! ---------------------------------------------
        // NOW WE CHECK TOKENS BELOW -------------------------------------------------

        //handling types based on identifier context
        if (this.prevToken.def.indexOf('type')+1) {

            //handle assignment errors based on reserved keywords, symbols, and numbers
            if((
                this.currToken.def.indexOf('res')+1 ||
                this.currToken.def.indexOf('symbol')+1 ||
                this.currToken.def.indexOf('num')+1
            ) && (
                this.nextChar === '=' ||
                this.nextChar === '(' ||
                this.nextChar === '{' ||
                this.nextChar === '[' ||
                this.nextChar === ' ' ||
                this.nextChar === '\n' ||
                this.nextChar === '\r\n'
            )) throw new AssignmentError(
                this,
                'Reserved keyword, Symbol, or Number token "' +
                this.currToken.token +
                '" cannot be used as an identifier'
            );
            
            //create a new identifier and append its type based on the current token
            this.type = 0;
            while( ++this.type < this.types.length ) 
                if (this.prevToken.def.indexOf(this.types[this.type]) +1) {
                    this.buffer[this.buffer.length - 1] = new TokenMaker(
                        this,
                        this.currToken.token,
                        'identifier-' + this.types[this.type]
                    );
                    break;
                };
            
            //we already know it's an identifier with its respective type
            //thus we can skip the rest of the checks and move on to the next char
            if(this.nextChar) continue;
            else throw new EOFError();
        }

        //identifier context handling
        if(this.prevToken.def.indexOf('identifier')+1){
            //letter and char crunching
            //append to a current identifier or string
            if (
                this.currToken.def.indexOf('char')+1 ||
                this.currToken.def.indexOf('letter')+1
            ) {
                this.buffer[this.buffer.length - 2].token += this.currToken.token;
                this.buffer.length -= 1;
                if(this.nextChar) continue;
                else throw new EOFError();
            }

            //operations characters based on identifier
            if(
                this.currToken.def.indexOf('open')+1 ||
                this.currToken.token === '=' 
            ){

                //identifier context
                //function definition/call
                if(this.currToken.def.indexOf('paren')+1){
                    this.buffer[this.buffer.length - 1].def += '-fn';
                    this.scope[this.scope.length] = this.currToken.def;
                    if(this.nextChar) continue;
                    else throw new EOFError();
                }
                
                //object definiton/call
                if(this.currToken.def.indexOf('curly')+1){
                    this.buffer[this.buffer.length - 1].def += '-obj';
                    this.scope[this.scope.length] = this.currToken.def;
                    if(this.nextChar) continue;
                    else throw new EOFError();
                }
                
                //array definition/call
                if(this.currToken.def.indexOf('square')+1){
                    this.buffer[this.buffer.length - 1].def += '-arr';
                    this.scope[this.scope.length] = this.currToken.def;
                    if(this.nextChar) continue;
                    else throw new EOFError();
                }
                
                //assignments
                if(this.currToken.def.indexOf('assign')+1){
                    this.buffer[this.buffer.length - 1].def += '-assign';
                    if(this.nextChar) continue;
                    else throw new EOFError();
                }
                
            }
        }

        
        
        //lets check for symbols prior to condensing child identifiers
        //if (!this.pprevToken) continue;


        // TOKEN CHECKING ZONE ABOVE ------------------------------------------------

        
    }


    return new function(){
        this.buffer = arguments[0].buffer;
        this.heap = arguments[0].heap;
    }(this);
}


module.exports = {
    CharLexer:CharLexer,
    KeepOnly: KeepOnly
}
