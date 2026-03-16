module.exports = {
    tokens: {

        //default "chars"
        /*'': {
            token:'',
            def:'char'
        },*/

        //whitespace operators
        //' ': 'whitespace-space',
        //'\n': 'whitespace-new-line',
        //'\\': 'str-escape-letter',

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
            def:"str-compdbl-quote"
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
            "": {
                token:'.',
                def:"type-assign-child-dot"
            },
            ".": {
                "": {
                    token:"..",
                    def:"num-range"
                },
                ".": {
                    token:'...',
                    def:"spread-rest-arr-fn"
                },
            },
        },

        //arithmetic operators prefix
        "+": {
            "": {
                token:'+',
                def:"biop-math-add"
            },
            "=": {
                token:'+=',
                def:"self-add"
            },
            "+": {
                token:'++',
                def:"unop-cycle-incriment"
            },
        },
        "-": {
            "": {
                token:'-',
                def:"biop-math-subtract"
            },
            "=": {
                token:'-=',
                def:"self-subtract"
            },
            "-": {
                token:'--',
                def:"unop-cycle-decriment"
            }
        },
        "*": {
            "": {
                token:'*',
                def:"biop-multiply"
            },
            "=": {
                token:'*=',
                def:"self-multiply"
            },
            "*": {
                token:'**',
                def:"biop-power"
            },
            "/": {
                token:'/*',
                def:"close-comment"
            },
        },
        "/": {
            "": {
                token:'/',
                def:"biop-divide"
            },
            "=": {
                token:'/=',
                def:"self-divide"
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
            "": {
                token:'%',
                def:"math-biop-modulus"
            },
            "=": {
                token:'%=',
                def:"self-modulus"
            },
        },

        //comparison operators
        // == 
        "=": {
            "": {
                token:'=',
                def:"assign"
            },
            "=": {
                token:'==',
                def:"biop-logic-strict-equal"
            }
        },
        "!": {
            "": {
                token:'!',
                def:"unop-logic-not"
            },
            "=": {
                token:'!=',
                def:"biop-logic-not-equal"
            },
            "!": {
                token:'!!',
                def:"unop-logic-absolute-boolean"
            },
        },
        "?": {
            "": {
                token:'?',
                def:"logic-ternary-true"
            },
            ".": {
                token:'?.',
                def:"biop-logic-optional-chain"
            },
            "?":{
                '':{
                    token:'??',
                    def:"biop-logic-nullish"
                },
                '?':{
                    token:'??=',
                    def:'biop-logic-assign-nullish'
                }
            },
        },
        ">": {
            "": {
                token:'>',
                def:"biop-greater-than"
            },
            "=": {
                token:'>=',
                def:"greater-than-equal"
            },
            ">": {
                '':{
                    token:'>>',
                    def:"biop-bin-shift-right"
                },
                '>':{
                    token:'>>>',
                    def:'biop-bin-unsigned-shift-right'
                }
            }
        },
        "<": {
            "": {
                token:'<',
                def:"biop-less-than"
            },
            "=": {
                token:'<=',
                def:"less-than-equal"
            },
            "<": {
                '': {
                    token:'<<',
                    def:"biop-bin-shift-left"
                },
                '<': {
                    token:'<<<',
                    def:'biop-bin-unsigned-shift-left'
                }
            }
        },
        "&": {
            "": {
                token:'&',
                def:"biop-bit-and"
            },
            "=": {
                token:'&=',
                def:"self-bit-and"
            },
            "&":{
                '': {
                    token:'&&',
                    def:"biop-logic-and"
                },
                '=': {
                    token: '&&=',
                    def:'biop-logic-assign-true-only'
                }
            }
        },
        "|": {
            "": {
                token:'|',
                def:"unop-bit-or"
            },
            "=": {
                token:'|=',
                def:"assign-self-bit-or"
            },
            "|": {
                '':{
                    token:'||',
                    def:"biop-logic-or"
                },
                '=':{
                    token:'||=',
                    def:'biop-logic-assign-self-or'
                }
            },
        },
        "^": {
            "": {
                token:'^',
                def:"biop-bit-xor"
            },
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

        //words: {
        /*//types
            const: "type-assign-constant",
            bool: "type-assign-boolean",
            num: "type-assign-number",
            str: "type-assign-string",
            obj: "type-assign-object",
            arr: "type-assign-array",
            fn: "type-assign-function",
            void: "type-assign-void",
            super: "type-assign-superset",
            import: "type-module-import",
            export: "type-module-export",

            //scope words
            if: "scope-if",
            else: "scope-else",
            while: "scope-while",
            in: "scope-in",
            of: "scope-of",

            //escape words
            return: "scope-exit-return",
            break: "scope-exit-break",
            continue: "scope-exit-continue",*/

            /*let words = {
                arr: "type-assign-array",
                bool: "type-assign-boolean",
                break: "scope-exit-break",
                const: "type-assign-constant",
                continue: "scope-exit-continue",
                else: "scope-else",
                export: "type-module-export",
                fn: "type-assign-function",
                if: "scope-if",
                import: "type-module-import",
                in: "scope-in",
                num: "type-assign-number",
                obj: "type-assign-object",
                of: "scope-of",
                return: "scope-exit-return",
                str: "type-assign-string",
                super: "type-assign-superset",
                void: "type-assign-void",
                while: "scope-while"
            };*/
        //},

        //brute force matching: like tokens but for words
        a:{
            '':{
                token:'a',
                def:'letter-num-hex'},
            r:{
                '':{
                    token:'ar',
                    def:'char'},
                r:{
                    token:'arr',
                    def:"type-assign-array"}}},
        b:{
            '':{
                token:'b',
                def:'letter-num-hex'},
            i:{
                '':{
                    token:'bi',
                    def:'char'},
                n: {
                    token:'bin',
                    def:'type-assign-number-binary'}},
            o:{
                '':{
                    token:'bo',
                    def:'char'},
                o:{
                    '':{
                        token:'boo',
                        def:'char'},
                    l:{
                        token:'bool',
                        def:"type-assign-boolean"}}},
            r:{
                '':{
                    token:'br',
                    def:'char'},
                e:{
                    '':{
                        token:'bre',
                        def:'char'},
                    a:{
                        '':{
                            token:'brea',
                            def:'char'},
                        k:{
                            token:'break',
                            def:"scope-loop-exit-break"}}}}},
        c:{
            '':{
                token:'c',
                def:'letter-num-hex'},
            o:{
                '':{
                    token:'co',
                    def:'char'},
                n:{
                    '':{
                        token:"con",
                        def:'char'},
                    s:{
                        '':{
                            token:'cons',
                            def:'char'},
                        t:{
                            token:'const',
                            def:"type-assign-constant"}}},
                    t:{
                        '':{
                            token:'cont',
                            def:'char'},
                        i:{
                            '':{
                                token:'conti',
                                def:'char'},
                            n:{
                                '':{
                                    token:'contin',
                                    def:'char'},
                                u:{
                                    '':{
                                        token:'continu',
                                        def:'char'},
                                    e:"scope-loop-continue"
                                }}}}}},
        d:{
            token:'d',
            def:'letter-num-hex'},
        e:{
            '':{
                token:'e',
                def:'letter-num-hex'},
            l:{
                '':{
                    token:'el',
                    def:'char'},
                s:{
                    '':{
                        token:'els',
                        def:'char'},
                    e:{
                        token:'else',
                        def:"scope-bool-conditional-else"}}},
            x:{
                '':{
                    token:'ex',
                    def:'char'},
                p:{
                    '':{
                        token:'exp',
                        def:'char'},
                    o:{
                        '':{
                            token:'expo',
                            def:'char'},
                        r:{
                            '':{
                                token:'expor',
                                def:'char'},
                            t:{
                                token:'export',
                                def:"type-module-export"}}}}}},
        f:{
            '':{
                token:'f',
                def:'letter-num-hex'},
            n:{
                token:'fn',
                def:"type-assign-function"}},
        h:{
            '':{
                token:'h',
                def:'char'},
            e:{
                '':{
                    token:'he',
                    def:'char'},
                x:{
                    token:'hex',
                    def:'type-assign-number-hex'}}},
        i:{
            '':{
                token:'i',
                def:'char'},
            f:{
                token:'if',
                def:"scope-bool-condition-if"},
            n:{
                token:'in',
                def:"scope-in"},
            m:{
                '':{
                    token:'im',
                    def:'char'},
                p:{
                    '':{
                        token:'imp',
                        def:'char'},
                    o:{
                        '':{
                            token:'impo',
                            def:'char'},
                        r:{
                            '':{
                                token:'impor',
                                def:'char'},
                            t:{
                                token:'import',
                                def:"type-module-import"}}}}}},
        n:{
            '':'char',
            u:{
                '':'char',
                m:"type-assign-number"},
        o:{
            '':'char',
            b:{
                '':'char',
                j:"type-assign-object"
            },
            c:{
                '':'char',
                t:'type-assign-number-octal'
            },
            f:"scope-of"},
        r:{
            '':'char',
            e:{
                '':'char',
                t:{
                    '':'char',
                    u:{
                        '':'char',
                        r:{
                            '':'char',
                            n:"scope-exit-return"}}}}}},
        s:{
            '':'char',
            t:{
                '':'char',
                r:"type-assign-string"
            },
            u:{
                '':'char',
                p:{
                    '':'char',
                    e:{
                        '':'char',
                        r:"type-assign-superset"}}}},
        v:{
            '':'char',
            o:{
                '':'char',
                i:{
                    '':'char',
                    d:"type-assign-void"}}},
        w:{
            '':'char',
            h:{
                '':'char',
                i:{
                    '':'char',
                    l:{
                        '':'char',
                        e:"scope-while"}}}}},
};
