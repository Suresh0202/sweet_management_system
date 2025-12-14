export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};

export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};
