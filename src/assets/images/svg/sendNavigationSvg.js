import React from 'react';
import { SvgXml } from 'react-native-svg';
import { useTheme } from '../../../core/dopebase';

const sendNavigationSvg = (activeBtn) => {
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  let svgXml;
  if (activeBtn == 1) {
    svgXml = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M16.6667 23.3334L20.4547 32.1721C20.9761 33.3886 22.5977 33.5172 23.2478 32.3643C24.5305 30.0893 26.432 26.4204 28.3334 21.6667C31.6667 13.3334 33.3334 6.66675 33.3334 6.66675C33.3334 6.66675 26.6667 8.33341 18.3334 11.6667C13.5798 13.5682 9.91084 15.4696 7.63588 16.7524C6.48297 17.4024 6.6115 19.024 7.82803 19.5454L16.6667 23.3334Z" fill="#090A0A" style="fill:#090A0A;fill:color(display-p3 0.0353 0.0392 0.0392);fill-opacity:1;"/>
  <path d="M16.6667 23.3334L20.4547 32.1721C20.9761 33.3886 22.5977 33.5172 23.2478 32.3643C24.5305 30.0893 26.432 26.4204 28.3334 21.6667C31.6667 13.3334 33.3334 6.66675 33.3334 6.66675C33.3334 6.66675 26.6667 8.33341 18.3334 11.6667C13.5798 13.5682 9.91084 15.4696 7.63588 16.7524C6.48297 17.4024 6.6115 19.024 7.82803 19.5454L16.6667 23.3334Z" stroke="#090A0A" style="stroke:#090A0A;stroke:color(display-p3 0.0353 0.0392 0.0392);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  } else {
    svgXml = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path d="M11.6668 16.3334L14.3184 22.5205C14.6833 23.3721 15.8185 23.462 16.2735 22.655C17.1714 21.0625 18.5024 18.4943 19.8334 15.1667C22.1668 9.33341 23.3334 4.66675 23.3334 4.66675C23.3334 4.66675 18.6668 5.83341 12.8334 8.16675C9.50591 9.49776 6.93764 10.8288 5.34516 11.7267C4.53813 12.1817 4.6281 13.3168 5.47967 13.6818L11.6668 16.3334Z" stroke="#414446" style="stroke:#414446;stroke:color(display-p3 0.2549 0.2667 0.2745);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  }

  return <SvgXml xml={svgXml} />;
};

export default sendNavigationSvg;