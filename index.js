let
    {tokens} = require('./tokenizer'),
    {KeepOnly, TokenSearch, CharLexer} = require('./lexer');
    inputStr = require('fs').readFileSync('sample.txt','utf8');

console.log(new CharLexer(inputStr));