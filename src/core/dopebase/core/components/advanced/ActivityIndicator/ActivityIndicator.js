import React, { memo } from 'react';
import { View, Text, ActivityIndicator as RNActivityIndicator } from 'react-native';
import { useTheme } from '../../..';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import dynamicStyles from './styles';

export const ActivityIndicator = memo(props => {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <BarIndicator
          color="#f5f5f5"
        // size={48}
        // animationDuration={800}
        />
        {props.text && props.text.length > 1 ? (
          <Text>{props.text}</Text>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
});
