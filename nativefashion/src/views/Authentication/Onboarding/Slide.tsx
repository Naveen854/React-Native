import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

interface SlideProps {
  title: string;
  right?: boolean;
}

const {width, height} = Dimensions.get('window');
export const SLIDE_HEIGHT = 0.61 * height;

const Slide = ({title, right}: SlideProps) => {
  const multiplier = right ? 1 : -1;
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.titleContainer,
          {
            transform: [
              {translateY: (SLIDE_HEIGHT - 100) / 2},
              {translateX: (multiplier * width) / 2 - multiplier * 50},
              {rotate: right ? '-90deg' : '90deg'},
            ],
          },
        ]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  titleContainer: {
    height: 100,
    textAlign: 'center',

    justifyContent: 'center',
  },
  title: {
    fontSize: 80,
    fontFamily: 'SFProText-Bold',
    color: 'white',
    lineHeight: 80,
    textAlign: 'center',
  },
});
