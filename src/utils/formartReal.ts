export default function FormatReal(valor: number): string {
  return valor.toLocaleString('pt-br', {minimumFractionDigits: 2});
}
