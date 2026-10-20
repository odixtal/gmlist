import { useState } from 'react';
import { SearchInput } from '@/shared/components/SearchInput';
import { GameList } from '@/features/games/components/GameList';
import { useGames } from '@/features/games/hooks/useGames';
import { Spinner } from '@/shared/components/Spinner';
import { Button } from '@/shared/components/Button';
import { useDebounce } from '@/shared/hooks/useDebounce';

function App() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { games, isLoading, error, reload } = useGames(debouncedSearch);

  return (
    <div className="app">
      <header className="app-header">
        <h1>gmlist</h1>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск игр..."
        />
      </header>

      <main className="app-main">
        {isLoading && <Spinner />}

        {error && (
          <div className="error-container">
            <p>{error}</p>
            <Button onClick={reload}>Повторить</Button>
          </div>
        )}

        {!isLoading && !error && (
          <GameList games={games} />
        )}
      </main>
    </div>
  );
}

export default App;