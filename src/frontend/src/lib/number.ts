export const addCommaToNumber = (number: number) => {
  return `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
