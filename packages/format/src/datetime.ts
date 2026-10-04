/**
 * The system's date boundary: an instant is an ISO 8601 string, and the zone it
 * should be read in is a separate IANA identifier. No `Date` objects cross the
 * API, because a `Date` carries the *viewer's* zone silently and there is no way
 * to tell a correctly-zoned one from an accidentally-local one.
 */
export type Instant = string;
export type TimeZone = string;

const PARTS = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
} as const;

/** Milliseconds a zone is ahead of UTC at a given instant. Handles DST. */
function offsetAt(epochMs: number, timeZone: TimeZone): number {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, ...PARTS }).formatToParts(
    new Date(epochMs),
  );
  const at = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  // `hour` comes back as 24 at midnight under hour12: false in some engines.
  const hour = at("hour") % 24;
  const asIfUtc = Date.UTC(
    at("year"),
    at("month") - 1,
    at("day"),
    hour,
    at("minute"),
    at("second"),
  );
  return asIfUtc - epochMs;
}

/**
 * Turns a wall-clock reading ("2026-08-23T09:00", what someone typed into a
 * form) into the instant it names *in that zone*. Two passes, because the offset
 * itself depends on the instant across a DST boundary.
 */
export function zonedToInstant(wallClock: string, timeZone: TimeZone): Instant {
  const naive = Date.parse(`${wallClock.length === 16 ? wallClock : wallClock.slice(0, 16)}:00Z`);
  const guess = naive - offsetAt(naive, timeZone);
  return new Date(naive - offsetAt(guess, timeZone)).toISOString();
}

/** The inverse: the wall-clock reading an instant has in a zone, for a form field. */
export function instantToZoned(instant: Instant, timeZone: TimeZone): string {
  const epochMs = Date.parse(instant);
  return new Date(epochMs + offsetAt(epochMs, timeZone)).toISOString().slice(0, 16);
}

export type DateTimeStyle = "date" | "time" | "datetime" | "long";

const STYLES: Record<DateTimeStyle, Intl.DateTimeFormatOptions> = {
  date: { dateStyle: "medium" },
  time: { timeStyle: "short" },
  datetime: { dateStyle: "medium", timeStyle: "short" },
  // Not dateStyle/timeStyle: Intl rejects those combined with timeZoneName.
  long: {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  },
};

export function formatDateTime(
  instant: Instant,
  {
    timeZone,
    style = "datetime",
    locale,
  }: { timeZone: TimeZone; style?: DateTimeStyle; locale?: string },
): string {
  return new Intl.DateTimeFormat(locale, { timeZone, ...STYLES[style] }).format(
    Date.parse(instant),
  );
}

/** The zone's short name at an instant — "GMT+7", "EDT". DST-aware by definition. */
export function formatZoneName(instant: Instant, timeZone: TimeZone, locale?: string): string {
  const parts = new Intl.DateTimeFormat(locale, { timeZone, timeZoneName: "short" }).formatToParts(
    Date.parse(instant),
  );
  return parts.find((p) => p.type === "timeZoneName")?.value ?? timeZone;
}

const RELATIVE_STEPS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["second", 60_000],
  ["minute", 3_600_000],
  ["hour", 86_400_000],
  ["day", 2_592_000_000],
];

/** "12 minutes ago". `now` is a parameter so this stays pure and testable. */
export function formatRelative(instant: Instant, now: Instant, locale?: string): string {
  const diff = Date.parse(instant) - Date.parse(now);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const magnitude = Math.abs(diff);

  for (const [unit, limit] of RELATIVE_STEPS) {
    if (magnitude < limit) {
      const divisor = limit === 60_000 ? 1000 : limit / 60;
      return rtf.format(Math.round(diff / divisor), unit);
    }
  }
  return rtf.format(Math.round(diff / 2_592_000_000), "month");
}
