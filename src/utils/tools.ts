export const camelCase = (name: string) => {
  return name
    .replace(
      /([\:\-\_]+(.))/g,
      (_, separator, letter, offset) =>
        offset ? letter.toUpperCase() : letter
    )
    .replace(/^moz([A-Z])/, 'Moz$1');
};
