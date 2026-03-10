module.exports = {
    tokens: {

        //default "chars"
        //'': 'char',

        //whitespace operators
        ' ': 'whitespace-space',
        '\n': 'whitespace-new-line',

        //enclosure operators
        "(": "open-paren",
        ")": "close-paren",
        "[": "open-square",
        "]": "close-square",
        "{": "open-curly",
        "}": "close-curly",
        ";": "semicolon",
        ":": "logic-colon-false",
        '\\':'escape-character',
        '"': "dbl-quote",
        "'": "sgl-quote",
        ",": "comma",
        ".": {
            "": "type-lex-assign-child-dot",
            ".": {
                "": "num-range",
                ".": "spread-rest",
            },
        },

        //arithmetic operators prefix
        "+": {
            "": "biop-math-add",
            "=": "self-add",
            "+": "unop-cycle-incriment",
        },
        "-": {
            "": "biop-math-subtract",
            "=": "self-subtract",
            "-": "unop-cycle-decriment",
        },
        "*": {
            "": "biop-multiply",
            "=": "self-multiply",
            "*": "biop-power",
            "/": "close-comment",
        },
        "/": {
            "": "biop-divide",
            "=": "self-divide",
            "/": "unop-line-comment",
            "*": "open-comment",
        },
        "%": {
            "": "biop-modulus",
            "=": "self-modulus",
        },

        //comparison operators
        "=": {
            "": "assign",
            "=": "biop-logic-strict-equal",
        },
        "!": {
            "": "unop-logic-not",
            "=": "biop-logic-not-equal",
            "!": "unop-logic-absolute-boolean",
        },
        "?": {
            "": "logic-ternary-true",
            "?": "biop-logic-nullish",
            ".": "biop-logic-optional-chain",
        },
        ">": {
            "": "biop-greater-than",
            "=": "greater-than-equal",
            ">": "biop-shift-right",
        },
        "<": {
            "": "biop-less-than",
            "=": "less-than-equal",
            "<": "biop-shift-left",
        },
        "&": {
            "": "biop-bit-and",
            "=": "self-bit-and",
            "&": "biop-logic-and",
        },
        "|": {
            "": "unop-bit-or",
            "=": "self-bit-or",
            "|": "biop-logic-or",
        },
        "^": {
            "": "biop-bit-xor",
            "=": "self-bit-xor",
        },
    //},
    //words: {
        /*//types
        const: "type-lex-assign-constant",
        bool: "type-lex-assign-boolean",
        num: "type-lex-assign-number",
        str: "type-lex-assign-string",
        obj: "type-lex-assign-object",
        arr: "type-lex-assign-array",
        fn: "type-lex-assign-function",
        void: "type-lex-assign-void",
        super: "type-lex-assign-superset",
        import: "type-lex-module-import",
        export: "type-lex-module-export",

        //scope words
        if: "scope-lex-if",
        else: "scope-lex-else",
        while: "scope-lex-while",
        in: "scope-lex-in",
        of: "scope-lex-of",

        //escape words
        return: "scope-exit-return",
        break: "scope-exit-break",
        continue: "scope-exit-continue",*/

        /*let words = {
            arr: "type-lex-assign-array",
            bool: "type-lex-assign-boolean",
            break: "scope-exit-break",
            const: "type-lex-assign-constant",
            continue: "scope-exit-continue",
            else: "scope-lex-else",
            export: "type-lex-module-export",
            fn: "type-lex-assign-function",
            if: "scope-lex-if",
            import: "type-lex-module-import",
            in: "scope-lex-in",
            num: "type-lex-assign-number",
            obj: "type-lex-assign-object",
            of: "scope-lex-of",
            return: "scope-exit-return",
            str: "type-lex-assign-string",
            super: "type-lex-assign-superset",
            void: "type-lex-assign-void",
            while: "scope-lex-while"
        };*/

        //numbers - because WHY NOT
        "0": "num-literal-bin-octal-dec-hex",
        "1": "num-literal-bin-octal-dec-hex",
        "2": "num-literal-octal-dec-hex",
        "3": "num-literal-octal-dec-hex",
        "4": "num-literal-octal-dec-hex",
        "5": "num-literal-octal-dec-hex",
        "6": "num-literal-octal-dec-hex",
        "7": "num-literal-octal-dec-hex",
        "8": "num-literal-dec-hex",
        "9": "num-literal-dec-hex",

        //brute force matching: like tokens but for words
        a:{
            '':'letter-num-literal-hex',
            r:{
                '':'letter',
                r:"type-lex-assign-array"
            }
        },
        b:{
            '':'letter-num-literal-hex',
            i:{
                '':'letter',
                n: 'type-lex-assign-number-binary'
            },
            o:{
                '':'letter',
                o:{
                    '':'letter',
                    l:"type-lex-assign-boolean"
                }
            },
            r:{
                '':'letter',
                e:{
                    '':'letter',
                    a:{
                        '':'letter',
                        k:"scope-exit-break"
                    }
                }}
        },
        c:{
            '':'letter-num-literal-hex',
            o:{
                '':'letter',
                n:{
                    '':'letter',
                    s:{
                        '':'letter',
                        t:"type-lex-assign-constant"
                    }},
                    t:{
                        '':'letter',
                        i:{
                            '':'letter',
                            n:{
                                '':'letter',
                                u:{
                                    '':'letter',
                                    e:"type-lex-assign-continue"
                                }}}
        }}},
        d:{
            '':'letter-num-literal-hex',
            e:{
                '':'letter',
                c:'type-lex-assign-decimal-number'
            }
        },
        e:{
            '':'letter-num-literal-hex',
            l:{
                '':'letter',
                s:{
                    '':'letter',
                    e:"scope-lex-else"
                }},
            x:{
                '':'letter',
                p:{
                    '':'letter',
                    o:{
                        '':'letter',
                        r:{
                            '':'letter',
                            t:"type-lex-module-export"
                        }}}}
        },
        f:{
            '':'letter-num-literal-hex',
            n:"type-lex-assign-function"
        },
        h:{
            '':'letter',
            e:{
                '':'letter',
                x:'type-lex-assign-number-hexidecimal'
            }
        },
        i:{
            '':'letter',
            f:"word-lex-identifier-function",
            n:"scope-lex-in",
            m:{p:{o:{r:{t:"type-lex-module-import"}}}},
        },
        n:{
            '':'letter',
            u:{
                '':'letter',
                m:"type-lex-assign-number"
            },
        o:{
            '':'letter',
            b:{
                '':'letter',
                j:"type-lex-assign-object"
            },
            c:{
                '':'letter',
                t:{
                    '':'letter',
                    a:{
                        '':'letter',
                        l:'type-lex-assign-number-octal'
                    }
                }
            },
            f:"scope-lex-of"           
        },
        r:{
            '':'letter',
            e:{
                '':'letter',
                t:{
                    '':'letter',
                    u:{
                        '':'letter',
                        r:{
                            '':'letter',
                            n:"scope-exit-return"
        }}}}}},
        s:{
            '':'letter',
            t:{
                '':'letter',
                r:"type-lex-assign-string"
            },
            u:{
                '':'letter',
                p:{
                    '':'letter',
                    e:{
                        '':'letter',
                        r:"type-lex-assign-superset"
                    }}}
        },
        v:{
            '':'letter',
            o:{
                '':'letter',
                i:{
                    '':'letter',
                    d:"type-lex-assign-void"
        }}},
        w:{
            '':'letter',
            h:{
                '':'letter',
                i:{
                    '':'letter',
                    l:{
                        '':'letter',
                        e:"scope-lex-while"
        }}}}
    },
};
