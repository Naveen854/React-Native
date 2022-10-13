import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RectButton} from 'react-native-gesture-handler';

interface ButtonProps {
  variant: 'default' | 'primary';
  label: string;
  onPress: () => void;
}
const Button = ({label, variant, onPress}: ButtonProps) => {
  const backgroundColor =
    variant === 'primary' ? '#2c8980' : 'rgba(12,13,51,0.05)';
  const color = variant === 'primary' ? '#ffffff' : '#0c0d34';

  return (
    <RectButton {...{onPress}}>
      <View style={[styles.container, {backgroundColor}]}>
        <Text style={[styles.label, {color}]}>{label}</Text>
      </View>
    </RectButton>
  );
};

Button.defaultProps = {variant: 'default'};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontFamily: 'SFProText-Regular',
    textAlign: 'center',
  },
});
