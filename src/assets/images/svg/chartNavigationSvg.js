import React from 'react';
import { SvgXml } from 'react-native-svg';
import { useTheme } from '../../../core/dopebase';

const chartNavigationSvg = (activeBtn) => {
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  let svgXml;
  if (activeBtn == 1) {
    svgXml = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path opacity="0.38" d="M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5V20H5C5 28.2843 11.7157 35 20 35Z" fill="#090A0A" style="fill:#090A0A;fill:color(display-p3 0.0353 0.0392 0.0392);fill-opacity:1;"/>
  <path d="M5 20C5 28.2843 11.7157 35 20 35C24.1421 35 27.8921 33.3211 30.6066 30.6066M5 20C5 11.7157 11.7157 5 20 5M5 20H20M20 5C28.2843 5 35 11.7157 35 20C35 24.1421 33.3211 27.8921 30.6066 30.6066M20 5V20M30.6066 30.6066L20 20" stroke="#090A0A" style="stroke:#090A0A;stroke:color(display-p3 0.0353 0.0392 0.0392);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  } else {
    svgXml = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path d="M3.5 14C3.5 19.799 8.20101 24.5 14 24.5C16.8995 24.5 19.5245 23.3247 21.4246 21.4246M3.5 14C3.5 8.20101 8.20101 3.5 14 3.5M3.5 14H14M14 3.5C19.799 3.5 24.5 8.20101 24.5 14C24.5 16.8995 23.3247 19.5245 21.4246 21.4246M14 3.5V14M21.4246 21.4246L14 14" stroke="#414446" style="stroke:#414446;stroke:color(display-p3 0.2549 0.2667 0.2745);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  }

  return <SvgXml xml={svgXml} />;
};

export default chartNavigationSvg;