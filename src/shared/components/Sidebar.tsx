import { NavLink } from 'react-router-dom';
import { useGameStore } from '@/shared/store/useGameStore';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { favorites } = useGameStore();

    return (
        <>
            {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>МЕНЮ</h2>
                    <button className="close-btn" onClick={onClose}>X</button>
                </div>
                <nav className="sidebar-nav">
                    <NavLink to="/" className="nav-link" onClick={onClose}>📁 Все игры</NavLink>
                    <NavLink to="/wishlist" className="nav-link" onClick={onClose}>
                        ★ Вишлист ({favorites.length})
                    </NavLink>
                </nav>
            </div>
        </>
    );
}