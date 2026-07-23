var
    tokens = require('./tokenizer').tokens,
    CharLexer = require('./lexer').CharLexer,
    tokensCopy = require('./tokenizer-copy'),
    CharLexerCopy = require('./lexer-copy').CharLexer;
    /** @types string */
    inputStr = require('fs').readFileSync('sample.txt','utf8');

//console.log(JSON.stringify(new CharLexer(inputStr)));
//new CharLexer(inputStr);

console.log(JSON.stringify(tokensCopy));

console.log(JSON.stringify(new CharLexerCopy(inputStr)));

console.log(process.memoryUsage().heapUsed);