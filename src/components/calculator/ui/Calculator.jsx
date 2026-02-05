import { useReducer } from 'react';
import { tokenize } from '../engine/token.js';
import { parse } from '../engine/parser.js';
import { evaluate } from '../engine/evaluator.js';
import { Display } from './Display.jsx';
import { reducer, initialState } from './editorReducer.js';

export function Calculator() {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Actors for various user actions
    const onInsert = (text) => dispatch({ type: "INSERT", text });
    const onBackspace = () => dispatch({ type: "BACKSPACE" });
    const onDelete = () => dispatch({ type: "DELETE" });
    const onMoveLeft = () => dispatch({ type: "MOVE_LEFT" });
    const onMoveRight = () => dispatch({ type: "MOVE_RIGHT" });
    const onMoveHome = () => dispatch({ type: "MOVE_HOME" });
    const onMoveEnd = () => dispatch({ type: "MOVE_END" });
    const onClearEverything = () => dispatch({ type: "CLEAR" });
    const onEvaluate = () => {
        try {
            const tokens = tokenize(state.input);
            console.log("Tokens:", tokens);
            const parsedExpression = parse(tokens);
            console.log("Parsed Expression:", parsedExpression);
            const caculatedResult = evaluate(parsedExpression);
            console.log("Calculated Result:", caculatedResult);
            dispatch({ type: "EVALUATE", result: caculatedResult });
        } catch (error) {
            dispatch({ type: "EVALUATE", error: error.message });
        }
    }

    // Render the calculator UI
    return (
        <div className="calculator">
            <Display
                input={state.input}
                cursorIndex={state.cursorIndex}
                result={state.result}
                error={state.error}
                onInsert={onInsert}
                onBackspace={onBackspace}
                onDelete={onDelete}
                onMoveLeft={onMoveLeft}
                onMoveRight={onMoveRight}
                onMoveHome={onMoveHome}
                onMoveEnd={onMoveEnd}
                onClearEverything={onClearEverything}
                onEvaluate={onEvaluate}
            />
            {/* <Keypad/> */}
        </div>
    )
}