const SHORTHAND_REGEX = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

export default (hex, opacity = 1) => {
  const hexRegex = hex.replace(SHORTHAND_REGEX, (m, r, g, b) => r + r + g + g + b + b);
  const value = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexRegex);
  let color;

  if (value) {
    color = {
      r: parseInt(value[1], 16),
      g: parseInt(value[2], 16),
      b: parseInt(value[3], 16),
    };
  }

  return color ? `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})` : null;
};
