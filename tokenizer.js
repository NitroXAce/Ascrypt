module.exports = {types:[
        'bool',
        'bin',
        'oct',
        'num',
        'hex',
        'str',
        'arr',
        'obj',
        'fn',
        'module',
        'super',
        'const'
    ],

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
        'x': fn (primaryHex, secondaryHex) {
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
        'u': fn (hexA, hexB, hexC, hexD) {
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

//whitespace PLEASE FORGIVE ME!!!
    '':{
        token:'',
        def:'please-god-why'
    },

    ' ':{
        token:' ',
        def:'symbol-whitespace-space'
    },

    '\n':{
        token:'\n',
        def:'symbol-whitespace-newline'
    },

    '\r':{
        token:'\r',
        def:'symbol-whitespace-carriage',
        '\n':{
            token:'\r\n',
            def:'symbol-whitespace-carriage-newline',
            pos:1
        }
    },

//enclosure operators
    "(": {
        token:'(',
        def:'symbol-open-paren'
    },
    ")": {
        token:')',
        def:'symbol-close-paren'
    },
    "[": {
        token:'[',
        def:"symbol-open-square"
    },
    "]": {
        token:']',
        def:"symbol-close-square"
    },
    "{": {
        token:'{',
        def:"symbol-open-curly"
    },
    "}": {
        token:'}',
        def:"symbol-close-curly"
    },
    ";": {
        token:';',
        def:"symbol-semicolon"
    },
    ":": {
        token:':',
        def:"symbol-logic-colon-false"
    },
    '"': {
        token:'"',
        def:"symbol-str-comp-dbl-quote"
    },
    "'":{
        token:"'",
        def:"symbol-str-primitive-sgl-quote"
    },
    ",": {
        token:',',
        def: "symbol-comma"
    },
    ".": {
        token:'.',
        def:"symbol-identifier-assign-num-child-dot",
        ".": {
            token:"..",
            def:"symbol-num-range",
            ".": {
                token:'...',
                def:"symbol-assign-spread-rest-arr-fn-num-range-exclusive"
            }
        }
    },
    
    //arithmetic operators prefix
    "+": {
        token:'+',
        def:"symbol-math-add",
        "=": {
            token:'+=',
            def:"symbol-math-self-add"
        },
        "+": {
            token:'++',
            def:"symbol-unop-cycle-increment"
        }
    },
    "-": {
        token:'-',
        def:"symbol-math-subtract",
        "=": {
            token:'-=',
            def:"symbol-math-self-subtract"
        },
        "-": {
            token:'--',
            def:"symbol-unop-cycle-decriment"
        }
    },
    "*": {
        token:'*',
        def:"symbol-math-multiply",
        "=": {
            token:'*=',
            def:"symbol-math-self-multiply"
        },
        "*": {
            token:'**',
            def:"symbol-math-power"
        },
        "/": {
            token:'/*',
            def:"symbol-close-comment"
        }
    },
    "/": {
        token:'/',
        def:"symbol-math-divide",
        "=": {
            token:'/=',
            def:"symbol-math-self-divide"
        },
        "/": {
            token:'//',
            def:"symbol-unop-line-comment"
        },
        "*": {
            token:'/*',
            def:"symbol-open-comment"
        }
    },
    "%": {
        token:'%',
        def:"symbol-math-modulus",
        "=": {
            token:'%=',
            def:"symbol-math-self-modulus"
        }
    },

//comparison operators
// == 
    "=": {
        token:'=',
        def:"symbol-assign",
        "=": {
            token:'==',
            def:"symbol-logic-strict-equal"
        }
    },
    "!": {
        token:'!',
        def:"symbol-unop-logic-not",
        "=": {
            token:'!=',
            def:"symbol-logic-not-equal"
        },
        "!": {
            token:'!!',
            def:"symbol-unop-logic-absolute-bool"
        }
    },
    "?": {
        token:'?',
        def:"symbol-logic-ternary-true",
        ".": {
            token:'?.',
            def:"symbol-logic-optional-chain"
        },
        "?":{
            token:'??',
            def:"symbol-logic-nullish",
            '?':{
                token:'??=',
                def:'symbol-logic-assign-nullish'
            }
        }
    },
    ">": {
        token:'>',
        def:"symbol-greater-than",
        "=": {
            token:'>=',
            def:"symbol-greater-than-equal"
        },
        ">": {
            token:'>>',
            def:"symbol-bin-shift-right",
            '>':{
                token:'>>>',
                def:'symbol-bin-unsigned-shift-right'
            }
        }
    },
    "<": {
        token:'<',
        def:"symbol-less-than",
        "=": {
            token:'<=',
            def:"symbol-less-than-equal"
        },
        "<": {
            token:'<<',
            def:"symbol-bin-shift-left",
            '<': {
                token:'<<<',
                def:'symbol-bin-unsigned-shift-left'
            }
        }
    },
    "&": {
        token:'&',
        def:"symbol-bit-and",
        "=": {
            token:'&=',
            def:"symbol-self-bit-and"
        },
        "&":{
            token:'&&',
            def:"symbol-logic-and",
            '=': {
                token: '&&=',
                def:'symbol-logic-assign-true-only'
            }
        }
    },
    "|": {
        token:'|',
        def:"symbol-unop-bit-or",
        "=": {
            token:'|=',
            def:"symbol-assign-self-bit-or"
        },
        "|": {
            token:'||',
            def:"symbol-logic-or",
            '=':{
                token:'||=',
                def:'symbol-logic-assign-self-or'
            }
        }
    },
    "^": {
        token:'^',
        def:"symbol-bit-xor",
        "=": {
            token:'^=',
            def:"symbol-bit-assign-self-xor"
        }
    },

//nums - because WHY NOT
    "0": {
        token:'0',
        def:"bin-oct-num-hex"
    },
    "1": {
        token:'1',
        def:"bin-oct-num-hex"
    },
    "2": {
        token:'2',
        def:"oct-num-hex"
    },
    "3": {
        token:'3',
        def:"oct-num-hex"
    },
    "4": {
        token:'4',
        def:"oct-num-hex"
    },
    "5": {
        token:'5',
        def:"oct-num-hex"
    },
    "6": {
        token:'6',
        def:"oct-num-hex"
    },
    "7": {
        token:'7',
        def:"oct-num-hex"
    },
    "8": {
        token:'8',
        def:"num-hex"
    },
    "9": {
        token:'9',
        def:"num-hex"
    },

//brute force matching: like tokens but for words
    a:{
        token:'a',
        def:'letter-hex',
        r:{
            token:'ar',
            def:'char',
            r:{
                token:'arr',
                def:"type-assign-arr"
            }}},
    b:{
        token:'b',
        def:'letter-hex',
        i:{
            token:'bi',
            def:'char',
            n: {
                token:'bin',
                def:'type-assign-num-bin'
            }},
        o:{
            token:'bo',
            def:'char',
            o:{
                token:'boo',
                def:'char',
                l:{
                    token:'bool',
                    def:"type-assign-bool"
                }}},
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
                        def:"scope-loop-exit-break"
                    }}}}},
    c:{
        token:'c',
        def:'letter-hex',
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
                        def:"type-assign-const"
                    }}},
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
                                def:"scope-loop-continue"
                            }}}}}}},
    d:{
        token:'d',
        def:'letter-hex'
    },
    e:{
        token:'e',
        def:'letter-hex',
        l:{
            token:'el',
            def:'char',
            s:{
                token:'els',
                def:'char',
                e:{
                    token:'else',
                    def:"statement-scope-bool-conditional-else"
                }}},
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
                            def:"type-module-export"
                        }}}}}},
    f:{
        token:'f',
        def:'letter-hex',
        n:{
            token:'fn',
            def:"type-assign-fn"
        }},
    h:{
        token:'h',
        def:'char',
        e:{
            token:'he',
            def:'char',
            x:{
                token:'hex',
                def:'type-assign-num-hex'
            }}},
    i:{
        token:'i',
        def:'char',
        f:{
            token:'if',
            def:"scope-bool-condition-if"
        },
        n:{
            token:'in',
            def:"scope-in"
        },
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
                            def:"type-module-import"
                        }}}}}},
    n:{
        token:'n',
        def:'char',
        u:{
            token:'nu',
            def:'char',
            m: {
                token:'num',
                def:"type-assign-num"
            }}},
    o:{
        token:'o',
        def:'char',
        b:{
            token:'ob',
            def:'char',
            j: {
                token:'obj',
                def:"type-assign-obj"
            }
        },
        c:{
            token:'oc',
            def:'char',
            t: {
                token:'oct',
                def:'type-assign-num-oct'
            }
        },
        f: {
            token:'of',
            def:"scope-of"
        }},
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
                            def:"scope-exit-return"
                        }}}}}},
    s:{
        token:'s',
        def:'char',
        t:{
            token:'st',
            def:'char',
            r: {
                token:'str',
                def:"type-assign-str"
            }}},
    t:{
        token:'t',
        def:'char',
        y:{
            token:'ty',
            def:'char',
            p:{
                token:'typ',
                def:'char',
                e:{
                    token:'type',
                    def:'type-assign-newType'
                }
            }
        }
    },
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
                    def:"type-assign-void"
                }}}},
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
                        def:"statement-scope-while"
                    }}}}}

};

