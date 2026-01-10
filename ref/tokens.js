module.exports = {
    tokens: {
        //whitespace operators
        //' ': 'space',
        //'\n': 'new-line',

        //enclosure operators
        "(": "open-paren",
        ")": "close-paren",
        "[": "open-square",
        "]": "close-square",
        "{": "open-curly",
        "}": "close-curly",
        ";": "semicolon",
        ":": "logic-colon-false",
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

        //numerical types
        '0':{
            'b':'num-binary-prefix-unop',
            'o':'num-octal-prefix-unop',
            'x':'num-hexical-prefix-unop',
            'c':'num-custom-compressed-prefix-unop'
        },

        //\s | \t | \n | \b | \e | \f | \v | \{ | \} | \\ | \x hex hex | \u hex hex hex hex
        //escape characters
        '\\':{
            "s":'str-space',
            'n':'str-new-line',
            't':'str-tabulation',
            'b':'str-b',
            'e':'str-e',
            'f':'str-f',
            'v':'str-v',
            '{':'str-open-curly',
            '}':'str-close-curly',
            'x':'str-hex',
            'u':'str-unicode'
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
    },
    words: {
        //types
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
        continue: "scope-exit-continue",
    },
};
