/*
==========================================================================
||Name: Peter Nguyen                                                    ||
||Date: February 3, 2026                                                ||
||Location: Calculator/src/components/calculator/ui/editorReducer.js    ||
==========================================================================
||Description: "A reducer to manage the state of the calculator editor  ||
||Processing the old states in a single batch, forcing one step update" ||
||*This project is for educational purposes only*                       ||
||*No distribution allowed*                                             ||
==========================================================================
*/

const initialState = {
    input: '',
    cursorIndex: 0,
    result: null,
    error: null,
};

function clampCursor(index, input) {
    return Math.max(0, Math.min(index, input.length));
}

function reducer(state, action) {
    switch(action.type) {
        case "INSERT": {
            const text = action.text;
            const before = state.input.slice(0, state.cursorIndex);
            const after = state.input.slice(state.cursorIndex);
            const newInput = before + text + after;
            const cursor = state.cursorIndex + text.length;
            return {
                ...state,
                input: newInput,
                cursorIndex: clampCursor(cursor, newInput),
                error: null,
            };
        }
        case "BACKSPACE": {
            if (state.cursorIndex === 0) return { ...state, error: null };
            const newInput = 
                state.input.slice(0, state.cursorIndex - 1) +
                state.input.slice(state.cursorIndex);

            const cursor = state.cursorIndex - 1;
            return {
                ...state,
                input: newInput,
                cursorIndex: clampCursor(cursor, newInput),
                error: null,
            };
        }

        case "MOVE_LEFT": {
            return {
                ...state,
                cursorIndex: clampCursor(state.cursorIndex - 1, state.input),
            }
        }

        case "MOVE_RIGHT": {
            return {
                ...state,
                cursorIndex: clampCursor(state.cursorIndex + 1, state.input),
            }
        }

        case "HOME": {
            return {
                ...state,
                cursorIndex: clampCursor(0, state.input),
            }
        }

        case "END": {
            return {
                ...state,
                cursorIndex: clampCursor(state.input.length, state.input),
            }
        }

        case "CLEAR": {
            return {
                ...initialState
            }
        }

        case "EVALUATE": {
            return {
                ...state,
                result: action.result,
                error: action.error || null,
            }
        }

        default:
            return state;
    }
}

export { initialState, reducer}