export function formatNumber(
  value: number,
  { locale, ...options }: Intl.NumberFormatOptions & { locale?: string } = {},
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Money is a minor-unit integer plus a currency code — never a float. The number
 * of minor units per major unit comes from the currency itself, so JPY (0) and
 * KWD (3) work without a lookup table of our own.
 */
export function formatCurrency(
  minorUnits: number,
  currency: string,
  { locale, ...options }: Intl.NumberFormatOptions & { locale?: string } = {},
): string {
  const format = new Intl.NumberFormat(locale, { style: "currency", currency, ...options });
  const digits = format.resolvedOptions().maximumFractionDigits ?? 2;
  return format.format(minorUnits / 10 ** digits);
}

export function formatPercent(
  ratio: number,
  { locale, ...options }: Intl.NumberFormatOptions & { locale?: string } = {},
): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
    ...options,
  }).format(ratio);
}
