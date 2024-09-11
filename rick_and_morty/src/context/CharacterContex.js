import React, { createContext, useState } from "react";

export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <CharacterContext.Provider
      value={{ selectedCharacter, setSelectedCharacter }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
