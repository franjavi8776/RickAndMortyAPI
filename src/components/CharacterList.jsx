import { useState, useEffect } from "react";
import Character from "./Character";

function NavPage({ page, setPage }) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <button
        className="btn btn-primary btn-sm "
        onClick={() => {
          page === 1 ? setPage(1) : setPage(page - 1);
        }}
      >
        Back
      </button>
      Page: {page}
      <button
        className="btn btn-primary btn-sm"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  async function FetchrickAndMorty() {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const data = await response.json();
    setLoading(false);
    setCharacters(data.results);
  }

  useEffect(() => {
    FetchrickAndMorty();
  }, [page]);

  return (
    <div className="container">
      <NavPage page={page} setPage={setPage} />
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <div className="row">
          {characters.map((character) => (
            <div className="col-md-4" key={character.id}>
              <Character character={character} />
            </div>
          ))}
        </div>
      )}
      <NavPage page={page} setPage={setPage} />
    </div>
  );
};

export default CharacterList;
