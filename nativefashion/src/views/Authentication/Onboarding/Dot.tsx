import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';

interface DotProps {
  index: number;
  currentIndex: number;
  x: Animated.SharedValue<Number>;
}
const Dot = ({index, currentIndex, x}: DotProps) => {
  return (
    <Animated.View
      style={{backgroundColor: '#2cb9b0', width: 8, borderRadius: 4}}>
      <Text>Dot</Text>
    </Animated.View>
  );
};

export default Dot;

const styles = StyleSheet.create({});
