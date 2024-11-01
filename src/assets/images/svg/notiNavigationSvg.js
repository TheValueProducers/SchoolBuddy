import React from 'react';
import { SvgXml } from 'react-native-svg';
import { useTheme } from '../../../core/dopebase';

const notiNavigationSvg = (activeBtn) => {
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  let svgXml;
  if (activeBtn == 1) {
    svgXml = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M19.9999 5.83325C14.4771 5.83325 9.99992 8.64374 9.99992 14.1666C9.99992 17.3985 8.82482 21.0221 7.61396 23.8981C6.60858 26.2861 8.29624 29.1666 10.8872 29.1666H29.1126C31.7036 29.1666 33.3913 26.2861 32.3859 23.8981C31.175 21.0221 29.9999 17.3985 29.9999 14.1666C29.9999 8.64374 25.5228 5.83325 19.9999 5.83325Z" fill="#090A0A" style="fill:#090A0A;fill:color(display-p3 0.0353 0.0392 0.0392);fill-opacity:1;"/>
  <path d="M14.9999 29.1666V30.8333C14.9999 33.5947 17.2385 34.9999 19.9999 34.9999C22.7614 34.9999 24.9999 33.5947 24.9999 30.8333V29.1666M9.99992 14.1666C9.99992 8.64374 14.4771 5.83325 19.9999 5.83325C25.5228 5.83325 29.9999 8.64374 29.9999 14.1666C29.9999 17.3985 31.175 21.0221 32.3859 23.8981C33.3913 26.2861 31.7036 29.1666 29.1126 29.1666H10.8872C8.29624 29.1666 6.60858 26.2861 7.61396 23.8981C8.82482 21.0221 9.99992 17.3985 9.99992 14.1666Z" stroke="#090A0A" style="stroke:#090A0A;stroke:color(display-p3 0.0353 0.0392 0.0392);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  } else {
    svgXml = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path d="M10.5 20.4166V21.5833C10.5 23.5162 12.067 24.4999 14 24.4999C15.933 24.4999 17.5 23.5162 17.5 21.5833V20.4166M7.00002 9.91659C7.00002 6.05059 10.134 4.08325 14 4.08325C17.866 4.08325 21 6.05059 21 9.91659C21 12.1789 21.8226 14.7155 22.6702 16.7287C23.374 18.4002 22.1926 20.4166 20.3789 20.4166H7.62113C5.80744 20.4166 4.62608 18.4002 5.32985 16.7287C6.17744 14.7155 7.00002 12.1789 7.00002 9.91659Z" stroke="#414446" style="stroke:#414446;stroke:color(display-p3 0.2549 0.2667 0.2745);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  }

  return <SvgXml xml={svgXml} />;
};

export default notiNavigationSvg;