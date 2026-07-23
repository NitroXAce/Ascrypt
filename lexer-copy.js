function TokenMaker(that, token, def, ln, pos){
    this.__proto__ = null;
    this.token = token || that.obj.token || '';
    this.def = def || that.obj.def || {char:true};
    this.ln = ln || that.ln;
    this.pos = pos || that.pos;
}

function CleanProto(value){
    this.__proto__ = null;
    if (typeof value === 'boolean'){
        this.result = new Boolean(value);
        this.result.__proto__ = null;
        return this.result;
    }

    
}

function KeepOnly(that,mod){
    this.__proto__ = null;
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
        message;
    throw new Error(this.message);
}

function EOFError() {
    this.__proto__ = null;
    this.message = 'Unexpected end of file';
    throw new Error(this.message);
}

function PureObjStrip(obj, omit){
    this.__proto__ = null;
    this.result = {};
    this.result = JSON.parse(JSON.stringify(obj), function(key, value){
        if(typeof key === 'object' && key !== omit)
            key.__proto__ = null;
    });
    return this.result;
}

function CharLexer(src){
    this.__proto__ = null;
    this.src = (src || "").split('');
    this.src.__proto__ = null;
    this.tokenizer = require('./tokenizer-copy.js')
    this.types = this.tokenizer.types;
    this.end = this.src.length;

    this.obj = this.tokenizer;
    this.buffer = [];
    this.scope = [];
    this.typeScope = [];

    this.i = -1;
    this.ln = 1;
    this.pos = 1;

    while (++this.i < this.end) {

        ++this.pos;
        this.char = this.src[this.i];
        this.nextChar = this.src[this.i + 1] || null;

        // TRIE WALK
        if (typeof this.obj[this.char] === 'object') {
            this.obj = this.obj[this.char];

            if (typeof this.obj[this.nextChar] === 'object') continue;

            this.buffer.push(new TokenMaker(
                this,
                this.obj.token || this.char,
                this.obj.def,
                this.obj.def.newline ? ++this.ln : this.ln,
                this.obj.def.newline ? (this.pos = 1, this.pos) : this.pos - (this.obj.token || this.char).length + 1
            ));
        } else this.buffer.push(new TokenMaker(this, this.char, {
            __proto__: null,
            char:true
        }));

        //gather token definitions
        this.obj = this.tokenizer;
        this.curr = this.buffer[this.buffer.length-1];
        this.prev = this.buffer[this.buffer.length-2];

        // Force comment mode persistence
        if (this.prev && this.prev.def.comment && !this.prev.def.complete)
            // Keep previous token in comment mode
            this.prev.def.open = true;   // helps the next iteration detect it
        

        // Skip if theres no previous token to compare to
        if (!this.prev) continue;

        // ==================== COMPLETE HANDLING (Comments + Strings) ====================
        if (!this.prev.def.complete) {

            // COMMENT HANDLING
            if(this.prev.def.comment){
                //continual comment handling, if line comment, til newline, if block comment, til close
                if((
                    //line comment til newline
                    this.curr.def.newline &&
                    this.prev.def.unop
                ) || (
                    //block comment til
                    this.curr.def.close &&
                    this.curr.def.comment &&
                    this.prev.def.open
                )) this.buffer[this.buffer.length - 2].def.complete=true;
                
                //if still in comment, condense token and continue
                this.buffer[this.buffer.length - 2].token += this.curr.token;
                this.buffer.length -= 1;

                if(this.prev.def.complete)
                    this.buffer.length -= 1;
                if(this.nextChar) continue;
                else throw new EOFError();
            }

            // STRING HANDLING
            if (this.prev.def.quote) {
                if (this.prev.def === this.curr.def)          // closing quote
                    this.buffer[this.buffer.length - 2].def.complete = true;

                this.buffer[this.buffer.length - 2].token += this.curr.token;
                this.buffer.length -= 1;
                continue;
            }
        }

        //early whiteSpace cleanup
        if (this.curr.def.whitespace) {
            this.buffer.length -= 1;
            continue;
        }

        // DO NOT EDIT ANYTHING ABOVE!!! ---------------------------------------------
        // NOW WE CHECK TOKENS BELOW -------------------------------------------------

        //handling types based on identifier context
        if (this.prev.def.type || this.prev.token === ',') {
            
            if((
                this.curr.def.res ||
                this.curr.def.symbol ||
                (this.curr.def.bin || this.curr.def.oct || this.curr.def.dec) ||
                (this.curr.def.hex && !this.curr.def.char)
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
                this.curr.token +
                '" cannot be used as an identifier'
            );
            
            //create a new identifier and append its type based on the current token
            this.type = 0;
            while( ++this.type < this.types.length ) 
                if (this.prev.def[this.types[this.type]]) {
                    this.buffer[this.buffer.length - 1] = new TokenMaker(
                        this,
                        this.curr.token,
                        //'identifier-' + this.types[this.type]
                        new (function ReturnObj(type){
                            this.__proto__ = null;
                            this.identifier = true;
                            this[type] = true;
                        })(this.types[this.type])
                    );
                    break;
                };
            
            //we already know it's an identifier with its respective type
            //thus we can skip the rest of the checks and move on to the next char
            continue;
        }

        //identifier context handling
        if(this.prev.def.identifier){
            //letter and char crunching
            //append to a current identifier or string
            if (
                this.curr.def.char ||
                this.curr.def.letter
            ) {
                this.buffer[this.buffer.length - 2].token += this.curr.token;
                this.buffer.length -= 1;
                continue;
            }

            //operations characters based on identifier
            if(
                this.curr.def.open ||
                this.curr.token === '=' 
            ){

                //identifier context
                //function definition/call
                if(this.curr.def.paren){
                    this.buffer[this.buffer.length - 1].def.fn=true;
                    this.scope[this.scope.length] = this.curr.def;
                    continue;
                }
                
                //object definiton/call
                if(this.curr.def.curly){
                    this.buffer[this.buffer.length - 1].def.obj=true;
                    this.scope[this.scope.length] = this.curr.def;
                    continue;
                }
                
                //array definition/call
                if(this.curr.def.square){
                    this.buffer[this.buffer.length - 1].def.arr=true;
                    this.scope[this.scope.length] = this.curr.def;
                    continue;
                }
                
                //assignments
                if(this.curr.def.assign){
                    this.buffer[this.buffer.length - 1].def.assign=true;
                    continue;
                }
                
            }
        }
    }

    return this.buffer;
}

module.exports = { CharLexer: CharLexer };