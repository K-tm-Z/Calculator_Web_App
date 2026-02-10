import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { tokenize } from '../engine/token.js';
import { parse } from '../engine/parser.js';
import { evaluate } from '../engine/evaluator.js';
import { Display } from './Display.jsx';
import { Keypad } from './Keypad.jsx';
import { reducer, initialState } from './editorReducer.js';
import { keyDict, physToPad } from './keymap.js';
import styles from './calculator.module.css'
import { Tooltips } from './tooltips.jsx';
import { Portal } from '../../../utils/Portal.js';

export function Calculator() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isOpen, setIsOpen] = useState(false);
    const leftHoldTimer = useRef(null);
    const leftHoldTriggered = useRef(false);
    const rightHoldTimer = useRef(null);
    const rightHoldTriggered = useRef(false);

    // Actors for various user actions
    const onInsert = (text) => dispatch({ type: "INSERT", text });
    const onBackspace = () => dispatch({ type: "BACKSPACE" });
    const onDelete = () => dispatch({ type: "DELETE" });
    const onMoveLeft = () => dispatch({ type: "MOVE_LEFT" });
    const onMoveRight = () => dispatch({ type: "MOVE_RIGHT" });
    const onMoveHome = () => dispatch({ type: "HOME" });
    const onMoveEnd = () => dispatch({ type: "END" });
    const onClearEverything = () => dispatch({ type: "CLEAR" });
    const onEvaluate = useCallback(() => {
        try {
            const tokens = tokenize(state.input);
            console.log("Tokens:", tokens);
            const parsedExpression = parse(tokens);
            console.log("Parsed Expression:", parsedExpression);
            const calculatedResult = evaluate(parsedExpression);
            console.log("Calculated Result:", calculatedResult);
            dispatch({ type: "EVALUATE", result: calculatedResult });
        } catch (error) {
            dispatch({ type: "EVALUATE", error: error.message });
        }
    }, [state.input, dispatch]);

    // Keyboard event handling
    const dispatchKeyAction = useCallback((e) => {
        if(!e) return;

        if (e.type === "EVALUATE") {
            onEvaluate();
            return;
        }
        dispatch(e);
    }, [dispatch, onEvaluate]);

    // Maps physical key presses to calculator actions
    const dispatchKeyId = useCallback((keyId) => {
        const action = keyDict[keyId];
        if (!action) return;
        dispatchKeyAction(action);
    }, [dispatchKeyAction]);

    // Set up global keydown listener for keyboard input
    useEffect(() => {
        
        const HOLD_MS = 350;

        const handleKeyDown = (e) => {
        // ignore browser shortcuts
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        
        if (e.key === "ArrowLeft") {
            e.preventDefault();

            if (e.repeat) return; // Ignore auto-repeated keydown events

            leftHoldTriggered.current = false;
            leftHoldTimer.current = setTimeout(() => {
                leftHoldTimer.current = null;
                leftHoldTriggered.current = true;
                dispatchKeyId("HOME");
            }, HOLD_MS);

            return;
        }

        if (e.key === "ArrowRight") {
            e.preventDefault();

            if (e.repeat) return; // Ignore auto-repeated keydown events

            rightHoldTriggered.current = false;
            rightHoldTimer.current = setTimeout(() => {
                rightHoldTimer.current = null;
                rightHoldTriggered.current = true;
                dispatchKeyId("END");
            }, HOLD_MS);

            return;
        }

        // Map physical key to calculator key, defaulting to the physical key if no mapping exists
        const mappedKey = physToPad[e.key] ?? e.key;

        if (!keyDict[mappedKey]) return;

        e.preventDefault();
        dispatchKeyId(mappedKey);
        };

        const handleKeyUp = (e) => {
            if (e.key === "ArrowLeft") {
                if (leftHoldTimer.current) {
                clearTimeout(leftHoldTimer.current);
                leftHoldTimer.current = null;
                }
                if (!leftHoldTriggered.current) {
                dispatchKeyId("<-"); // tap
                }
                return;
            }

            if (e.key === "ArrowRight") {
                if (rightHoldTimer.current) {
                clearTimeout(rightHoldTimer.current);
                rightHoldTimer.current = null;
                }
                if (!rightHoldTriggered.current) {
                dispatchKeyId("->"); // tap
                }
                return;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            if (leftHoldTimer.current) clearTimeout(leftHoldTimer.current);
            if (rightHoldTimer.current) clearTimeout(rightHoldTimer.current);
        };
    }, [dispatchKeyId]);

    const toggleButton = () => {
        setIsOpen(!isOpen);
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
            <Keypad dispatchKeyId={dispatchKeyId} />
            <div style={{ marginTop: '30px', fontSize: '0.9em', color: '#666' }}>
                <div className={styles.box}>
                    <button onClick={toggleButton} className={styles.infoButton} aria-label="Keyboard Shortcuts">
                        {isOpen ? "i" : "i"}
                    </button>
                    {isOpen && (
                        <Portal>
                            <Tooltips onClose={toggleButton} />
                        </Portal>
                    )}
                </div>
            </div>
        </div>
    )
}