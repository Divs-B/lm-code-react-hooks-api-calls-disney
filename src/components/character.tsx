import { DisneyCharacter } from "../disney_character";
import React, { useContext } from "react";
import { FavouritesContext, FavouritesUpdateContext } from "../App";

interface CharacterProps {
  character: DisneyCharacter;
}

const Character: React.FC<CharacterProps> = ({ character }) => {
  const characterFavourites = useContext(FavouritesContext);
  const characterUpdateFavourites = useContext(FavouritesUpdateContext);

  function checkIfFavAlready(character: DisneyCharacter): boolean {
    const isCharcterFavPresent = characterFavourites.filter(
      (chr) => chr._id === character._id
    );
    if (isCharcterFavPresent.length > 0) return true;
    else return false;
  }

  function toggleFavouriteForCharacter(character: DisneyCharacter) {
    if (!checkIfFavAlready(character)) {
      characterUpdateFavourites([...characterFavourites, character]);
    } else {
      const updatedFavourites = characterFavourites.filter(
        (chr) => chr._id !== character._id
      );
      characterUpdateFavourites(updatedFavourites);
    }
  }

  return (
    <article className="character-item">
      <h2>{character.name}</h2>

      <div
        className="character-item__actions"
        onClick={() => toggleFavouriteForCharacter(character)}
      >
        {!checkIfFavAlready(character) ? "Add to Favourites" : "Favourited"}
      </div>

      <img
        className="character-item__img"
        src={character.imageUrl}
        alt={character.name}
      />
    </article>
  );
};

export default Character;
