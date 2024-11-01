import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const LapTopSvg = ({ color, width, height }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path d="M13.3334 10.9231C13.6667 10.718 14.0001 8.9744 14.0001 7.33337C14.0001 5.69235 13.6667 3.94876 13.3334 3.74363C13.0001 3.5385 10.6667 3.33337 8.00008 3.33337C5.33341 3.33337 3.00008 3.5385 2.66675 3.74363C2.33341 3.94876 2.00008 5.69235 2.00008 7.33337C2.00008 8.9744 2.33341 10.718 2.66675 10.9231M2.50008 11H13.5001C13.9603 11 14.3334 11.3731 14.3334 11.8334C14.3334 12.2936 13.9603 12.6667 13.5001 12.6667H2.50008C2.03984 12.6667 1.66675 12.2936 1.66675 11.8334C1.66675 11.3731 2.03984 11 2.50008 11Z" stroke={color} style="stroke:#090A0A;stroke:color(display-p3 0.0353 0.0392 0.0392);stroke-opacity:1;" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  )
};

export default LapTopSvg;