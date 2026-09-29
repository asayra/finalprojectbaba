import {useEffect, useState } from "react";
import Header from "./components/Header";
import CategoryBar from "./components/CategoryBar";
import GameModal from "./components/GameModal"

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
        const url = new URL("https://api.rawg.io/api/games");

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
        console.error(error);
        setGames([]);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [search, category]);

  return (
    <div className="app">
      <header 
      search={search}
      setSearch={setSearch}
      />

      <main>
        <section className="hero">
          <p className="eyebrow">GAME DISCOVERY</p>

          <h1>Find your next <br /> favorite game.</h1>

          <p>Discover games, explore new worlds, and find something you will love.</p>
        </section>

        <CategoryBar
         category={category}
         setCategory
         />

         <section className="games-section">
          <div className="section-title">
            <div>
              <h2>Explore games</h2>
              <p>Discover something new.</p>
            </div>

            
          </div>
         </section>
      </main>
    </div>
  )
  })
}