import type { ReactNode } from 'react';
import type { AsyncState } from '../types/asyncState';
import { Button } from './Button';

interface AsyncBoundaryProps<T> {
    state: AsyncState<T>;
    renderSuccess: (data: T) => ReactNode;
    onRetry?: () => void;
}

export function AsyncBoundary<T>({ state, renderSuccess, onRetry }: AsyncBoundaryProps<T>) {
    switch (state.status) {
        case 'idle':
            return <p>Ожидание...</p>;
        case 'loading':

            return <p style={{ textAlign: 'center', marginTop: '40px' }}>Загрузка...</p>;
        case 'error':
            return (
                <div className="error-container">
                    <p>Ошибка при загрузке: {state.error}</p>
                    {onRetry && <Button onClick={onRetry}>Повторить</Button>}
                </div>
            );
        case 'success':
            return <>{renderSuccess(state.data)}</>;
        default:
            const _exhaustiveCheck: never = state;
            return _exhaustiveCheck;
    }
}