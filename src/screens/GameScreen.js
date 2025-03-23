import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';
import Cell from '../components/Cell';

const generateBoard = (size, mines) => {
  let board = Array(size).fill(null).map(() => Array(size).fill({ mine: false, revealed: false, number: 0 }));

  let minePositions = new Set();
  while (minePositions.size < mines) {
    let pos = Math.floor(Math.random() * size * size);
    minePositions.add(pos);
  }

  minePositions.forEach(pos => {
    let row = Math.floor(pos / size);
    let col = pos % size;
    board[row][col] = { mine: true, revealed: false, number: 0 };
  });

  const directions = [-1, 0, 1];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      directions.forEach(dr => {
        directions.forEach(dc => {
          let nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < size && nc >= 0 && nc < size && board[nr][nc].mine) {
            count++;
          }
        });
      });
      board[r][c].number = count;
    }
  }

  return board;
};

const GameScreen = ({ navigation }) => {
  const { gridSize, mineCount } = useGame();
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setBoard(generateBoard(gridSize, mineCount));
    setGameOver(false);
  }, [mineCount]);

  const revealAllMines = (newBoard) => {
    return newBoard.map(row => row.map(cell => (cell.mine ? { ...cell, revealed: true } : cell)));
  };

  const revealCell = (row, col) => {
    if (gameOver || board[row][col].revealed) return;
  
    let newBoard = [...board];
    newBoard[row][col].revealed = true;
  
    if (newBoard[row][col].mine) {
      setGameOver(true);
      setBoard(revealAllMines(newBoard));
      setTimeout(() => {
        navigation.replace('GameOver', { message: 'You hit a mine! Try again.', won: false });
      }, 1000);
      return;
    }
  
    setBoard(newBoard);
  };

  useEffect(() => {
    const revealedCells = board.flat().filter(cell => cell.revealed).length;
    const totalCells = gridSize * gridSize;
    if (revealedCells === totalCells - mineCount && !gameOver) {
      setGameOver(true);
      setTimeout(() => {
        navigation.replace('GameOver', { message: 'You cleared the board!', won: true });
      }, 500);
    }
  }, [board]); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minesweeper</Text>
      <View style={styles.grid}>
        {board.map((row, rIndex) => (
          <View key={rIndex} style={styles.row}>
            {row.map((cell, cIndex) => (
              <Cell 
                key={cIndex} 
                cell={cell} 
                onPress={() => revealCell(rIndex, cIndex)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  grid: { 
    flexDirection: 'column' 
  },
  row: { 
    flexDirection: 'row' 
  },
});

export default GameScreen;
