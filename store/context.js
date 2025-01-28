import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameContext = createContext({
  gameScores: [],
  addGameScore: async (score) => {},
});

export function GameProvider({ children }) {
  const [gameScores, setGameScores] = useState([]);
  

  // Load scores from AsyncStorage when app starts
  React.useEffect(() => {
    loadScores();
  }, []);

  const loadScores = async () => {
    try {
      const savedScores = await AsyncStorage.getItem('gameScores');
      if (savedScores) {
        setGameScores(JSON.parse(savedScores));
      }
    } catch (error) {
      console.error('Error loading scores:', error);
    }
  };

  const addGameScore = async (score) => {
    try {
      const newScore = {
        score,
        date: new Date().toISOString(),
      };
      
      const updatedScores = [...gameScores, newScore];
      await AsyncStorage.setItem('gameScores', JSON.stringify(updatedScores));
      setGameScores(updatedScores);
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  return (
    <GameContext.Provider value={{ gameScores, addGameScore }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
 
  return useContext(GameContext);
}
