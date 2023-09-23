
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export   const  RandomPosition=({text})=> {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const randomizePosition = () => {
    const randomTop = Math.floor(Math.random() * (height - 50)); // 50 - высота текста
    const randomLeft = Math.floor(Math.random() * (width - 50)); // 50 - ширина текста
    setPosition({ top: randomTop, left: randomLeft });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      randomizePosition();
    }, 30000);

    return () => clearInterval(timer); // очистка
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, position]}> {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  text: {
    position: 'absolute',
    width: 50,
    height: 50,
  },
});
