function Header({ search, setSearch }) {
  return (
    <header className="header">

      <a
        className="logo"
        href="/"
      >
        game<span>board</span>
      </a>


      <nav className="main-nav">

        <a href="#games">
          Discover
        </a>

        <a href="#games">
          Genres
        </a>

      </nav>


      <div className="search-box">

        <span>
          ⌕
        </span>

        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

    </header>
  );
}

export default Header;