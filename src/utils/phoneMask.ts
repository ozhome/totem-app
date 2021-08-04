export const phoneMask = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length > 10) {
    return numbers.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
  }

  return numbers
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2');
};
