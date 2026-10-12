import { useEffect, useState } from "react";
import Header from "./components/Header";
import CategoryBar from "./components/CategoryBar";
import GameCard from "./components/GameCard";
import GameModal from "./components/GameModal";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

function App() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGames() {
      setLoading(true);

      try {
        const url = new URL(
          "https://api.rawg.io/api/games"
        );

        url.searchParams.set("key", API_KEY);
        url.searchParams.set("page_size", "30");
        url.searchParams.set("ordering", "-rating");

        if (search) {
          url.searchParams.set("search", search);
        }

        if (category) {
          url.searchParams.set("genres", category);
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();

        setGames(data.results || []);
      } catch (error) {
        console.error("RAWG Error:", error);
        setGames([]);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [search, category]);

  return (
    <div className="app">

      <Header
        search={search}
        setSearch={setSearch}
      />

      <main>

        {/* HERO */}

        <section className="hero">

          <div className="hero-content">

            <p className="eyebrow">
              GAME DISCOVERY
            </p>

            <h1>
              Find your next
              <br />
              favorite game.
            </h1>

            <p className="hero-description">
              Explore thousands of games, discover new worlds,
              and find something worth playing.
            </p>

            <a
              href="#games"
              className="hero-button"
            >
              Explore games
              <span>↓</span>
            </a>

          </div>


          {games[0] && (
            <div className="featured-game">

              <img
                src={games[0].background_image}
                alt={games[0].name}
              />

              <div className="featured-gradient"></div>

              <div className="featured-info">

                <span>Featured game</span>

                <h2>
                  {games[0].name}
                </h2>

                <p>
                  ★ {games[0].rating || "N/A"}

                  <span>•</span>

                  {games[0].released || "TBA"}
                </p>

              </div>

            </div>
          )}

        </section>


        {/* DISCOVER */}

        <section
          className="discover"
          id="games"
        >

          <div className="section-heading">

            <div>

              <p className="eyebrow">
                EXPLORE
              </p>

              <h2>
                Discover games
              </h2>

            </div>

            <span className="results-count">
              {games.length} games
            </span>

          </div>


          <CategoryBar
            category={category}
            setCategory={setCategory}
          />


          {loading ? (

            <div className="loading">
              Loading games...
            </div>

          ) : games.length === 0 ? (

            <div className="loading">
              No games found.
            </div>

          ) : (

            <div className="game-grid">

              {games.map((game) => (

                <GameCard
                  key={game.id}
                  game={game}
                  onClick={() =>
                    setSelectedGame(game)
                  }
                />

              ))}

            </div>

          )}

        </section>

      </main>


      {/* GAME MODAL */}

      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={() =>
            setSelectedGame(null)
          }
        />
      )}

    </div>
  );
}

export default App;