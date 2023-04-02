export const validateStringStartsWith = (string, startsWith) => {
  return string.startsWith(startsWith);
};

/*
  because of the entire api returns N/A if the value is null
*/
export function validateIsStringApplicable(string) {
  return string !== "N/A";
}
