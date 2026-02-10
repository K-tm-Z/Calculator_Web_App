/*
==========================================================================
||Name: Peter nguyen                                                    ||
||Date: February 3, 2025                                                ||
||Location: Calculator/src/components/calculator/engine/evaluator.js    ||
==========================================================================
||Description: "Evaluator for mathematical expressions                  ||
||Supports numbers, variables, parentheses, unary and binary operations"||
||*This project is for educational purposes only*                       ||
||*no distribution allowed*                                             ||
==========================================================================
*/

function evaluate(node, context = {}) {
    if (!node || typeof node !== "object") {
        throw new Error("Invalid AST node");
    }

    switch(node.type) {

        // If the node is a numeric literal, return its value
        case "NumericLiteral":
            return node.value;
        
        // If the node is a variable, look up its value in the context
        case "Variable":
            if (node.name in context) {
                return context[node.name];
            } else {
                throw new Error(`Undefined variable: ${node.name}`);
            }
        
        // If the node is a unary expression, evaluate its argument and apply the proper operator
        case "UnaryExpression":
            {
                let val = evaluate(node?.argument, context);
                if (node.operator === "+") return +val;
                if (node.operator === "-") return -val;
                throw new Error(`Unknown unary operator: ${node.operator}`);
            }
        
        // If the node is a binary expression, evaluate its left and right operands and apply the proper operator
        case "BinaryExpression":
            {
                let leftVal = evaluate(node?.left, context);
                let rightVal = evaluate(node?.right, context);
                switch (node.operator) {
                    case "+":
                        return leftVal + rightVal;
                    case "-":
                        return leftVal - rightVal;
                    case "*":
                        return leftVal * rightVal;
                    case "/":
                        if (rightVal === 0) {
                            throw new Error("Division by zero");
                        }
                        return leftVal / rightVal;
                    case "^":
                        return Math.pow(leftVal, rightVal);
                    case "(":
                        return leftVal * rightVal; // Implicit multiplication for juxtaposition
                    default:
                        throw new Error(`Unknown binary operator: ${node.operator}`);
                    }
            }
        case "FunctionCall":
            {
                let argVal = evaluate(node?.argument, context);
                switch (node.func) {
                    case "sqrt":
                        if (argVal < 0) {
                            throw new Error("Square root of negative number");
                        }
                        return Math.sqrt(argVal);
                    case "sin":
                        return Math.sin(argVal * Math.PI / 180); // Convert degrees to radians
                    case "cos":
                        return Math.cos(argVal * Math.PI / 180); // Convert degrees to radians
                    case "tan":
                        return Math.tan(argVal * Math.PI / 180); // Convert degrees to radians
                    default:
                        throw new Error('Unknown function expression.')
                }
            }
        
        // If the node type is unknown, throw an error
        default:
            throw new Error(`Unknown node type: ${node.type} at index ${node.index}`);
    }
}

export { evaluate };