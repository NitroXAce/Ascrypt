module.exports={
    lexer: function Lexer(){
        this.__proto__ = null;
        this.tokenizer = require('./modules').tokenizer;
        this.src = arguments[0];

    }
}