import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';

const HomeScreen = ({ navigation }) => {
  const { setMineCount, gridSize } = useGame();
  const [selectedDifficulty, setSelectedDifficulty] = useState(5);
  const [customMines, setCustomMines] = useState(5);
  const maxMines = gridSize * gridSize - 1;

  const startGame = (mines) => {
    setMineCount(mines);
    navigation.replace('Game');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💣 Minesweeper 💣</Text>
      <Text style={styles.subtitle}>Select Difficulty</Text>

      {/* Difficulty Buttons */}
      <View style={styles.buttonContainer}>
        {[
          { label: 'Easy (5 Mines)', value: 5 },
          { label: 'Normal (10 Mines)', value: 10 },
          { label: 'Hard (15 Mines)', value: 15 },
        ].map(({ label, value }) => (
          <TouchableOpacity
            key={value}
            style={[styles.button, selectedDifficulty === value && styles.selected]}
            onPress={() => setSelectedDifficulty(value)}
          >
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom Difficulty Input */}
      <View style={styles.customContainer}>
        <Text style={styles.customText}>Custom Mines:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(customMines)}
          onChangeText={(text) => {
            let value = parseInt(text) || 0;
            if (value > maxMines) value = maxMines;
            setCustomMines(value);
          }}
        />
        <Text style={styles.maxText}>Max: {maxMines}</Text>
      </View>

      <TouchableOpacity 
  style={[styles.customButton, selectedDifficulty === 'custom' && styles.selected]} 
  onPress={() => setSelectedDifficulty('custom')}
>
  <Text style={styles.buttonText}>Custom ({customMines} Mines)</Text>
</TouchableOpacity>
      

      {/* Start Button */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => startGame(selectedDifficulty === 'custom' ? customMines : selectedDifficulty)}
      >
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#222',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32, 
    fontWeight: 'bold', 
    color: 'white', 
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20, 
    color: 'white', 
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 280,
  },
  button: {
    backgroundColor: '#444', 
    paddingVertical: 12, 
    borderRadius: 8, 
    alignItems: 'center',
    marginVertical: 6,
    width: '100%',
    maxWidth: 280,
  },
  selected: {
    backgroundColor: '#ffcc00',
  },
  buttonText: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: 'white',
  },
  customContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
    maxWidth: 280,
  },
  customButton: {
    backgroundColor: '#444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    width: '100%',
    maxWidth: 280,
  },
  customText: {
    fontSize: 16, 
    color: 'white', 
    marginRight: 10,
  },
  input: {
    backgroundColor: '#fff', 
    width: 50, 
    height: 40, 
    textAlign: 'center', 
    borderRadius: 5,
    fontSize: 18,
  },
  maxText: {
    fontSize: 14, 
    color: '#ffcc00', 
    marginLeft: 10,
  },
  startButton: {
    backgroundColor: '#28a745', 
    paddingVertical: 15, 
    borderRadius: 8, 
    alignItems: 'center',
    width: '100%',
    maxWidth: 280, 
    marginTop: 20,
  },
  startButtonText: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: 'white',
  },
});

export default HomeScreen;
