const BASE_COLOR = { r: 3, g: 138, b: 206 };

export const generateColor = (intensity: number) => {
  const r = Math.floor(BASE_COLOR.r + (255 - BASE_COLOR.r) * (1 - intensity));
  const g = Math.floor(BASE_COLOR.g + (255 - BASE_COLOR.g) * (1 - intensity));
  const b = Math.floor(BASE_COLOR.b + (255 - BASE_COLOR.b) * (1 - intensity));

  return `rgb(${r}, ${g}, ${b})`;
};
