/**
 * Currency formatting helpers.
 *
 * Amounts are stored as plain numbers in the major unit (rupees, not paise).
 * Formatting is centralised here so mobile, web, and API responses never drift
 * apart on how money is rendered.
 */

const DEFAULT_CURRENCY = 'INR';
const DEFAULT_LOCALE = 'en-IN';

const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

/** Returns the symbol for a currency code, falling back to the code itself. */
export function currencySymbol(currency: string = DEFAULT_CURRENCY): string {
  return CURRENCY_SYMBOLS[currency.toUpperCase()] ?? currency.toUpperCase();
}

export interface FormatCurrencyOptions {
  /** ISO 4217 code. Defaults to INR. */
  currency?: string;
  /** BCP 47 locale used for digit grouping. Defaults to en-IN (lakh/crore). */
  locale?: string;
  /**
   * Force a fixed number of decimals. When omitted, whole amounts render with
   * no decimals and fractional amounts render with two.
   */
  decimals?: number;
  /** Omit the currency symbol and return digits only. */
  omitSymbol?: boolean;
}

function resolveDecimals(amount: number, explicit?: number): number {
  if (explicit !== undefined) return explicit;
  return Number.isInteger(amount) ? 0 : 2;
}

/**
 * Formats an amount for display, e.g. `formatCurrency(125000)` -> "₹1,25,000".
 *
 * Non-finite input formats as a zero amount rather than rendering "NaN" to a
 * user; validate before calling if the distinction matters.
 */
export function formatCurrency(
  amount: number,
  options: FormatCurrencyOptions = {},
): string {
  const {
    currency = DEFAULT_CURRENCY,
    locale = DEFAULT_LOCALE,
    decimals,
    omitSymbol = false,
  } = options;

  const safeAmount = Number.isFinite(amount) ? amount : 0;
  const fractionDigits = resolveDecimals(safeAmount, decimals);

  const digits = Math.abs(safeAmount).toLocaleString(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  const sign = safeAmount < 0 ? '-' : '';
  return omitSymbol
    ? `${sign}${digits}`
    : `${sign}${currencySymbol(currency)}${digits}`;
}

/**
 * Like {@link formatCurrency} but always prefixes an explicit `+` or `-`.
 * Useful for balances where direction matters more than magnitude.
 */
export function formatSignedCurrency(
  amount: number,
  options: FormatCurrencyOptions = {},
): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  const formatted = formatCurrency(Math.abs(safeAmount), options);
  if (safeAmount === 0) return formatted;
  return `${safeAmount > 0 ? '+' : '-'}${formatted}`;
}

/**
 * Formats an amount for embedding in a UPI deep link, which requires exactly
 * two decimal places (`am=499.50`, never `am=499.5`).
 */
export function formatAmountForUpi(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? Math.abs(amount) : 0;
  return safeAmount.toFixed(2);
}

/**
 * Parses user keyboard input into a positive amount.
 *
 * Returns `null` for anything that is not a usable positive number, including
 * partial input such as `"."` or `"1.2.3"`. Callers must treat `null` as a
 * validation failure — do not fall back to 0.
 */
export function parseAmountInput(input: string): number | null {
  const trimmed = input.trim();
  if (trimmed === '') return null;
  if (!/^\d*\.?\d*$/.test(trimmed)) return null;

  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed <= 0) return null;
  return parsed;
}

/**
 * Strips everything that cannot appear in a decimal amount and collapses
 * repeated decimal points, so a text input can be sanitised on every keystroke
 * without rejecting the user's edit outright.
 */
export function sanitizeAmountInput(input: string): string {
  const cleaned = input.replace(/[^0-9.]/g, '');
  const [whole, ...rest] = cleaned.split('.');
  if (rest.length === 0) return whole;
  return `${whole}.${rest.join('')}`;
}
