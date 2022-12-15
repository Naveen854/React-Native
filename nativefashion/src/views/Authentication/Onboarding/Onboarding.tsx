import {StyleSheet, View, Dimensions} from 'react-native';
import React, {useRef} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import Slide, {BORDER_RADIUS, SLIDE_HEIGHT} from './Slide';
import SubSlide from './SubSlide';
import Dot from './Dot';


const {width} = Dimensions.get('window');

interface OnboardingProps {}

const slides = [
  {
    title: 'Relaxed',
    subTitle: 'Find Your Outfits',
    description:
      "Confused about your outfit? Don't worry! Find the best outfit here!",
    color: '#BFEAF5',
    picture: require('../../assets/images/1.png'),
  },
  {
    title: 'Playful',
    subTitle: 'Hear it First, Wear it First',
    description:
      'Hating the clothes in your wardrobe? Explore hundreds of outfit ideas',
    color: '#beecc4',
    picture: require('../../assets/images/2.png'),
  },
  {
    title: 'Excentric',
    subTitle: 'Your Style, Your Way',
    description:
      'Create your individual & unique style and look amazing everyday',
    color: '#ffe4d9',
    picture: require('../../assets/images/3.png'),
  },
  {
    title: 'Funky',
    subTitle: 'Look Good, Feel Good',
    description:
      'Discover the latest trends in fashion and explore your personality',
    color: '#ffdddd',
    picture: require('../../assets/images/4.png'),
  },
];

const Onboarding = () => {
  // const scrollRef = useRef<Animated.ScrollView>(null);
  // const x = useSharedValue(0);
  // // TODO : useScrollHandler
  // const scrollHandler = useAnimatedScrollHandler({
  //   onScroll: e => {
  //     x.value = e.contentOffset.x;
  //   },
  // });

  // const animatedBackground = useAnimatedStyle(() => {
  //   const color = interpolateColor(
  //     x.value,
  //     slides.map((_, i) => i * width),
  //     slides.map(slide => slide.color),
  //   );
  //   return {backgroundColor: color};
  // });

  // const transformedFooterStyles = useAnimatedStyle(() => {
  //   return {transform: [{translateX: x.value * -1}]};
  // });

  const scrollRef = useRef<Animated.ScrollView>(null);
  const x = useSharedValue(0);
  // TODO : useScrollHandler
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset}) => {
      x.value = contentOffset.x;
    },
  });

  const backgroundColor = useDerivedValue(() =>
    interpolateColor(
      x.value,
      slides.map((_, i) => i * width),
      slides.map(slide => slide.color),
    ),
  );

  const background = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  const transformedFooterStyles = useAnimatedStyle(() => ({
    flex: 1,
    flexDirection: 'row',
    transform: [{translateX: -x.value}],
  }));

  const currentIndex = useDerivedValue(() => x.value / width);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, background]}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={onScroll}>
          {slides.map(({title, picture}, index) => (
            <Slide key={title} right={!!(index % 2)} {...{title, picture}} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={[{...StyleSheet.absoluteFillObject}, background]}
        />
        <View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} {...{index, currentIndex}} />
            ))}
          </View>
          <Animated.View
            style={[{width: width * slides.length}, transformedFooterStyles]}>
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
    flexDirection: 'row',
    width,
  },
});
