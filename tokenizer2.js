module.exports = {

    //default "chars"
    /*'': {
        token:'',
        def:'char'
    },*/


    /*"\\": {
        '': {
            token: '\\',
            def: 'str-regex-escape-char'
        },
        'x': function (primaryHex, secondaryHex) {
            this.hexList = '0123456789abcdef';
            this.boolSet = [0, 0];
            for (this.hex in this.hexList)
                for (this.a in arguments)
                    if (this.a < this.boolSet.length && arguments[this.a] == this.hex)
                        this.boolSet[this.a] = 1;
            if (!!this.boolSet[0] && !!this.boolSet[1]) return {
                token: '\\x' + primaryHex + secondaryHex,
                def: 'char-hex'
            }; else return {
                error: 'TokenError: this current token does not match its parameters, try again!'
            };
        },
        'u': function (hexA, hexB, hexC, hexD) {
            this.hexList = '0123456789abcdef';
            this.boolSet = [0, 0, 0, 0];
            for (this.hex in this.hexList)
                for (this.a in arguments)
                    if (this.a < this.boolSet && arguments[this.a] == this.hex)
                        this.boolSet[this.a] = 1;
            if (
                !!this.boolSet[0] &&
                !!this.boolSet[1] &&
                !!this.boolSet[2] &&
                !!this.boolSet[3]
            ) return {
                token: '\\u' + hexA + hexB + hexC + hexD,
                def: 'char-unicode'
            }; else return {
                error: 'TokenError: this current token does not match its parameters, try again!'
            };
        },
    },*/


    //enclosure operators
    "(": {
        token:'(',
        def:'open-paren'
    },
    ")": {
        token:')',
        def:'close-paren'
    },
    "[": {
        token:'[',
        def:"open-square"
    },
    "]": {
        token:']',
        def:"close-square"
    },
    "{": {
        token:'{',
        def:"open-curly"
    },
    "}": {
        token:'}',
        def:"close-curly"
    },
    ";": {
        token:';',
        def:"semicolon"
    },
    ":": {
        token:':',
        def:"logic-colon-false"
    },
    '"': {
        token:'"',
        def:"str-comp-dbl-quote"
    },
    "'":{
        token:"'",
        def:"str-primitive-sgl-quote"
    },
    ",": {
        token:',',
        def: "comma"
    },
    ".": {
        token:'.',
        def:"type-assign-child-dot",
        ".": {
            token:"..",
            def:"num-range",
            ".": {
                token:'...',
                def:"assign-spread-rest-arr-fn"
            },
        },
    },


    //arithmetic operators prefix
    "+": {
        token:'+',
        def:"math-add",
        "=": {
            token:'+=',
            def:"math-self-add"
        },
        "+": {
            token:'++',
            def:"unop-cycle-increment"
        },
    },
    "-": {
        token:'-',
        def:"math-subtract",
        "=": {
            token:'-=',
            def:"math-self-subtract"
        },
        "-": {
            token:'--',
            def:"unop-cycle-decriment"
        }
    },
    "*": {
        token:'*',
        def:"math-multiply",
        "=": {
            token:'*=',
            def:"math-self-multiply"
        },
        "*": {
            token:'**',
            def:"math-power"
        },
        "/": {
            token:'/*',
            def:"close-comment"
        },
    },
    "/": {
        token:'/',
        def:"math-divide",
        "=": {
            token:'/=',
            def:"math-self-divide"
        },
        "/": {
            token:'//',
            def:"unop-line-comment"
        },
        "*": {
            token:'/*',
            def:"open-comment"
        },
    },
    "%": {
        token:'%',
        def:"math-modulus",
        "=": {
            token:'%=',
            def:"math-self-modulus"
        },
    },

    //comparison operators
    // == 
    "=": {
        token:'=',
        def:"assign",
        "=": {
            token:'==',
            def:"logic-strict-equal"
        }
    },
    "!": {
        token:'!',
        def:"unop-logic-not",
        "=": {
            token:'!=',
            def:"logic-not-equal"
        },
        "!": {
            token:'!!',
            def:"unop-logic-absolute-boolean"
        },
    },
    "?": {
        token:'?',
        def:"logic-ternary-true",
        ".": {
            token:'?.',
            def:"logic-optional-chain"
        },
        "?":{
            token:'??',
            def:"logic-nullish",
            '?':{
                token:'??=',
                def:'logic-assign-nullish'
            }
        },
    },
    ">": {
        token:'>',
        def:"greater-than",
        "=": {
            token:'>=',
            def:"greater-than-equal"
        },
        ">": {
            token:'>>',
            def:"bin-shift-right",
            '>':{
                token:'>>>',
                def:'bin-unsigned-shift-right'
            }
        }
    },
    "<": {
        token:'<',
        def:"less-than",
        "=": {
            token:'<=',
            def:"less-than-equal"
        },
        "<": {
            token:'<<',
            def:"bin-shift-left",
            '<': {
                token:'<<<',
                def:'bin-unsigned-shift-left'
            }
        }
    },
    "&": {
        token:'&',
        def:"bit-and",
        "=": {
            token:'&=',
            def:"self-bit-and"
        },
        "&":{
            token:'&&',
            def:"logic-and",
            '=': {
                token: '&&=',
                def:'logic-assign-true-only'
            }
        }
    },
    "|": {
        token:'|',
        def:"unop-bit-or",
        "=": {
            token:'|=',
            def:"assign-self-bit-or"
        },
        "|": {
            token:'||',
            def:"logic-or",
            '=':{
                token:'||=',
                def:'logic-assign-self-or'
            }
        },
    },
    "^": {
        token:'^',
        def:"bit-xor",
        "=": {
            token:'^=',
            def:"bit-assign-self-xor"
        },
    },

    //numbers - because WHY NOT
    "0": {
        token:'0',
        def:"num-bin-oct-dec-hex"
    },
    "1": {
        token:'1',
        def:"num-bin-oct-dec-hex"
    },
    "2": {
        token:'2',
        def:"num-oct-dec-hex"
    },
    "3": {
        token:'3',
        def:"num-oct-dec-hex"
    },
    "4": {
        token:'4',
        def:"num-oct-dec-hex"
    },
    "5": {
        token:'5',
        def:"num-oct-dec-hex"
    },
    "6": {
        token:'6',
        def:"num-oct-dec-hex"
    },
    "7": {
        token:'7',
        def:"num-oct-dec-hex"
    },
    "8": {
        token:'8',
        def:"num-dec-hex"
    },
    "9": {
        token:'9',
        def:"num-dec-hex"
    },

    //brute force matching: like tokens but for words
    a:{
        token:'a',
        def:'letter-num-hex',
        r:{
            token:'ar',
            def:'char',
            r:{
                token:'arr',
                def:"type-assign-array"}}},
    b:{
        token:'b',
        def:'letter-num-hex',
        i:{
            token:'bi',
            def:'char',
            n: {
                token:'bin',
                def:'type-assign-number-binary'}},
        o:{
            token:'bo',
            def:'char',
            o:{
                token:'boo',
                def:'char',
                l:{
                    token:'bool',
                    def:"type-assign-boolean"}}},
        r:{
            token:'br',
            def:'char',
            e:{
                token:'bre',
                def:'char',
                a:{
                    token:'brea',
                    def:'char',
                    k:{
                        token:'break',
                        def:"scope-loop-exit-break"}}}}},
    c:{
        token:'c',
        def:'letter-num-hex',
        o:{
            token:'co',
            def:'char',
            n:{
                token:"con",
                def:'char',
                s:{
                    token:'cons',
                    def:'char',
                    t:{
                        token:'const',
                        def:"type-assign-constant"}}},
            t:{
                token:'cont',
                def:'char',
                i:{
                    token:'conti',
                    def:'char',
                    n:{
                        token:'contin',
                        def:'char',
                        u:{
                            token:'continu',
                            def:'char',
                            e: {
                                token:'continue',
                                def:"scope-loop-continue"}}}}}}},
    d:{
        token:'d',
        def:'letter-num-hex'},
    e:{
        token:'e',
        def:'letter-num-hex',
        l:{
            token:'el',
            def:'char',
            s:{
                token:'els',
                def:'char',
                e:{
                    token:'else',
                    def:"scope-bool-conditional-else"}}},
        x:{
            token:'ex',
            def:'char',
            p:{
                token:'exp',
                def:'char',
                o:{
                    token:'expo',
                    def:'char',
                    r:{
                        token:'expor',
                        def:'char',
                        t:{
                            token:'export',
                            def:"type-module-export"}}}}}},
    f:{
        token:'f',
        def:'letter-num-hex',
        n:{
            token:'fn',
            def:"type-assign-function"}},
    h:{
        token:'h',
        def:'char',
        e:{
            token:'he',
            def:'char',
            x:{
                token:'hex',
                def:'type-assign-number-hex'}}},
    i:{
        token:'i',
        def:'char',
        f:{
            token:'if',
            def:"scope-bool-condition-if"},
        n:{
            token:'in',
            def:"scope-in"},
        m:{
            token:'im',
            def:'char',
            p:{
                token:'imp',
                def:'char',
                o:{
                    token:'impo',
                    def:'char',
                    r:{
                        token:'impor',
                        def:'char',
                        t:{
                            token:'import',
                            def:"type-module-import"}}}}}},
    n:{
        token:'n',
        def:'char',
        u:{
            token:'nu',
            def:'char',
            m: {
                token:'num',
                def:"type-assign-number"}},
        o:{
            token:'o',
            def:'char',
            b:{
                token:'ob',
                def:'char',
                j: {
                    token:'obj',
                    def:"type-assign-object"}
            },
            c:{
                token:'oc',
                def:'char',
                t: {
                    token:'oct',
                    def:'type-assign-number-octal'}
            },
            f: {
                token:'of',
                def:"scope-of"}},
        r:{
            token:'r',
            def:'char',
            e:{
                token:'re',
                def:'char',
                t:{
                    token:'ret',
                    def:'char',
                    u:{
                        token:'retu',
                        def:'char',
                        r:{
                            token:'retur',
                            def:'char',
                            n:{
                                token:'return',
                                def:"scope-exit-return"}}}}}}},

    s:{
        '': {
            token:'s',
            def:'char'},
        t:{
            '': {
                token:'st',
                def:'char'},
            r: {
                token:'str',
                def:"type-assign-string"}
        },
        u:{
            token:'su',
            def:'char',
            p:{
                token:'sup',
                def:'char',
                e:{
                    token:'supe',
                    def:'char',
                    r: {
                        token:'super',
                        def:"type-assign-superset"}}}}},
    v:{
        token:'v',
        def:'char',
        o:{
            token:'vo',
            def:'char',
            i:{
                token:'voi',
                def:'char',
                d: {
                    token:'void',
                    def:"type-assign-void"}}}},
    w:{
        token:'w',
        def:'char',
        h:{
            token:'wh',
            def:'char',
            i:{
                token:'whi',
                def:'char',
                l:{
                    token:'whil',
                    def:'char',
                    e: {
                        token:'while',
                        def:"scope-while"}}}}}
};
