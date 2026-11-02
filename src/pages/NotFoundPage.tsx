import { Link } from 'react-router-dom';

export function NotFoundPage() {
    return (
        <div className="error-container">
            <h2 className="page-title">404</h2>
            <p>Страница не найдена</p>
            <Link to="/" className="pixel-btn" style={{ display: 'inline-block', marginTop: '16px' }}>
                Вернуться на главную
            </Link>
        </div>
    );
}