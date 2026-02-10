import React, { Fragment, useEffect } from "react";
import styles from './tooltips.module.css';

export function Tooltips({ onClose }) {
    const closeBtnRef = React.useRef(null);

    useEffect(() => {
        // focus for basic accessibility - allows users to close tooltip with keyboard
        closeBtnRef.current?.focus();

        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
            window.addEventListener("keydown", onKeyDown);
            return () => {
                window.removeEventListener("keydown", onKeyDown);
            }
        }, [onClose]);

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label="Keyboard Shortcuts"
            onClick={(e) => e.stopPropagation()}
            >
                <header className={styles.header}>
                    <h2>Keyboard Shortcuts</h2>
                    <button
                        className={styles.closeButton}
                        aria-label="Close"
                        onClick={onClose}
                        ref={closeBtnRef}
                    >x
                    </button>
                </header>
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <td>Numbers/Operators</td>
                            <td>Type directly</td>
                        </tr>
                        <tr>
                            <td>Backspace</td>
                            <td>Delete character</td>
                        </tr>
                        <tr>
                            <td>Enter</td>
                            <td>Evaluate</td>
                        </tr>
                        <tr>
                            <td>Escape</td>
                            <td>Clear</td>
                        </tr>
                        <tr>
                            <td>Arrow keys</td>
                            <td>Move cursor</td>
                        </tr>
                        <tr>
                            <td>Home/End</td>
                            <td>Jump to start/end</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        </div>
    );
}