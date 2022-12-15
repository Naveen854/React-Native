import {StyleSheet,Image, View, Dimensions} from 'react-native';
import React from 'react';

import { Text } from '../../../components';

interface SlideProps {
  title: string;
  picture:number;
  right?: boolean;
}

const {width, height} = Dimensions.get('window');
export const SLIDE_HEIGHT = 0.61 * height;
export const BORDER_RADIUS = width * 0.12;

const Slide = ({title,picture, right}: SlideProps) => {
  const multiplier = right ? 1 : -1;
  return (
    <View style={styles.container}>
      <View style={styles.underlay}>
        <Image style={styles.picture} source={picture} resizeMode="contain"/>
      </View>
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
        <Text variant="title1" style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    width: width,
    overflow:'hidden',
  },
  underlay:{
    ...StyleSheet.absoluteFillObject,
    justifyContent:'flex-end',
  },
  picture:{
    ...StyleSheet.absoluteFillObject,
    // top:SLIDE_HEIGHT-SLIDE_HEIGHT*0.01,
    height:undefined,
    width:undefined,
    borderBottomRightRadius:BORDER_RADIUS,
    alignSelf:'center',
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
