export function Button({ children, onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="btn"
        >
            {children}
        </button>
    );
}