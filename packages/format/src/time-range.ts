import { zonedToInstant, type Instant, type TimeZone } from "./datetime.js";

/**
 * What a time range picker hands back. A relative range stays relative until it
 * is resolved: "last 6 hours" asked twice means two different windows, and a
 * saved view should re-resolve rather than freeze.
 */
export type TimeRange =
  | { kind: "relative"; amount: number; unit: RelativeUnit }
  | { kind: "absolute"; start: Instant; end: Instant }
  | { kind: "around"; at: Instant; amount: number; unit: RelativeUnit };

export type RelativeUnit = "minute" | "hour" | "day";

export type ResolvedRange = { start: Instant; end: Instant };

const MS: Record<RelativeUnit, number> = {
  minute: 60_000,
  hour: 3_600_000,
  day: 86_400_000,
};

/** Collapses any range into a concrete window, as of `now`. */
export function resolveTimeRange(range: TimeRange, now: Instant): ResolvedRange {
  const nowMs = Date.parse(now);

  switch (range.kind) {
    case "absolute":
      return { start: range.start, end: range.end };
    case "relative":
      return {
        start: new Date(nowMs - range.amount * MS[range.unit]).toISOString(),
        end: now,
      };
    case "around": {
      const atMs = Date.parse(range.at);
      const half = range.amount * MS[range.unit];
      return {
        start: new Date(atMs - half).toISOString(),
        end: new Date(atMs + half).toISOString(),
      };
    }
  }
}

export function absoluteFromWallClock(
  start: string,
  end: string,
  timeZone: TimeZone,
): Extract<TimeRange, { kind: "absolute" }> {
  return {
    kind: "absolute",
    start: zonedToInstant(start, timeZone),
    end: zonedToInstant(end, timeZone),
  };
}

export const RELATIVE_PRESETS: { label: string; range: TimeRange }[] = [
  { label: "Last 15 minutes", range: { kind: "relative", amount: 15, unit: "minute" } },
  { label: "Last hour", range: { kind: "relative", amount: 1, unit: "hour" } },
  { label: "Last 6 hours", range: { kind: "relative", amount: 6, unit: "hour" } },
  { label: "Last 12 hours", range: { kind: "relative", amount: 12, unit: "hour" } },
  { label: "Last day", range: { kind: "relative", amount: 1, unit: "day" } },
  { label: "Last 7 days", range: { kind: "relative", amount: 7, unit: "day" } },
  { label: "Last 30 days", range: { kind: "relative", amount: 30, unit: "day" } },
];

const UNIT_LABEL: Record<RelativeUnit, [string, string]> = {
  minute: ["minute", "minutes"],
  hour: ["hour", "hours"],
  day: ["day", "days"],
};

function plural(amount: number, unit: RelativeUnit) {
  const [one, many] = UNIT_LABEL[unit];
  return `${amount} ${amount === 1 ? one : many}`;
}

/** The trigger label. Relative ranges stay described, not resolved — that is the point. */
export function describeTimeRange(
  range: TimeRange,
  { timeZone, locale }: { timeZone: TimeZone; locale?: string },
): string {
  if (range.kind === "relative") {
    const preset = RELATIVE_PRESETS.find(
      (p) =>
        p.range.kind === "relative" &&
        p.range.amount === range.amount &&
        p.range.unit === range.unit,
    );
    return preset?.label ?? `Last ${plural(range.amount, range.unit)}`;
  }

  const format = new Intl.DateTimeFormat(locale, {
    timeZone,
    dateStyle: "medium",
    timeStyle: "short",
  });

  if (range.kind === "around") {
    return `${plural(range.amount, range.unit)} around ${format.format(Date.parse(range.at))}`;
  }
  return format.formatRange(Date.parse(range.start), Date.parse(range.end));
}
