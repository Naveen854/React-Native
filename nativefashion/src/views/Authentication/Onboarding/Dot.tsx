import React from 'react';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

interface DotProps {
  index: number;
  currentIndex:  Animated.SharedValue<number>;
  // x: Animated.SharedValue<Number>;
}
const Dot = ({index, currentIndex}: DotProps) => {
    const style = useAnimatedStyle(()=>{
      const opacity = interpolate(currentIndex.value,
         [index - 1, index ,index + 1],
        [0.5,1,0.5],
         Extrapolate.CLAMP
        );
       const scale = interpolate(currentIndex.value,
           [index - 1,index,index + 1],
          [1, 1.25 ,1],
            Extrapolate.CLAMP
       );
       return {
          backgroundColor: '#2cb9b0',
          width: 8,
          height:8,
          borderRadius: 4,
          margin:4,
          opacity,
          transform:[{scale}],
       };
    });
  //   return {opacity,transform:[{scale}]};
  // });
  return (
    <Animated.View
      style={style} />
  );
};

export default Dot;
