import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/header";
import CharacterContainer from "./components/character_container";
import Navigation from "./components/navigation";
import { DisneyCharacter } from "./disney_character";
import axios from "axios";

export const FavouritesContext = React.createContext<Array<DisneyCharacter>>(
  []
);
export const FavouritesUpdateContext = React.createContext(([]) => {});

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [characters, setCharacters] = useState<Array<DisneyCharacter>>([]);
  const [isFavouritePage, setIsFavouritePage] = useState(false);
  const [characterFavourites, setCharacterFavourites] = useState<
    Array<DisneyCharacter>
  >([]);

  useEffect(() => {
    getCharacters(currentPage);
  }, [currentPage]);

  useEffect(() => {
    getFavCharacters();
  }, [isFavouritePage]);

  const getCharacters = async (pageNumber: number) => {
    const apiResponse = await axios.get(
      "http://api.disneyapi.dev/characters?page=" + pageNumber
    );
    setCharacters(apiResponse.data.data);
  };

  const getFavCharacters = () => {
    if (isFavouritePage) setCharacters(characterFavourites);
  };

  const toToggleFavAndAll = () => {
    if (!isFavouritePage) {
      setIsFavouritePage(true);
    } else {
      setIsFavouritePage(false);
      if (currentPage !== 1) setCurrentPage(1);
      else getCharacters(1);
    }
  };

  return (
    <FavouritesContext.Provider value={characterFavourites}>
      <FavouritesUpdateContext.Provider value={setCharacterFavourites}>
        <div className="page">
          <Header currentPage={currentPage} />
          <div className="navigation__item">
            <button
              className="navigation__button buttoncenter"
              onClick={toToggleFavAndAll}
            >
              {isFavouritePage ? "Show All" : "Show Favourites"}
            </button>
          </div>
          <Navigation
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <CharacterContainer characters={characters} />
        </div>
      </FavouritesUpdateContext.Provider>
    </FavouritesContext.Provider>
  );
};

export default App;
