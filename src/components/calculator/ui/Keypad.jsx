import styles from './Keypad.module.css';
import { inputLayout } from './keymap.js';

export const Keypad = ({ dispatchKeyId }) => {

    const onButtonClick = (e) => {
        const keyId = e.currentTarget.dataset.keyid;
        if (!keyId) return;
        dispatchKeyId(keyId);
    }

    return (
        <div className={styles.Keypad}>
            {inputLayout.flatMap((row, r) =>
            row.map((cell, c) => {
                // Placeholder keeps the grid cell occupied
                if (cell === null) {
                return (
                    <div
                    key={`ph-${r}-${c}`}
                    className={styles.Placeholder}
                    aria-hidden="true"
                    />
                );
                }

                return (
                <button
                    className={styles.KeypadButton}
                    key={`${r}-${c}`}
                    data-keyid={cell}
                    onClick={onButtonClick}
                >
                    {cell}
                </button>
                );
            })
            )}
        </div>
    );
}