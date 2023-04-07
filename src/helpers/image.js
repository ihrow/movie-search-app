export function getHigherResolutionImage(image, size) {
  return image?.replace("SX300", `SX${size}`);
}