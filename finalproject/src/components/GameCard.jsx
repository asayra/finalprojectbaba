function GameCard({ game, onClick }) {
  return (
    <article
      className="game-card"
      onClick={onClick}
    >

      <div className="game-image">

        <img
          src={game.background_image}
          alt={game.name}
          loading="lazy"
        />

        <div className="card-overlay"></div>

        <div className="card-rating">
          ★ {game.rating || "N/A"}
        </div>

      </div>


      <div className="game-info">

        <div>

          <h3>
            {game.name}
          </h3>

          <p>
            {game.released ||
              "Release date unknown"}
          </p>

        </div>

        <span className="card-arrow">
          →
        </span>

      </div>

    </article>
  );
}

export default GameCard;