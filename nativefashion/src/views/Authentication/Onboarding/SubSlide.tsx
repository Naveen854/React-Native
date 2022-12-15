import {StyleSheet, View} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import {Button,theme,Text} from '../../../components';

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
      <Text variant="title2" style={styles.subTitle}>{subTitle}</Text>
      <Text variant="body" style={styles.description} >{description}</Text>
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
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    color: '#0c0d34',
    textAlign: 'center',
    marginBottom: 40,
  },
});
