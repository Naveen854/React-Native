import {StyleSheet } from 'react-native';
import React from 'react';
import Animated, { Extrapolate, interpolateNode } from 'react-native-reanimated';

interface DotProps {
  index: number;
  currentIndex:  Animated.Node<number>;
  // x: Animated.SharedValue<Number>;
}
const Dot = ({index, currentIndex}: DotProps) => {

    const opacity = interpolateNode(currentIndex,
     {inputRange: [index - 1, index ,index + 1],
      outputRange:[0.5,1,0.5],
      extrapolate:Extrapolate.CLAMP}
     );
    const scale = interpolateNode(currentIndex,
        {inputRange:[index - 1,index,index + 1],
        outputRange:[1, 1.25 ,1],
        extrapolate: Extrapolate.CLAMP}
    );
  //   return {opacity,transform:[{scale}]};
  // });
  return (
    <Animated.View
      style={[{opacity,transform:[{scale}]},styles.dotStyles]} />
  );
};

export default Dot;

const styles = StyleSheet.create({
  dotStyles:{
    backgroundColor: '#2cb9b0',
    width: 8,
    height:8,
    borderRadius: 4,
    margin:4,
  },
});
