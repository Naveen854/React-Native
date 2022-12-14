import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import {Button} from '../../../components';

interface SubSlideProps {
  subTitle: string;
  description: string;
  last?: boolean;
  x: Animated.SharedValue<number>;
  onPress: () => void;
}

const SubSlide = ({subTitle, description, last, onPress}: SubSlideProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>{subTitle}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button
        label={last ? "Let's get Started" : 'Next'}
        variant={last ? 'primary' : 'default'}
        {...{onPress}}
      />
    </View>
  );
};

export default SubSlide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 44,
  },
  subTitle: {
    fontFamily: 'SFProText-Semibold',
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 12,
    color: '#0c0d34',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'SFProText-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#0c0d34',
    textAlign: 'center',
    marginBottom: 40,
  },
});
