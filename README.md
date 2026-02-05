# Web-based Expression Calculator
A browser-based calculator that tokenizes, parses, and evaluates full mathematical expressions. (Inspired by the Casio fx-991ES, my companion throughout the years)

## Architecture Overview
The calculator follows a compiler-inspired pipeline:

Input string
→ Tokenizer
→ Parser (Abstract Syntax Tree)
→ Evaluator
→ Result or Error

### Tokenizer
Converts raw input into a linear sequence of tokens (numbers, operators,
identifiers, parentheses), performing early validation.

### Parser
Implements a recursive descent parser that transforms tokens into an AST,
enforcing operator precedence and associativity.

### Evaluator
Traverses the AST recursively to compute results while handling runtime errors (e.g., division by zero, undefined variables).

### Editor State
A reducer-based editor manages cursor position and input mutations to simulate scientific calculator behavior.

## Features
- Tokenizer to differentiate between numbers, variables, operators and parentheses
- Recursive descent parser with operator precedence
- AST-based evaluator with error handling
- Cursor-aware calculator editor (Scientific calculator-style input)

## Tech Stack
- JavaScript (ES6+)
- React (UI)
- Custom tokenizer/ parser/ evaluator

## Getting Started
### Locally
```bash
npm install
npm run dev
```
### Live Demo
TBA

## Use of AI as a Learning Tool
AI was used as a supplementary learning aid to:
- Clarify compiler concepts such as tokenization, parsing, and AST evaluation
- Validate architectural decisions and edge cases
- Act as a technical reviewer during refactoring
All core logic, architectural decisions, and implementations were designed, written, and iteratively refined by the author.

## Future Improvements
- Implement and deploy a Keypad for mouse/ touch-screen users
- Implement support for implicit multiplication
- Implement support for square root function
- Implement a navbar to convert this into a live portfolio that showcases other projects