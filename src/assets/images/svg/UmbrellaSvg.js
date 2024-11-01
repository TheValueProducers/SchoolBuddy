import React from 'react';
import Svg, { Path } from 'react-native-svg';

const UmbrellaSvg = ({ color, width, height }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 17" fill={color}>
      <Path d="M7.99998 8.50012V14.5001M7.99998 8.50012L3.99998 8.50012C3.2636 8.50012 2.65023 7.89408 2.83244 7.18059C3.06739 6.26058 3.54594 5.41169 4.22874 4.72889C5.22893 3.72869 6.58549 3.16679 7.99998 3.16679M7.99998 8.50012H12C12.7364 8.50012 13.3497 7.89408 13.1675 7.1806C12.9326 6.26058 12.454 5.41169 11.7712 4.72889C10.771 3.72869 9.41446 3.16679 7.99998 3.16679M7.99998 3.16679L7.99998 2.50012" stroke={color} style="stroke:#E5F554;stroke:color(display-p3 0.8980 0.9608 0.3294);stroke-opacity:1;" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  )
};

export default UmbrellaSvg;