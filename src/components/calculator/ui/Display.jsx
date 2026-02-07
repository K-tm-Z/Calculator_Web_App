import React from 'react';
import styles from './Display.module.css';

export function Display(props) {
    // Rendering caret position within the input
    const renderInputCaret = (input, cursorIndex) => {
        return (
            <>
                {input.slice(0, cursorIndex)}
                <span className="caret">|</span>
                {input.slice(cursorIndex)}
            </>
        );
    }

    const renderResult = (result) => {
        return (
            <div className="result">
                result: {result}
            </div>
        );
    }

    const renderError = (error) => {
        return (
            <div className="error">
                error: {error}
            </div>
        );
    }


    return (
        <div className={styles.Display}>
            <div className={styles.input_meta}>
                {renderInputCaret(props.input, props.cursorIndex)}
            </div>
            {props.result !== null && (
                <div className={styles.result_meta}>
                    {renderResult(props.result)}
                </div>
            )}
            {props.error !== null && (
                <div className={styles.error_meta} role="alert">
            {renderError(props.error)}
                </div>
            )}
        </div>
    )
}