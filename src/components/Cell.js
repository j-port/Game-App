import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Cell = ({ cell, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.cell, cell.revealed ? styles.revealed : {}]} 
      onPress={onPress}
      disabled={cell.revealed}
    >
      <Text style={styles.cellText}>
        {cell.revealed ? (cell.mine ? '💣' : cell.number || '') : ''}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 50, height: 50, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#ccc', borderWidth: 1,
  },
  revealed: {
    backgroundColor: '#eee',
  },
  cellText: {
    fontSize: 20, fontWeight: 'bold',
  }
});

export default Cell;
