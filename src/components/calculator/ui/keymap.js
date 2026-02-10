export const inputLayout = [
    [null, '(', null, ')', null],
    ['sin', 'cos', 'tan', '^', 'sqrt'],
    ['7', '8', '9', 'DEL', 'AC'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '+', '-'],
    ['0', '.', '<-', '=', '->']
]

export const keyDict = {

    '<-' : { type: 'MOVE_LEFT' },
    '->' : { type: 'MOVE_RIGHT' },
    'HOME': { type: 'HOME' },
    'END': { type: 'END' },
    'DEL': { type: 'BACKSPACE' },
    'AC': { type: 'CLEAR' },
    '=': { type: 'EVALUATE' },

    '×': { type: 'INSERT', text: '*' },
    '÷': { type: 'INSERT', text: '/' },
    '+': { type: 'INSERT', text: '+' },
    '-': { type: 'INSERT', text: '-' },
    '^': { type: 'INSERT', text: '^' },
    '.': { type: 'INSERT', text: '.' },
    '(': { type: 'INSERT', text: '(' },
    ')': { type: 'INSERT', text: ')' },

    'sqrt': { type: 'INSERT', text: 'sqrt(' },
    'sin' : { type: 'INSERT', text: 'sin('},
    'cos' : { type: 'INSERT', text: 'cos('},
    'tan' : { type: 'INSERT', text: 'tan('},

    '0': { type: 'INSERT', text: '0' },
    '1': { type: 'INSERT', text: '1' },
    '2': { type: 'INSERT', text: '2' },
    '3': { type: 'INSERT', text: '3' },
    '4': { type: 'INSERT', text: '4' },
    '5': { type: 'INSERT', text: '5' },
    '6': { type: 'INSERT', text: '6' },
    '7': { type: 'INSERT', text: '7' },
    '8': { type: 'INSERT', text: '8' },
    '9': { type: 'INSERT', text: '9' },
}

export const physToPad = {
    Enter: "=",
    Backspace: "DEL",
    Escape: "AC",
    ArrowLeft: "<-",
    ArrowRight: "->",
    Home: "HOME",
    End: "END",

    "*": "×",
    "/": "÷",
    "+": "+",
    "-": "-",
    ".": ".",
    "(": "(",
    ")": ")",
    "^": "^",

    "sqrt": "sqrt",
    "sin" : "sin",
    "cos" : "cos",
    "tan" : "tan",
}