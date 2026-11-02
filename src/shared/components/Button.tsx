import type { ComponentProps, ReactNode } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
    children: ReactNode;
}

export function Button({ children, className, ...props }: ButtonProps) {
    return (
        <button
            className={`btn ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
}