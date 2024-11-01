import React from 'react';
import { SvgXml } from 'react-native-svg';
import { useTheme } from '../../../core/dopebase';


const calendarNavigationSvg = (activeBtn) => {
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  let svgXml;
  if (activeBtn == 1) {
    svgXml = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M6.66675 31.6667C6.66675 33.5076 8.15913 35 10.0001 35H30.0001C31.841 35 33.3334 33.5076 33.3334 31.6667V18.3333M6.66675 31.6667V18.3333H33.3334M6.66675 31.6667V11.6667C6.66675 9.82572 8.15913 8.33333 10.0001 8.33333H30.0001C31.841 8.33333 33.3334 9.82572 33.3334 11.6667V18.3333M25.0001 5V11.6667M15.0001 5V11.6667" stroke="#090A0A" style="stroke:#090A0A;stroke:color(display-p3 0.0353 0.0392 0.0392);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="7" y="19" width="26" height="15" fill="#090A0A" style="fill:#090A0A;fill:color(display-p3 0.0353 0.0392 0.0392);fill-opacity:1;"/>
</svg>`;
  } else {
    svgXml = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path d="M23.3334 12.8333H4.66675M23.3334 12.8333V22.1667C23.3334 23.4553 22.2887 24.5 21.0001 24.5H7.00008C5.71142 24.5 4.66675 23.4553 4.66675 22.1667V8.16667C4.66675 6.878 5.71142 5.83333 7.00008 5.83333H21.0001C22.2887 5.83333 23.3334 6.878 23.3334 8.16667V12.8333ZM17.5001 3.5V8.16667M10.5001 3.5V8.16667" stroke="#414446" style="stroke:#414446;stroke:color(display-p3 0.2549 0.2667 0.2745);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  }

  return <SvgXml xml={svgXml} />;
};

export default calendarNavigationSvg;