import {StyleSheet,  View, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

import Slide from './Slide';

const {width, height} = Dimensions.get('window');

// interface OnboardingProps {}

const slides = [
  {label: 'Relaxed', color: '#BFEAF5'},
  {label: 'Playful', color: '#beecc4'},
  {label: 'Excentric', color: '#ffe4d9'},
  {label: 'Funky', color: '#ffdddd'},
];

const Onboarding = () => {
  const x = useSharedValue(0);
  // TODO : useScrollEvent
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e, context) => {
      x.value = e.contentOffset.x;
    },
  });

  const animatedBackground = useAnimatedStyle(() => {
    const color = interpolateColor(
      x.value,
      slides.map((_, i) => i * width),
      slides.map(slide => slide.color),
    );
    return {backgroundColor: color};
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, animatedBackground]}>
        <Animated.ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={onScroll}>
          {slides.map(({label}, index) => (
            <Slide key={label} right={!!(index % 2)} {...{label}} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{...StyleSheet.absoluteFillObject, ...animatedBackground}}>
          <View style={styles.footerContent} />
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slider: {
    height: 0.61 * height,
    borderBottomEndRadius: 75,
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
  },
  footerContent: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 75,
  },
});
