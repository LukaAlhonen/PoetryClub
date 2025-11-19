/**
 * Ensures no strings are empty
 * @param input - an object possibly containing strings
 **/
export const validateInputStrings = ({ input }: { input: Object }) => {
  Object.entries(input).forEach((entry) => {
    if (entry[1] instanceof String || typeof entry[1] === "string") {
      if (entry[1].trim() === "") {
        throw new Error(`${entry[0]} cannot be an empty string`);
      }
    }
  });
};
