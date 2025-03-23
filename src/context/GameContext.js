import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gridSize] = useState(8);
  const [mineCount, setMineCount] = useState(5);

  return (
    <GameContext.Provider value={{ gridSize, mineCount, setMineCount }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
