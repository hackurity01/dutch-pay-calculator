import ColorHash from 'color-hash';
import memoize from 'sonic-memoize';

const colorHash = new ColorHash();

export const strToColor = memoize((str: string) => {
  return colorHash.hex(str) + 'dd';
});

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) ?? [
    '00',
    '00',
    '00',
    '00',
  ];
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

export function getTextColor(baseColor: string) {
  const CRITERION = 150;
  const rgb = hexToRgb(baseColor);
  const brightness = Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000);

  return brightness > CRITERION ? 'black' : 'white';
}
