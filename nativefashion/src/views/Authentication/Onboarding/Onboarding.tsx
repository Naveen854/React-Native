import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useRef} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

import Slide, {SLIDE_HEIGHT} from './Slide';
import SubSlide from './SubSlide';
import Dot from './Dot';

const BORDER_RADIUS = 75;

const {width} = Dimensions.get('window');

interface OnboardingProps {}

const slides = [
  {
    title: 'Relaxed',
    subTitle: 'Find Your Outfits',
    description:
      "Confused about your outfit? Don't worry! Find the best outfit here!",
    color: '#BFEAF5',
  },
  {
    title: 'Playful',
    subTitle: 'Hear it First, Wear it First',
    description:
      'Hating the clothes in your wardrobe? Explore hundreds of outfit ideas',
    color: '#beecc4',
  },
  {
    title: 'Excentric',
    subTitle: 'Your Style, Your Way',
    description:
      'Create your individual & unique style and look amazing everyday',
    color: '#ffe4d9',
  },
  {
    title: 'Funky',
    subTitle: 'Look Good, Feel Good',
    description:
      'Discover the latest trends in fashion and explore your personality',
    color: '#ffdddd',
  },
];

const Onboarding = () => {
  const scrollRef = useRef<Animated.ScrollView>(null);
  const x = useSharedValue(0);
  // TODO : useScrollHandler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
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

  const transformedFooterStyles = useAnimatedStyle(() => {
    return {transform: [{translateX: x.value * -1}]};
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, animatedBackground]}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={scrollHandler}>
          {slides.map(({title}, index) => (
            <Slide key={title} right={!!(index % 2)} {...{title}} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={[{...StyleSheet.absoluteFillObject}, animatedBackground]}
        />
        <View
          style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} {...{index, currentIndex: x.value / width}} />
            ))}
          </View>
          <Animated.View style={[{flex:1,flexDirection:'row',width: width * slides.length},
              transformedFooterStyles]}>
            {slides.map(({subTitle, description}, index) => (
              <SubSlide
                key={subTitle}
                onPress={() => {
                  if (scrollRef.current) {
                    scrollRef.current
                      .getNode()
                      .scrollTo({x: width * (index + 1), animated: true});
                  }
                }}
                last={index === slides.length - 1}
                {...{subTitle, description, x}}
              />
            ))}
          </Animated.View>
        </View>
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
    height: SLIDE_HEIGHT,
    borderBottomEndRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
  },
  footerContent: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: 'white',
    borderTopLeftRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    width,
  },
});
