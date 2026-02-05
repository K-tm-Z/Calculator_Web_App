/*
==========================================================================
||Name: Peter Nguyen                                                    ||
||Date: February 3, 2025                                                ||
||Location: Calculator/src/components/calculator/engine/parser.js       ||
==========================================================================
||Description: "Parser for mathematical expressions                    ||
||Supports numbers, variables, parentheses, unary and binary operations"||
||*This project is for educational purposes only*                       ||
||*No distribution allowed*                                             ||
==========================================================================
*/
const Node = (props) => ({ ...props });
const currentToken = (state) => { return state.tokens[state.currentIndex]; };
const consumeToken = (state) => { state.currentIndex++; };

// Parses factors: numbers, variables, parenthesized expressions, and unary operations
function parseFactor(state) {
    // Added a forced log to check for when React compiler misses updates
    // console.log("PARSER VERSION CHECK", "parseFactor reached", { currentIndex });
    let token = currentToken(state);
    if (!token) {
        throw new Error(`Unexpected end of input at index ${state.currentIndex}`);
    }

    if(token.type == "Num") {
        consumeToken(state);
        return Node ({
            type: "NumericLiteral",
            value: token.value
    });
    }

    if(token.type == "Var") {
        consumeToken(state);
        return Node ({
            type: "Variable",
            name: token.value
        });
    }

    if(token?.type == "LPar") {
        consumeToken(state);
        let expr = parseSum(state);
        if(currentToken(state)?.type === "RPar") {
            consumeToken(state);
            return expr;
        } else {
            throw new Error(`Expected closing parenthesis`);
        }
    }

    if(
        token.type == "Op" &&
        (token.value == "+" || token.value == "-")
    ) {
        let op = currentToken(state);
        consumeToken(state);

        let right = parseFactor(state);
        return Node ({
            type: "UnaryExpression",
            operator: op.value,
            argument: right
        });
    }

    else {
        throw new Error(`Unexpected token: ${JSON.stringify(token)}`);
    }
}

// Parses terms: factors combined with * and /
function parseTerm(state) {
    let left = parseFactor(state);

    while(currentToken(state)?.type == "Op" &&
        (currentToken(state).value == "*" || currentToken(state).value == "/")
    ) {
        let operator = currentToken(state).value;
        consumeToken(state);

        let right = parseFactor(state);

        left = Node ({
            type: "BinaryExpression",
            left: left,
            operator: operator,
            right: right
    });
    }
    return left;
}

// Parses sums: terms combined with + and -
function parseSum(state) {
    let left = parseTerm(state);
    
    while(
        currentToken(state)?.type == "Op" &&
        (currentToken(state).value == "+" || currentToken(state).value == "-")
    ) {
        let operator = currentToken(state).value;
        consumeToken(state); // Consume operator

        let right = parseTerm(state);
        left = Node ({
            type: "BinaryExpression",
            left: left,
            operator: operator,
            right: right
        });
    }

    return left;
}

function parse(tokens) {
    const state = { tokens, currentIndex: 0 };

    let ast = parseSum(state);

    if(state.currentIndex < tokens.length) {
        throw new Error(`Unexpected token: ${JSON.stringify(currentToken(state))} at index ${state.currentIndex}`);
    }

    return ast;
}

export { parse };