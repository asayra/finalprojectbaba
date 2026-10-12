import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

function GameModal({ game, onClose }) {

  const [details, setDetails] = useState(null);

  const [trailer, setTrailer] = useState(null);

  const [loadingDetails, setLoadingDetails] =
    useState(true);

  const [loadingTrailer, setLoadingTrailer] =
    useState(true);


  useEffect(() => {

    async function fetchGameDetails() {

      setLoadingDetails(true);

      try {

        const response = await fetch(
          `https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(
            "Game details request failed"
          );
        }

        const data = await response.json();

        setDetails(data);

      } catch (error) {

        console.error(
          "Game Details Error:",
          error
        );

        setDetails(null);

      } finally {

        setLoadingDetails(false);

      }
    }


    async function fetchTrailer() {

      setLoadingTrailer(true);

      setTrailer(null);

      try {

        const response = await fetch(
          `https://api.rawg.io/api/games/${game.id}/movies?key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(
            "Trailer request failed"
          );
        }

        const data = await response.json();

        setTrailer(
          data.results?.[0] || null
        );

      } catch (error) {

        console.error(
          "Trailer Error:",
          error
        );

        setTrailer(null);

      } finally {

        setLoadingTrailer(false);

      }
    }


    fetchGameDetails();
    fetchTrailer();

  }, [game.id]);


  const videoUrl =
    trailer?.data?.max ||
    trailer?.data?.["720"] ||
    trailer?.data?.["480"] ||
    null;


  /*
    RAWG sometimes returns HTML in descriptions.
    This removes the HTML tags so we can display
    a clean text version.
  */

  const description =
    details?.description_raw ||
    details?.description
      ?.replace(/<[^>]*>/g, "") ||
    "No description available for this game.";


  /*
    Keep the description short so the modal
    doesn't become enormous.
  */

  const shortDescription =
    description.length > 500
      ? description.slice(0, 500) + "..."
      : description;


  return (

    <div
      className="modal"
      onClick={onClose}
    >

      <div
        className="modal-content"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* CLOSE */}

        <button
          className="close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>


        {/* TRAILER */}

        <div className="trailer-section">

          {loadingTrailer ? (

            <div className="trailer-loading">
              Loading...
            </div>

          ) : videoUrl ? (

            <video
              className="trailer"
              controls
              poster={trailer.preview}
              playsInline
            >

              <source
                src={videoUrl}
                type="video/mp4"
              />

              Your browser does not support
              video playback.

            </video>

          ) : (

            <div className="no-trailer">

              <img
                src={game.background_image}
                alt={game.name}
              />

              <div>

                <span>
                  Trailer unavailable
                </span>

                <p>
                  No playable trailer is
                  available for this game.
                </p>

              </div>

            </div>

          )}

        </div>


        {/* INFORMATION */}

        <div className="modal-info">

          <p className="eyebrow">
            GAME DETAILS
          </p>


          <div className="modal-title-row">

            <h2>
              {game.name}
            </h2>

            <span className="modal-rating">
              ★ {game.rating || "N/A"}
            </span>

          </div>


          {/* STATS */}

          <div className="modal-stats">

            <div>

              <span>
                RELEASED
              </span>

              <strong>
                {game.released || "TBA"}
              </strong>

            </div>


            <div>

              <span>
                RATING
              </span>

              <strong>
                {game.rating || "N/A"}
              </strong>

            </div>


            <div>

              <span>
                RATINGS
              </span>

              <strong>
                {game.ratings_count || "—"}
              </strong>

            </div>

          </div>


          {/* GENRES */}

          <div className="genre-list">

            {(
              details?.genres ||
              game.genres ||
              []
            ).map((genre) => (

              <span
                className="genre-tag"
                key={genre.id}
              >
                {genre.name}
              </span>

            ))}

          </div>


          {/* DESCRIPTION */}

          <div className="description-section">

            <h3>
              About the game
            </h3>

            {loadingDetails ? (

              <p className="description-loading">
                Loading description...
              </p>

            ) : (

              <p>
                {shortDescription}
              </p>

            )}

          </div>


          {/* RAWG BUTTON */}

          <a
            className="rawg-button"
            href={`https://rawg.io/games/${game.slug}`}
            target="_blank"
            rel="noreferrer"
          >
            View on RAWG →
          </a>

        </div>

      </div>

    </div>
  );
}

export default GameModal;