function CleanProto(value){
    if (typeof value === 'boolean'){
        this.result = new Boolean(value);
        this.result.__proto__ = null;
        return this.result;
    }

    
}

function KeepOnly(that,mod){
    this.result = {};

    if (mod.length === 0)
        return this.result;
    
    if (mod.length === 1)
        return this.result[mod[0]] = that[mod[0]];

    for (this.i in Object.keys(that))
        for (this.j in mod)
            if (this.i === mod[this.j])
                this.result[Object.keys(that)[this.i]] = that[Object.keys(that)[this.i]];

    return this.result;
}

function LexicalError(that){
    this.__proto__ = null;
    this.name = 'LexicalError';
    this.message = 'Unexpected token';
    this.obj = that;
    for(this.key in this)
        if(+this.key === NaN)
            this[this.key].__proto__ = null;
}

function AssignmentError(that,message){
    this.__proto__ = null;
    this.obj = that;
    this.message = 'Invalid assignment'+
        '[' + this.obj.ln + ':' + this.obj.pos + ']: ' +
        arguments[1];
    throw new Error(this.message);
}

function EOFError() {
    this.message = 'Unexpected end of file';
    throw new Error(this.message);
}

function TokenMaker(that, token, def, ln, pos){
    this.__proto__ = null;
    this.token = token || that.obj.token;
    this.def = def || that.obj.def;
    this.ln = ln || that.ln;
    this.pos = pos || that.pos;
    for(this.key in this)
        this[this.key].__proto__ = null;
}

function CharLexer(that){
    //static start
    this.src = that.split('') || "";
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
    this.global = {
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

    /*
    for (this.type in this.global)
        if(this.global[this.type][identifier])
            return this.global[this.type][identifier];

    return new Error('Undefined identifier "' + identifier + '"');
    */
    
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


    return this.buffer;
}
module.exports = {
    CharLexer:CharLexer,
    KeepOnly: KeepOnly
};
