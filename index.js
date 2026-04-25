var
    tokens = require('./tokenizer').tokens,
    KeepOnly = require('./lexer').KeepOnly,
    CharLexer = require('./lexer').CharLexer,
    /** @types string */
    inputStr = require('fs').readFileSync('sample.txt','utf8');

console.log(new CharLexer(inputStr));
//new CharLexer(inputStr);