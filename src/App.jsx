import { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { SearchInput } from '@/shared/components/SearchInput';
import { Sidebar } from '@/shared/components/Sidebar';
import { HomePage } from '@/pages/HomePage';
import { WishlistPage } from '@/pages/WishlistPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function Layout() {
  const [search, setSearch] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-logo">
          <h1>gmlist</h1>
        </div>
        <div className="header-search">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск игр..."
          />
        </div>
        <div className="header-menu">
          <button className="burger-btn" onClick={() => setIsSidebarOpen(true)}>
            ☰
          </button>
        </div>
      </header>

      <main className="app-main">
        <Outlet context={{ search }} />
      </main>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;