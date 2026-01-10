module.exports={
    lexer: function Lexer(){
        this.__proto__ = null;
        this.search = require('./modules').tokenSearch;
        this.src = arguments[0];
        this.i=-1;

        while(this.src[++this.i]){

        }
    }
}