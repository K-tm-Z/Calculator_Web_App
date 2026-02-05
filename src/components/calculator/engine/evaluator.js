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
                    default:
                        throw new Error(`Unknown binary operator: ${node.operator}`);
                    }
            }
        
        // If the node type is unknown, throw an error
        default:
            throw new Error(`Unknown node type: ${node.type} at index ${node.index}`);
    }
}

export { evaluate };