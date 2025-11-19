export const dateFormatter = (value: string | Date): string => {
  const date = value instanceof Date ? value : new Date(value);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }
  return date.toLocaleDateString("fi-FI");
};
