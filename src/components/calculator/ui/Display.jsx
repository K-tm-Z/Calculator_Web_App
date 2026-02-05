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

    const onMouseDown = (e) => {
        e.preventDefault();
        e.currentTarget.focus();
    }

    const keyDown = (e) => {
        // navigational and functional keys
        if (e.key === 'Escape') {
            e.preventDefault();
            return props.onClearEverything();
        }
        else if (e.key === 'Backspace') {
            e.preventDefault();
            return props.onBackspace();
        }
        else if (e.key === 'Delete') {
            e.preventDefault();
            return props.onDelete();
        }
        else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            return props.onMoveLeft();
        }
        else if (e.key === 'ArrowRight') {
            e.preventDefault();
            return props.onMoveRight();
        }
        else if (e.key === 'Home') {
            e.preventDefault();
            return props.onMoveHome();
        }
        else if (e.key === 'End') {
            e.preventDefault();
            return props.onMoveEnd();
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            return props.onEvaluate();
        }

        // ignore browser shortcuts
        else if (e.ctrlKey || e.metaKey || e.altKey) {
            return;
        }
        //Ignore other non-character keys
        else if (e.key.length !== 1) return;

        // Insert valid characters (numbers, operators, parentheses, decimal point, whitespace)
        else if (/[0-9+\-*/().\s]/.test(e.key) && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            return props.onInsert(e.key);
        }
        
        return;
    }

    return (
        <div className="Display" tabIndex={0} onKeyDown={keyDown} onMouseDown={onMouseDown}>
            {renderInputCaret(props.input, props.cursorIndex)}
            {props.result !== null && renderResult(props.result)}
            {props.error !== null && renderError(props.error)}
        </div>
    )
}