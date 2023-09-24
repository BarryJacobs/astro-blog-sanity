export const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-GB", {
    timeZone: "UTC",
  });

export const isIntegerString = (
  value: string | undefined,
): number | undefined => {
  if (!value) return undefined;
  const num = parseInt(value, 10);
  return !Number.isNaN(num) && Number.isInteger(num) ? num : undefined;
};
