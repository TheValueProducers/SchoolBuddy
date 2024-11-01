import React from 'react';
// import { View as RNView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useSpacing} from '../../../hooks/useSpacing';
import {useDopebase} from '../../../theming';
import dynamicStyles from './styles';

const View = props => {
  const {children, style, animation} = props;

  const spacingStyles = useSpacing(props);

  const viewStyles = [...spacingStyles, style];

  return (
    <Animatable.View animation={animation} style={viewStyles}>
      {children}
    </Animatable.View>
  );
};

export default React.memo(useDopebase(View, dynamicStyles));
