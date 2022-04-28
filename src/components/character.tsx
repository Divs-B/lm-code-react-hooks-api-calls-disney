import { DisneyCharacter } from "../disney_character";
import React, { useContext } from "react";
import { FavouritesContext, FavouritesUpdateContext } from "../App";

interface CharacterProps {
  character: DisneyCharacter;
}

const Character: React.FC<CharacterProps> = ({ character }) => {
  const characterFavourites = useContext(FavouritesContext);
  const characterUpdateFavourites = useContext(FavouritesUpdateContext);

  function toggleFavouriteForCharacter(characterId: number) {
    if (!characterFavourites.includes(characterId)) {
      characterUpdateFavourites([...characterFavourites, characterId]);
    } else {
      const updatedFavourites = characterFavourites.filter(
        (id) => id !== characterId
      );
      characterUpdateFavourites(updatedFavourites);
    }
  }

  return (
    <article className="character-item">
      <h2>{character.name}</h2>

      <div
        className="character-item__actions"
        onClick={() => toggleFavouriteForCharacter(character._id)}
      >
        {characterFavourites.includes(character._id)
          ? "Add to Favourites"
          : "Favourited"}
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
