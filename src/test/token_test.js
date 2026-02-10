import { tokenize } from "../components/calculator/engine/token.js";

// console.log(tokenize(". + 2"));
// console.log(tokenize("3 + 5 * (x - 2)"));
// console.log(tokenize("3.1 / (x + 15.2)"));
// // console.log(tokenize("3..1 / (x + 15.2)"));
// console.log(tokenize(".5 * 9.8 - y"));
// console.log(tokenize("a + b - c * 1."));
// console.log(tokenize("-3 + 4"));
console.log(tokenize("(6-2) ^ 3"));
console.log(tokenize("3-sqrt(16)"));
console.log(tokenize("sin(x) + cos(y) - tan(z) + log(w)"));