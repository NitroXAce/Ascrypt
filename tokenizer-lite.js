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
        def:'symbol-whitespace-space-char'
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
    '\t':{
        token:'\t',
        def:'symbol-whitespace-tab'
    },

    //escape character and its derivatives
    '\\':{
        token:'\\',
        def:'symbol-escape',
        '\'':{
            token:"\\'",
            def:'symbol-str-escape-sgl-quote'
        },
        '"':{
            token:'\\"',
            def:'symbol-str-escape-dbl-quote'
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
        def:"symbol-str-prim-sgl-quote"
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
            token:'*/',
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
    b:{
        token:'b',
        def:'letter-hex',
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
                        def:"res-scope-loop-exit-break"
                    }
                }
            }
        }
    },
    c:{
        token:'c',
        def:'letter-hex',
        o:{
            token:'co',
            def:'char',
            n:{
                token:"con",
                def:'char',
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
                                    def:"res-scope-loop-continue"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
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
                    def:"res-statement-scope-bool-conditional-else"
                }
            }
        },
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
                            def:"res-type-module-export"
                        }
                    }
                }
            }
        }
    },
    f:{
        token:'f',
        def:'letter-hex',
        a:{
            token:'fa',
            def:'char',
            l:{
                token:'fal',
                def:'char',
                s:{
                    token:'fals',
                    def:'char',
                    e:{
                        token:'false',
                        def:"res-value-bool-false"
                    }
                }
            }
        }
    },
    i:{
        token:'i',
        def:'char',
        f:{
            token:'if',
            def:"res-scope-bool-condition-if"
        },
        n:{
            token:'in',
            def:"res-scope-in"
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
                            def:"res-type-module-import"
                        }
                    }
                }
            }
        }
    },
    o:{
        token:'o',
        def:'char',
        f: {
            token:'of',
            def:"res-scope-of"
        }
    },
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
                            def:"res-scope-exit-return"
                        }
                    }
                }
            }
        }
    },
    t:{
        token:'t',
        def:'char',
        r:{
            token:'tr',
            def:'char',
            u:{
                token:'tru',
                def:'char',
                e:{
                    token:'true',
                    def:"res-value-bool-true"
                }
            }
        },
    },
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
                        def:"res-statement-scope-while"
                    }
                }
            }
        }
    }
};