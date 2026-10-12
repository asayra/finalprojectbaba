const categories = [
  ["", "All"],
  ["action", "Action"],
  ["adventure", "Adventure"],
  ["indie", "Indie"],
  ["role-playing-games-rpg", "RPG"],
  ["horror", "Horror"],
  ["simulation", "Simulation"],
  ["strategy", "Strategy"],
];

function CategoryBar({ category, setCategory }) {
  return (
    <nav className="categories">

      {categories.map(([value, name]) => (

        <button
          key={value}
          className={
            category === value
              ? "active"
              : ""
          }
          onClick={() =>
            setCategory(value)
          }
        >
          {name}
        </button>

      ))}

    </nav>
  );
}

export default CategoryBar;