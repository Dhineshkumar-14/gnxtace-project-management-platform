export const formatInputDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};
