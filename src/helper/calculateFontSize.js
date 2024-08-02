export const calculateFontSize = (num, baseSize, maxLength) => {
  const length = num.toString().length;
  if (length <= maxLength) {
    return baseSize
  } else {
    return baseSize *  maxLength / length * 0.97
  }
}