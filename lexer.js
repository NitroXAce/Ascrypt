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

    while (++this.i < this.tokenArray.length) {
        
        console.log(this.i,this.tokenArray[this.i])

        if (typeof this.tokenObject[""] != "undefined")
            return this.tokenObject[''];

        if (typeof this.tokenObject[this.tokenArray[this.i]] != "undefined") {
            this.tokenObject = this.tokenObject[this.tokenArray[this.i]];
            if (
                typeof this.tokenObject.token == 'string' &&
                typeof this.tokenObject.def == 'string'
            ) return this.tokenObject;
            else continue;
        }

        return {
            token: this.tokenArray[this.i],
            def: 'char'
        };
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
    this.buffer = [];
    /**
     *
     * @type {string}
     */
    this.src = arguments[0].split('') || "";
    this.end = this.src.length;
    this.i = -1;
    this.ln = 0;
    this.pos = 0;
    while (++this.i < this.end) {
        this.charToken = new TokenSearch(this.src);
        this.buffer[this.buffer.length] = this.charToken;
        for (
            this.consume = -1;
            ++this.consume < this.charToken.token.length;
        ) this.src = this.src.shift();
    }


    return new KeepOnly(this, ['buffer', 'tokenBank', 'wordBank']);
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