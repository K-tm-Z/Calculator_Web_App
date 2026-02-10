/*
==========================================================================
||Name: Peter Nguyen                                                    ||
||Date: February 3, 2025                                                ||
||Location: Calculator/src/components/calculator/engine/token.js        ||
==========================================================================
||Description: "Tokenizer for mathematical expressions                  ||
||Supports numbers, variables, parentheses, unary and binary operations"||
||*This project is for educational purposes only*                       ||
||*No distribution allowed*                                             ||
==========================================================================
*/

function tokenize(str) {
    let tokens = [];
    let i = 0;
    while (i < str.length) {
        let char = str[i];
        if (/\s/.test(char)) {
            i++;
            continue;
        }
        else if (/[0-9.]/.test(char)) {
            let num = '';
            let dotCount = 0;
            while (i < str.length && /[0-9.]/.test(str[i])) {
                if (str[i] === '.') { dotCount++; };
                if (dotCount > 1) { throw new Error('Invalid number format'); };
                num += str[i];
                i++;
            }
            if (num === '.') { throw new Error('"." is not a valid number'); }
            tokens.push({ type: 'Num', value: parseFloat(num) });
            continue;
        }
        else if ('+-*/^'.includes(char)) {
            tokens.push({ type: 'Op', value: char });
            i++;
            continue;
        }
        else if (['sin', 'cos', 'tan'].includes(str.slice(i, i + 3))) {
            let func = str.slice(i, i + 3);
            tokens.push({ type: 'Func', value: func });
            i += 3;
            continue;
        }
        else if (str.slice(i, i + 4) === 'sqrt') {
            tokens.push({ type: 'Func', value: 'sqrt' });
            i += 4;
            continue;
        }
        else if (char === '(') {
            tokens.push({ type: 'LPar', value: char });
            i++;
            continue;
        }
        else if (char === ')') {
            tokens.push({ type: 'RPar', value: char });
            i++;
            continue;
        }
        else if (/[a-zA-Z]/.test(char)) {
            let ident = '';
            while (i < str.length && /[a-zA-Z]/.test(str[i])) {
                ident += str[i];
                i++;
            }
            tokens.push({ type: 'Var', value: ident });
            continue;
        }
        else {
            throw new Error(`Unexpected character: ${char}`);
        }
    }
    return tokens;
}

export { tokenize };