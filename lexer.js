function MergeObj() {
    this.obj1 = arguments[0];
    this.obj2 = arguments[1];
    for (this.key in this.obj2)
        this.obj1[this.key] = this.obj2[this.key];
    return new KeepOnly(this, ['obj1']).obj1;
}

function CondenseToken() {
    this.buffer = arguments[0];
    this.result = [];
    this.i = -1;
    this.end = this.buffer.length;
    while (this.i++ < this.end)
        if (this.buffer[this.i] != '')
            this.result[this.result.length] = this.buffer[this.i];
    return new KeepOnly(this, ['result']).result;
}

function KeepOnly() {
    this.obj = arguments[0];
    this.keep = arguments[1];
    this.result = {};
    for (this.index in this.keep)
        for (this.key in this.obj)
            if (this.key == this.keep[this.index])
                this.result[this.key] = this.obj[this.key];
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
                        new KeepOnly(this, ['result']).result
                );
        this.result = false;
        return new KeepOnly(this, ['result']);
    }

    return new KeepOnly(this, ['hold']).hold;
}

function TokenSearch() {
    this.obj = require('./tokenizer').tokens;
    this.tokenArray = arguments[0];
    this.tokenObject = this.obj;
    this.i = -1;
    this.result = undefined;

    if(typeof this.tokenObject[this.tokenArray[0]] == 'undefined') return (
        this.keep = {
                token: this.tokenArray[0],
                def: 'char'
            },
        new KeepOnly(this,['keep']).keep
    );
    
    for(this.key in {a:1,b:2,c:3})
        console.log(this.key)
    
    while (++this.i < this.tokenArray.length)
        for(this.token in this.tokenObject){
            console.log(this.token)
            this.currentToken = this.tokenObject[this.token];
            
            if(this.currentToken.token == '')
                return new KeepOnly(this,['tokenObject']).tokenObject[''];
            
            else if(
                this.tokenArray[this.i] == this.currentToken &&
                typeof this.currentToken.token == 'string' &&
                typeof this.currentToken.def == 'string'
            ) return new KeepOnly(this,['currentToken']).currentToken;
                    
            else this.tokenObject = this.tokenObject[this.currentToken];
        }
        
}

function TokenCrammer() {
    this.buffer = arguments[0];
    this.token = arguments[1];
    this.keyword = arguments[2];
    if (new SplitCheck(this.token.name, '-', this.keyword))
        if (
            typeof this.buffer[this.buffer.length - 1] == 'object' &&
            new SplitCheck(this.buffer[this.buffer.length - 1].name, '-', this.keyword)
        ) this.buffer[this.buffer.length - 1] = this.token;
        else this.buffer[this.buffer.length] = this.token;
    return new KeepOnly(this, ['buffer']).buffer;
}

function CharLexer() {
    this.src = arguments[0].split('') || "";
    this.end = this.src.length;
    this.obj = require('./tokenizer');
    this.buffer = [];
    this.i = -1;
    this.ln = 0;
    this.pos = 0;
    while (++this.i < this.end) {
        this.char = this.src[this.i];
        
        //this is the most common occurrence before tokenizer
        if(!this.obj[this.char]){
            this.buffer[this.buffer.length] = {
                token:this.char,    
                def:'char'
            };
            continue;
        }
        
        //character SHOULD match with the tokenizer
        this.charObj = this.obj[this.char];
        if(typeof this.charObj == 'object'){
            
            //if next character is a child of current object
            //set the current object as a reference for the child
            if(!!this.charObj[this.src[this.i+1]]){
                this.obj = this.charObj;
                continue;
            }
            
            //determine charOBj to be final object
            if(
                !!this.charObj.token &&
                !!this.charObj.def
            ){
                this.buffer[this.buffer.length] = this.charObj;
                this.obj = require('./tokenizer');
                continue;
            }
            
            //if child is default and not a seeking matching pair
            if (!!this.charObj['']){
                this.buffer[this.buffer.length] = this.charObj[''];
                this.obj = require('./tokenizer');
                continue;
            } 
            
            throw new Error('LexicalError: Token is out of definitions.')
            
        }
        
        if()
        
        
        
        
    }


    return new KeepOnly(this, ['buffer']);
}


module.exports = {
    CharLexer, SplitCheck, KeepOnly, TokenSearch
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