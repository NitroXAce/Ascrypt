module.exports = { __proto__: null,
    types:[
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
    /*'': { __proto__: null,
        token:'',
        def:'char'
    },*/
    /*"\\": { __proto__: null,
        '': { __proto__: null,
            token: '\\',
            def: 'str-regex-escape-char'
        },
        'x': fn (primaryHex, secondaryHex) { __proto__: null,
            this.hexList = '0123456789abcdef';
            this.boolSet = [0, 0];
            for (this.hex in this.hexList)
                for (this.a in arguments)
                    if (this.a < this.boolSet.length && arguments[this.a] == this.hex)
                        this.boolSet[this.a] = 1;
            if (!!this.boolSet[0] && !!this.boolSet[1]) return { __proto__: null,
                token: '\\x' + primaryHex + secondaryHex,
                def: 'char-hex'
            }; else return { __proto__: null,
                error: 'TokenError: this current token does not match its parameters, try again!'
            };
        },
        'u': fn (hexA, hexB, hexC, hexD) { __proto__: null,
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
            ) return { __proto__: null,
                token: '\\u' + hexA + hexB + hexC + hexD,
                def: 'char-unicode'
            }; else return { __proto__: null,
                error: 'TokenError: this current token does not match its parameters, try again!'
            };
        },
    },*/

    //whitespace PLEASE FORGIVE ME!!!
    '':{ __proto__: null,
        token:'',
        def:'please-god-why'
    },
    ' ':{ __proto__: null,
        token:' ',
        def:{ __proto__: null,
            symbol:true,
            whitespace:true,
            space:true,
            char:true
        }
    },
    '\n':{ __proto__: null,
        token:'\n',
        def:{ __proto__: null,
            symbol:true,
            whitespace:true,
            newline:true,
            char:true
        }
    },
    '\r':{ __proto__: null,
        token:'\r',
        def:{ __proto__: null,
            symbol:true,
            whitespace:true,
            carriage:true,
            char:true
        },
        '\n':{ __proto__: null,
            token:'\r\n',
            def:{ __proto__: null,
                symbol:true,
                whitespace:true,
                carriage:true,
                newline:true,
                char:true
            },
            pos:true
        }
    },
    '\t':{ __proto__: null,
        token:'\t',
        def:{ __proto__: null,
            symbol:true,
            whitespace:true,
            tab:true,
            char:true
        }
    },

    //escape character and its derivatives
    '\\':{ __proto__: null,
        token:'\\',
        def:{ __proto__: null,
            symbol:true,
            escape:true
        },
        '\'':{ __proto__: null,
            token:"\\'",
            def:{ __proto__: null,
                symbol:true,
                escape:true,
                str:true,
                sgl:true,
                quote:true
            }
        },
        '"':{ __proto__: null,
            token:'\\"',
            def:{ __proto__: null,
                symbol:true,
                escape:true,
                str:true,
                dbl:true,
                quote:true
            }
        }
    },

    //enclosure operators
    "(": { __proto__: null,
        token:'(',
        def:{ __proto__: null,
            symbol:true,
            open:true,
            paren:true
        }
    },
    ")": { __proto__: null,
        token:')',
        def:{ __proto__: null,
            symbol:true,
            close:true,
            paren:true
        }
    },
    "[": { __proto__: null,
        token:'[',
        def:{ __proto__: null,
            symbol:true,
            open:true,
            square:true
        }
    },
    "]": { __proto__: null,
        token:']',
        def:{ __proto__: null,
            symbol:true,
            close:true,
            square:true
        }
    },
    "{ __proto__: null,": { __proto__: null,
        token:'{ __proto__: null,',
        def:{ __proto__: null,
            symbol:true,
            open:true,
            curly:true
        }
    },
    "}": { __proto__: null,
        token:'}',
        def:{ __proto__: null,
            symbol:true,
            close:true,
            curly:true
        }
    },
    ";": { __proto__: null,
        token:';',
        def:{ __proto__: null,
            symbol:true,
            semicolon:true
        }
    },
    ":": { __proto__: null,
        token:':',
        def:{ __proto__: null,
            symbol:true,
            logic:true,
            colon:true,
            false:true
        }
    },
    '"': { __proto__: null,
        token:'"',
        def:{ __proto__: null,
            symbol:true,
            str:true,
            comp:true,
            dbl:true,
            quote:true
        }
    },
    "'":{ __proto__: null,
        token:"'",
        def:{ __proto__: null,
            symbol:true,
            str:true,
            prim:true,
            sgl:true,
            quote:true
        }
    },
    ",": { __proto__: null,
        token:',',
        def:{ __proto__: null,
            symbol:true,
            comma:true
        }
    },
    ".": { __proto__: null,
        token:'.',
        def:{ __proto__: null,
            symbol:true,
            identifier:true,
            assign:true,
            num:true,
            child:true,
            dot:true
        },
        ".": { __proto__: null,
            token:"..",
            def:{ __proto__: null,
                symbol:true,
                num:true,
                range:true
            },
            ".": { __proto__: null,
                token:'...',
                def:{ __proto__: null,
                    symbol:true,
                    assign:true,
                    spread:true,
                    rest:true,
                    arr:true,
                    fn:true,
                    num:true,
                    range:true,
                    exclusive:true
                }
            }
        }
    },
    
    //arithmetic operators prefix
    "+": { __proto__: null,
        token:'+',
        def:{ __proto__: null,
            symbol:true,
            math:true,
            add:true
        },
        "=": { __proto__: null,
            token:'+=',
            def:{ __proto__: null,
                symbol:true,
                math:true,
                self:true,
                add:true
            }
        },
        "+": { __proto__: null,
            token:'++',
            def:{ __proto__: null,
                symbol:true,
                unop:true,
                cycle:true,
                increment:true
            }
        }
    },
    "-": { __proto__: null,
        token:'-',
        def:{ __proto__: null,
            symbol:true,
            math:true,
            subtract:true
        },
        "=": { __proto__: null,
            token:'-=',
            def:{ __proto__: null,
                symbol:true,
                math:true,
                self:true,
                subtract:true
            }
        },
        "-": { __proto__: null,
            token:'--',
            def:{ __proto__: null,
                symbol:true,
                unop:true,
                cycle:true,
                decrement:true
            }
        }
    },
    "*": { __proto__: null,
        token:'*',
        def:{ __proto__: null,
            symbol:true,
            math:true,
            multiply:true
        },
        "=": { __proto__: null,
            token:'*=',
            def:{ __proto__: null,
                symbol:true,
                math:true,
                self:true,
                multiply:true
            }
        },
        "*": { __proto__: null,
            token:'**',
            def:{ __proto__: null,
                symbol:true,
                math:true,
                power:true
            }
        },
        "/": { __proto__: null,
            token:'*/',
            def:{ __proto__: null,
                symbol:true,
                close:true,
                comment:true
            }
        }
    },
    "/": { __proto__: null,
        token:'/',
        def:{ __proto__: null,
            symbol:true,
            math:true,
            divide:true
        },
        "=": { __proto__: null,
            token:'/=',
            def:{ __proto__: null,
                symbol:true,
                math:true,
                self:true,
                divide:true
            }
        },
        "/": { __proto__: null,
            token:'//',
            def:{ __proto__: null,
                symbol:true,
                unop:true,
                line:true,
                comment:true
            }
        },
        "*": { __proto__: null,
            token:'/*',
            def:{ __proto__: null,
                symbol:true,
                open:true,
                comment:true
            }
        }
    },
    "%": { __proto__: null,
        token:'%',
        def:{ __proto__: null,
            symbol:true,
            math:true,
            modulus:true
        },
        "=": { __proto__: null,
            token:'%=',
            def:{ __proto__: null,
                symbol:true,
                math:true,
                self:true,
                modulus:true
            }
        }
    },

    //comparison operators
    // == 
    "=": { __proto__: null,
        token:'=',
        def:{ __proto__: null,
            symbol:true,
            assign:true
        },
        "=": { __proto__: null,
            token:'==',
            def:{ __proto__: null,
                symbol:true,
                logic:true,
                strict:true,
                equal:true
            }
        }
    },
    "!": { __proto__: null,
        token:'!',
        def:{ __proto__: null,
            symbol:true,
            unop:true,
            logic:true,
            not:true
        },
        "=": { __proto__: null,
            token:'!=',
            def:{ __proto__: null,
                symbol:true,
                logic:true,
                not:true,
                equal:true
            }
        },
        "!": { __proto__: null,
            token:'!!',
            def:{ __proto__: null,
                symbol:true,
                unop:true,
                logic:true,
                absolute:true,
                bool:true
            }
        }
    },
    "?": { __proto__: null,
        token:'?',
        def:{ __proto__: null,
            symbol:true,
            logic:true,
            ternary:true,
            true:true
        },
        ".": { __proto__: null,
            token:'?.',
            def:{ __proto__: null,
                symbol:true,
                logic:true,
                optional:true,
                chain:true
            }
        },
        "?":{ __proto__: null,
            token:'??',
            def:{ __proto__: null,
                symbol:true,
                logic:true,
                nullish:true
            },
            '?':{ __proto__: null,
                token:'??=',
                def:{ __proto__: null,
                    symbol:true,
                    logic:true,
                    assign:true,
                    nullish:true
                }
            }
        }
    },
    ">": { __proto__: null,
        token:'>',
        def:{ __proto__: null,
            symbol:true,
            greater:true,
            than:true
        },
        "=": { __proto__: null,
            token:'>=',
            def:{ __proto__: null,
                symbol:true,
                greater:true,
                than:true,
                equal:true
            }
        },
        ">": { __proto__: null,
            token:'>>',
            def:{ __proto__: null,
                symbol:true,
                bin:true,
                shift:true,
                right:true
            },
            '>':{ __proto__: null,
                token:'>>>',
                def:{ __proto__: null,
                    symbol:true,
                    bin:true,
                    unsigned:true,
                    shift:true,
                    right:true
                }
            }
        }
    },
    "<": { __proto__: null,
        token:'<',
        def:{ __proto__: null,
            symbol:true,
            less:true,
            than:true
        },
        "=": { __proto__: null,
            token:'<=',
            def:{ __proto__: null,
                symbol:true,
                less:true,
                than:true,
                equal:true
            }
        },
        "<": { __proto__: null,
            token:'<<',
            def:{ __proto__: null,
                symbol:true,
                bin:true,
                shift:true,
                left:true
            },
            '<': { __proto__: null,
                token:'<<<',
                def:{ __proto__: null,
                    symbol:true,
                    bin:true,
                    unsigned:true,
                    shift:true,
                    left:true
                }
            }
        }
    },
    "&": { __proto__: null,
        token:'&',
        def:{ __proto__: null,
            symbol:true,
            bit:true,
            and:true
        },
        "=": { __proto__: null,
            token:'&=',
            def:{ __proto__: null,
                symbol:true,
                bit:true,
                assign:true,
                and:true
            }
        },
        "&":{ __proto__: null,
            token:'&&',
            def:{ __proto__: null,
                symbol:true,
                logic:true,
                and:true
            },
            '=': { __proto__: null,
                token: '&&=',
                def:{ __proto__: null,
                    symbol:true,
                    logic:true,
                    assign:true,
                    true:true,
                    only:true
                }
            }
        }
    },
    "|": { __proto__: null,
        token:'|',
        def:{ __proto__: null,
            symbol:true,
            bit:true,
            or:true
        },
        "=": { __proto__: null,
            token:'|=',
            def:{ __proto__: null,
                symbol:true,
                bit:true,
                assign:true,
                or:true
            }
        },
        "|": { __proto__: null,
            token:'||',
            def:{ __proto__: null,
                symbol:true,
                logic:true,
                or:true
            },
            '=':{ __proto__: null,
                token:'||=',
                def:{ __proto__: null,
                    symbol:true,
                    logic:true,
                    assign:true,
                    self:true,
                    or:true
                }
            }
        }
    },
    "^": { __proto__: null,
        token:'^',
        def:{ __proto__: null,
            symbol:true,
            bit:true,
            xor:true
        },
        "=": { __proto__: null,
            token:'^=',
            def:{ __proto__: null,
                symbol:true,
                bit:true,
                assign:true,
                self:true,
                xor:true
            }
        }
    },

    //nums - because WHY NOT
    "0": { __proto__: null,
        token:'0',
        def:{ __proto__: null,
            bin:true,
            oct:true,
            num:true,
            hex:true
        }
    },
    "1": { __proto__: null,
        token:'1',
        def:{ __proto__: null,
            bin:true,
            oct:true,
            num:true,
            hex:true
        }
    },
    "2": { __proto__: null,
        token:'2',
        def:{ __proto__: null,
            oct:true,
            num:true,
            hex:true
        }
    },
    "3": { __proto__: null,
        token:'3',
        def:{ __proto__: null,
            oct:true,
            num:true,
            hex:true
        }
    },
    "4": { __proto__: null,
        token:'4',
        def:{ __proto__: null,
            oct:true,
            num:true,
            hex:true
        }
    },
    "5": { __proto__: null,
        token:'5',
        def:{ __proto__: null,
            oct:true,
            num:true,
            hex:true
        }
    },
    "6": { __proto__: null,
        token:'6',
        def:{ __proto__: null,
            oct:true,
            num:true,
            hex:true
        }
    },
    "7": { __proto__: null,
        token:'7',
        def:{ __proto__: null,
            oct:true,
            num:true,
            hex:true
        }
    },
    "8": { __proto__: null,
        token:'8',
        def:{ __proto__: null,
            num:true,
            hex:true
        }
    },
    "9": { __proto__: null,
        token:'9',
        def:{ __proto__: null,
            num:true,
            hex:true
        }
    },

    //brute force matching: like tokens but for words
    a:{ __proto__: null,
        token:'a',
        def:{ __proto__: null,
            letter:true,
            hex:true
        },
        r:{ __proto__: null,
            token:'ar',
            def:{ __proto__: null,
                letter:true
            },
            r:{ __proto__: null,
                token:'arr',
                def:{ __proto__: null,
                    res:true,
                    type:true,
                    assign:true,
                    arr:true
                }
            }
        }
    },
    A:{ __proto__: null,
        token:'A',
        def:{ __proto__: null,
            char:true
        },
        r:{ __proto__: null,
            token:'Ar',
            def:{ __proto__: null,
                char:true
            },
            r:{ __proto__: null,
                token:'Arr',
                def:{ __proto__: null,
                    res:true,
                    typeof:true,
                    assign:true,
                    arr:true
                },
                '{ __proto__: null,':{ __proto__: null,
                    error:'SyntaxError: Malformed token, expected \'}\' after "Arr"',
                    '}':{ __proto__: null,
                        token:'Arr{ __proto__: null,}',
                        def:{ __proto__: null,
                            res:true,
                            typeof:true,
                            Arr:true,
                            Array:true,
                            Collection:true
                        }
                    }
                },
                '[':{ __proto__: null,
                    error:'SyntaxError: Malformed token, expected \']\' after "Arr"',
                    ']':{ __proto__: null,
                        token:'Arr[]',
                        def:{ __proto__: null,
                            res:true,
                            typeof:true,
                            Arr:true,
                            Array:true,
                            List:true
                        }
                    }
                },
                '(':{ __proto__: null,
                    error:'SyntaxError: Malformed token, expected \')\' after "Arr"',
                    ')':{ __proto__: null,
                        token:'Arr()',
                        def:{ __proto__: null,
                            res:true,
                            typeof:true,
                            Arr:true,
                            Array:true,
                            Call:true
                        }
                    }
                }
            }
        }
    },
    b:{ __proto__: null,
        token:'b',
        def:{ __proto__: null,
            letter:true,
            hex:true
        },
        i:{ __proto__: null,
            token:'bi',
            def:{ __proto__: null,
                char:true
            },
            n: { __proto__: null,
                token:'bin',
                def:{ __proto__: null,
                    res:true,
                    type:true,
                    assign:true,
                    num:true,
                    bin:true
                }
            }
        },
        o:{ __proto__: null,
            token:'bo',
            def:{ __proto__: null,
                char:true
            },
            o:{ __proto__: null,
                token:'boo',
                def:{ __proto__: null,
                    char:true
                },
                l:{ __proto__: null,
                    token:'bool',
                    def:{ __proto__: null,
                        res:true,
                        type:true,
                        assign:true,
                        bool:true
                    }
                }
            }
        },
        r:{ __proto__: null,
            token:'br',
            def:{ __proto__: null,
                char:true
            },
            e:{ __proto__: null,
                token:'bre',
                def:{ __proto__: null,
                    char:true
                },
                a:{ __proto__: null,
                    token:'brea',
                    def:{ __proto__: null,
                        char:true
                    },
                    k:{ __proto__: null,
                        token:'break',
                        def:{ __proto__: null,
                            res:true,
                            scope:true,
                            loop:true,
                            exit:true,
                            break:true
                        }
                    }
                }
            }
        }
    },
    B:{ __proto__: null,
        token:'B',
        def:{ __proto__: null,
            char:true
        },
        i:{ __proto__: null,
            token:'Bi',
            def:{ __proto__: null,
                char:true
            },
            n: { __proto__: null,
                token:'Bin',
                def:{ __proto__: null,
                    res:true,
                    typeof:true,
                    Bin:true,
                    Binary:true
                },
                '{ __proto__: null,':{ __proto__: null,
                    error:'SyntaxError: Malformed token, expected \'}\' after "Bin"',
                    '}':{ __proto__: null,
                        token:'Bin{ __proto__: null,}',
                        def:{ __proto__: null,
                            res:true,
                            typeof:true,
                            Bin:true,
                            Binary:true,
                            Collection:true
                        }
                    }
                },
                '[':{ __proto__: null,
                    error:'SyntaxError: Malformed token, expected \']\' after "Bin"',
                    ']':{ __proto__: null,
                        token:'Bin[]',
                        def:{ __proto__: null,
                            res:true,
                            typeof:true,
                            Bin:true,
                            Binary:true,
                            List:true
                        }
                    }
                },
                '(':{ __proto__: null,
                    error:'SyntaxError: Malformed token, expected \')\' after "Bin"',
                    ')':{ __proto__: null,
                        token:'Bin()',
                        def:{ __proto__: null,
                            res:true,
                            typeof:true,
                            Bin:true,
                            Binary:true,
                            Call:true
                        }
                    }
                }
            }},
        o:{ __proto__: null,
            token:'Bo',
            def:{ __proto__: null,
                char:true
            },
            o:{ __proto__: null,
                token:'Boo',
                def:{ __proto__: null,
                    char:true
                },
                l:{ __proto__: null,
                    token:'Bool',
                    def:{ __proto__: null,
                        res:true,
                        typeof:true,
                        Bool:true,
                        Boolean:true
                    },
                    '{ __proto__: null,':{ __proto__: null,
                        error:'SyntaxError: Malformed token, expected \'}\' after "Bool"',
                        '}':{ __proto__: null,
                            token:'Bool{ __proto__: null,}',
                            def:{ __proto__: null,
                                res:true,
                                typeof:true,
                                Bool:true,
                                Boolean:true,
                                Collection:true
                            }
                        }
                    },
                    '[':{ __proto__: null,
                        error:'SyntaxError: Malformed token, expected \']\' after "Bool"',
                        ']':{ __proto__: null,
                            token:'Bool[]',
                            def:{ __proto__: null,
                                res:true,
                                typeof:true,
                                Bool:true,
                                Boolean:true,
                                List:true
                            }
                        }
                    },
                    '(':{ __proto__: null,
                        error:'SyntaxError: Malformed token, expected \')\' after "Bool"',
                        ')':{ __proto__: null,
                            token:'Bool()',
                            def:{ __proto__: null,
                                res:true,
                                typeof:true,
                                Bool:true,
                                Boolean:true,
                                Call:true
                            }
                        }
                    }
                }
            }
        }
    },
    c:{ __proto__: null,
        token:'c',
        def:{ __proto__: null,
            letter:true,
            hex:true
        },
        o:{ __proto__: null,
            token:'co',
            def:{ __proto__: null,
                char:true
            },
            n:{ __proto__: null,
                token:"con",
                def:{ __proto__: null,
                    char:true
                },
                s:{ __proto__: null,
                    token:'cons',
                    def:{ __proto__: null,
                        char:true
                    },
                    t:{ __proto__: null,
                        token:'const',
                        def:{ __proto__: null,
                            res:true,
                            type:true,
                            assign:true,
                            const:true
                        }
                    }
                },
                t:{ __proto__: null,
                    token:'cont',
                    def:{ __proto__: null,
                        char:true
                    },
                    i:{ __proto__: null,
                        token:'conti',
                        def:{ __proto__: null,
                            char:true
                        },
                        n:{ __proto__: null,
                            token:'contin',
                            def:{ __proto__: null,
                                char:true
                            },
                            u:{ __proto__: null,
                                token:'continu',
                                def:{ __proto__: null,
                                    char:true
                                },
                                e: { __proto__: null,
                                    token:'continue',
                                    def:{ __proto__: null,
                                        res:true,
                                        scope:true,
                                        loop:true,
                                        continue:true
                                    }
                                }
                            }
                        }
                    }
                }
            }            
        }
    },
    C:{ __proto__: null,
        token:'C',
        def:{ __proto__: null,
            char:true
        },
        o:{ __proto__: null,
            token:'Co',
            def:{ __proto__: null,
                char:true
            },
            n:{ __proto__: null,
                token:"Con",
                def:{ __proto__: null,
                    char:true
                },
                s:{ __proto__: null,
                    token:'Cons',
                    def:{ __proto__: null,
                        char:true
                    },
                    t:{ __proto__: null,
                        token:'Const',
                        def:{ __proto__: null,
                            res:true,
                            type:true,
                            const:true
                        },
                        '{ __proto__: null,':{ __proto__: null,
                            error:'SyntaxError: Malformed token, expected \'}\' after "Const"',
                            '}':{ __proto__: null,
                                token:'Const{ __proto__: null,}',
                                def:{ __proto__: null,
                                    res:true,
                                    type:true,
                                    const:true,
                                    collection:true
                                }
                            }
                        },
                        '[':{ __proto__: null,
                            error:'SyntaxError: Malformed token, expected \']\' after "Const"',
                            ']':{ __proto__: null,
                                token:'Const[]',
                                def:{ __proto__: null,
                                    res:true,
                                    type:true,
                                    const:true,
                                    list:true
                                }
                            }
                        },
                        '(':{ __proto__: null,
                            error:'SyntaxError: Malformed token, expected \')\' after "Const"',
                            ')':{ __proto__: null,
                                token:'Const()',
                                def:{ __proto__: null,
                                    res:true,
                                    type:true,
                                    const:true,
                                    call:true
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    d:{ __proto__: null,
        token:'d',
        def:{ __proto__: null,
            letter:true,
            hex:true
        }
    },
    e:{ __proto__: null,
        token:'e',
        def:{ __proto__: null,
            letter:true,
            hex:true
        },
        l:{ __proto__: null,
            token:'el',
            def:{ __proto__: null,
                char:true
            },
            s:{ __proto__: null,
                token:'els',
                def:{ __proto__: null,
                    char:true
                },
                e:{ __proto__: null,
                    token:'else',
                    def:{ __proto__: null,
                        res:true,
                        statement:true,
                        scope:true,
                        bool:true,
                        conditional:true,
                        else:true
                    }
                }
            }
        },
        x:{ __proto__: null,
            token:'ex',
            def:{ __proto__: null,
                char:true
            },
            p:{ __proto__: null,
                token:'exp',
                def:{ __proto__: null,
                    char:true
                },
                o:{ __proto__: null,
                    token:'expo',
                    def:{ __proto__: null,
                        char:true
                    },
                    r:{ __proto__: null,
                        token:'expor',
                        def:{ __proto__: null,
                            char:true
                        },
                        t:{ __proto__: null,
                            token:'export',
                            def:{ __proto__: null,
                                res:true,
                                type:true,
                                module:true,
                                export:true
                            }
                        }
                    }
                }
            }
        }
    },
    f:{ __proto__: null,
        token:'f',
        def:{ __proto__: null,
            letter:true,
            hex:true
        },
        a:{ __proto__: null,
            token:'fa',
            def:{ __proto__: null,
                char:true
            },
            l:{ __proto__: null,
                token:'fal',
                def:{ __proto__: null,
                    char:true
                },
                s:{ __proto__: null,
                    token:'fals',
                    def:{ __proto__: null,
                        char:true
                    },
                    e:{ __proto__: null,
                        token:'false',
                        def:{ __proto__: null,
                            res:true,
                            value:true,
                            bool:true,
                            false:true
                        }
                    }
                }
            }
        },
        n:{ __proto__: null,
            token:'fn',
            def:{ __proto__: null,
                res:true,
                type:true,
                assign:true,
                fn:true
            }
        }
    },
    F:{ __proto__: null,
        token:'F',
        def:{ __proto__: null,
            char:true
        },
        n:{ __proto__: null,
            token:'Fn',
            def:{ __proto__: null,
                res:true,
                typeof:true,
                Fn:true,
                Function:true
            }
        }
    },
    h:{ __proto__: null,
        token:'h',
        def:{ __proto__: null,
            char:true
        },
        e:{ __proto__: null,
            token:'he',
            def:{ __proto__: null,
                char:true
            },
            x:{ __proto__: null,
                token:'hex',
                def:{ __proto__: null,
                    res:true,
                    type:true,
                    assign:true,
                    num:true,
                    hex:true
                }
            }
        }
    },
    i:{ __proto__: null,
        token:'i',
        def:{ __proto__: null,
            char:true
        },
        f:{ __proto__: null,
            token:'if',
            def:{ __proto__: null,
                res:true,
                scope:true,
                bool:true,
                condition:true,
                if:true
            }
        },
        n:{ __proto__: null,
            token:'in',
            def:{ __proto__: null,
                res:true,
                scope:true,
                in:true
            }
        },
        m:{ __proto__: null,
            token:'im',
            def:{ __proto__: null,
                char:true
            },
            p:{ __proto__: null,
                token:'imp',
                def:{ __proto__: null,
                    char:true
                },
                o:{ __proto__: null,
                    token:'impo',
                    def:{ __proto__: null,
                        char:true
                    },
                    r:{ __proto__: null,
                        token:'impor',
                        def:{ __proto__: null,
                            char:true
                        },
                        t:{ __proto__: null,
                            token:'import',
                            def:{ __proto__: null,
                                res:true,
                                type:true,
                                module:true,
                                import:true
                            }
                        }
                    }
                }
            }
        }
    },
    n:{ __proto__: null,
        token:'n',
        def:{ __proto__: null,
            char:true
        },
        u:{ __proto__: null,
            token:'nu',
            def:{ __proto__: null,
                char:true
            },
            m: { __proto__: null,
                token:'num',
                def:{ __proto__: null,
                    res:true,
                    type:true,
                    assign:true,
                    num:true
                }
            }
        }
    },
    o:{ __proto__: null,
        token:'o',
        def:{ __proto__: null,
            char:true
        },
        b:{ __proto__: null,
            token:'ob',
            def:{ __proto__: null,
                char:true
            },
            j: { __proto__: null,
                token:'obj',
                def:{ __proto__: null,
                    res:true,
                    type:true,
                    assign:true,
                    obj:true
                }
            }
        },
        c:{ __proto__: null,
            token:'oc',
            def:{ __proto__: null,
                char:true
            },
            t: { __proto__: null,
                token:'oct',
                def:{ __proto__: null,
                    res:true,
                    type:true,
                    assign:true,
                    num:true,
                    oct:true
                }
            }
        },
        f: { __proto__: null,
            token:'of',
            def:{ __proto__: null,
                res:true,
                scope:true,
                of:true
            }
        }
    },
    O:{ __proto__: null,
        token:'O',
        def:{ __proto__: null,
            char:true
        },
        c:{ __proto__: null,
            token:'Oc',
            def:{ __proto__: null,
                char:true
            },
            t:{ __proto__: null,
                token:'Oct',
                def:{ __proto__: null,
                    res:true,
                    typeof:true,
                    Oct:true,
                    Octal:true
                },
                '{ __proto__: null,':{ __proto__: null,
                    error:'SyntaxError: Malformed token, expected \'}\' after "Oct"',
                    '}':{ __proto__: null,
                        token:'Oct{ __proto__: null,}',
                        def:{ __proto__: null,
                            res:true,
                            typeof:true,
                            Oct:true,
                            Octal:true,
                            Collection:true
                        }
                    }
                },
                '[':{ __proto__: null,
                    error:'SyntaxError: Malformed token, expected \']\' after "Oct"',
                    ']':{ __proto__: null,
                        token:'Oct[]',
                        def:{ __proto__: null,
                            res:true,
                            typeof:true,
                            Oct:true,
                            Octal:true,
                            List:true
                        }
                    }
                },
                '(':{ __proto__: null,
                    error:'SyntaxError: Malformed token, expected \')\' after "Oct"',
                    ')':{ __proto__: null,
                        token:'Oct()',
                        def:{ __proto__: null,
                            res:true,
                            typeof:true,
                            Oct:true,
                            Octal:true,
                            Call:true
                        }
                    }
                }
            }
        },
        b:{ __proto__: null,
            token:'Ob',
            def:{ __proto__: null,
                char:true
            },
            j:{ __proto__: null,
                token:'Obj',
                def:{ __proto__: null,
                    res:true,
                    typeof:true,
                    Obj:true,
                    Object:true
                },
                '{ __proto__: null,':{ __proto__: null,
                    error:'SyntaxError: Malformed token, expected \'}\' after "Obj"',
                    '}':{ __proto__: null,
                        token:'Obj{ __proto__: null,}',
                        def:{ __proto__: null,
                            res:true,
                            typeof:true,
                            Obj:true,
                            Object:true,
                            Collection:true
                        }
                    }
                },
                '[':{ __proto__: null,
                    error:'SyntaxError: Malformed token, expected \']\' after "Obj"',
                    ']':{ __proto__: null,
                        token:'Obj[]',
                        def:{ __proto__: null,
                            res:true,
                            typeof:true,
                            Obj:true,
                            Object:true,
                            List:true
                        }
                    }
                },
                '(':{ __proto__: null,
                    error:'SyntaxError: Malformed token, expected \')\' after "Obj"',
                    ')':{ __proto__: null,
                        token:'Obj()',
                        def:{ __proto__: null,
                            res:true,
                            typeof:true,
                            Obj:true,
                            Object:true,
                            Call:true
                        }
                    }
                }
            }
        }
    },
    r:{ __proto__: null,
        token:'r',
        def:{ __proto__: null,
            char:true
        },
        e:{ __proto__: null,
            token:'re',
            def:{ __proto__: null,
                char:true
            },
            t:{ __proto__: null,
                token:'ret',
                def:{ __proto__: null,
                    char:true
                },
                u:{ __proto__: null,
                    token:'retu',
                    def:{ __proto__: null,
                        char:true
                    },
                    r:{ __proto__: null,
                        token:'retur',
                        def:{ __proto__: null,
                            char:true
                        },
                        n:{ __proto__: null,
                            token:'return',
                            def:{ __proto__: null,
                                res:true,
                                scope:true,
                                exit:true,
                                return:true
                            }
                        }
                    }
                }
            }
        }
    },
    s:{ __proto__: null,
        token:'s',
        def:{ __proto__: null,
            char:true
        },
        t:{ __proto__: null,
            token:'st',
            def:{ __proto__: null,
                char:true
            },
            r: { __proto__: null,
                token:'str',
                def:{ __proto__: null,
                    res:true,
                    type:true,
                    assign:true,
                    str:true
                }
            }
        }
    },
    S:{ __proto__: null,
        token:'S',
        def:{ __proto__: null,
            char:true
        },
        t:{ __proto__: null,
            token:'St',
            def:{ __proto__: null,
                char:true
            },
            r:{ __proto__: null,
                token:'Str',
                def:{ __proto__: null,
                    res:true,
                    typeof:true,
                    Str:true,
                    String:true
                },
                '{ __proto__: null,':{ __proto__: null,
                    error:'SyntaxError: Malformed token, expected \'}\' after "Str"',
                    '}':{ __proto__: null,
                        token:'Str{ __proto__: null,}',
                        def:{ __proto__: null,
                            res:true,
                            typeof:true,
                            Str:true,
                            String:true,
                            Collection:true
                        }
                    }
                },
                '[':{ __proto__: null,
                    error:'SyntaxError: Malformed token, expected \']\' after "Str"',
                    ']':{ __proto__: null,
                        token:'Str[]',
                        def:{ __proto__: null,
                            res:true,
                            typeof:true,
                            Str:true,
                            String:true,
                            List:true
                        }
                    }
                },
                '(':{ __proto__: null,
                    error:'SyntaxError: Malformed token, expected \')\' after "Str"',
                    ')':{ __proto__: null,
                        token:'Str()',
                        def:{ __proto__: null,
                            res:true,
                            typeof:true,
                            Str:true,
                            String:true,
                            Call:true
                        }
                    }
                }
            }
        }
    },
    t:{ __proto__: null,
        token:'t',
        def:{ __proto__: null,
            char:true
        },
        r:{ __proto__: null,
            token:'tr',
            def:{ __proto__: null,
                char:true
            },
            u:{ __proto__: null,
                token:'tru',
                def:{ __proto__: null,
                    char:true
                },
                e:{ __proto__: null,
                    token:'true',
                    def:{ __proto__: null,
                        res:true,
                        value:true,
                        bool:true,
                        true:true
                    }
                }
            }
        },
        y:{ __proto__: null,
            token:'ty',
            def:{ __proto__: null,
                char:true
            },
            p:{ __proto__: null,
                token:'typ',
                def:{ __proto__: null,
                    char:true
                },
                e:{ __proto__: null,
                    token:'type',
                    def:{ __proto__: null,
                        res:true,
                        type:true,
                        assign:true,
                        newType:true
                    }
                }
            }
        }
    },
    v:{ __proto__: null,
        token:'v',
        def:{ __proto__: null,
            char:true
        },
        o:{ __proto__: null,
            token:'vo',
            def:{ __proto__: null,
                char:true
            },
            i:{ __proto__: null,
                token:'voi',
                def:{ __proto__: null,
                    char:true
                },
                d: { __proto__: null,
                    token:'void',
                    def:{ __proto__: null,
                        res:true,
                        type:true,
                        assign:true,
                        void:true
                    }
                }
            }
        }
    },
    w:{ __proto__: null,
        token:'w',
        def:{ __proto__: null,
            char:true
        },
        h:{ __proto__: null,
            token:'wh',
            def:{ __proto__: null,
                char:true
            },
            i:{ __proto__: null,
                token:'whi',
                def:{ __proto__: null,
                    char:true
                },
                l:{ __proto__: null,
                    token:'whil',
                    def:{ __proto__: null,
                        char:true
                    },
                    e: { __proto__: null,
                        token:'while',
                        def:{ __proto__: null,
                            res:true,
                            statement:true,
                            scope:true,
                            while:true
                        }
                    }
                }
            }
        }
    }
};