import {
  describeTimeRange,
  formatDateTime,
  resolveTimeRange,
  type TimeRange,
} from "@collie/format";
import { Box, Inline, Stack, Text, TimeRangePicker } from "@collie/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const NOW = "2026-08-23T13:05:00.000Z";

const meta = { title: "Primitives/Time range" } satisfies Meta;
export default meta;

function Demo({ initial }: { initial: TimeRange }) {
  const [range, setRange] = useState<TimeRange>(initial);
  const [timeZone, setTimeZone] = useState("Asia/Ho_Chi_Minh");
  const resolved = resolveTimeRange(range, NOW);

  return (
    <Stack space="300" align="start">
      <TimeRangePicker
        value={range}
        onChange={setRange}
        timeZone={timeZone}
        onTimeZoneChange={setTimeZone}
        now={NOW}
      />

      <Box background="surface" border="subtle" radius="md" padding="200">
        <Stack space="100">
          <Text size="xs" tone="muted">
            The value the picker hands back — a description, not a frozen window:
          </Text>
          <Text size="xs">{JSON.stringify(range)}</Text>
          <Text size="xs" tone="muted">
            Resolved as of {NOW}:
          </Text>
          <Text size="xs">
            {resolved.start} → {resolved.end}
          </Text>
          <Text size="xs" tone="muted">
            Read in {timeZone}:
          </Text>
          <Text size="xs">
            {formatDateTime(resolved.start, { timeZone, style: "long" })} —{" "}
            {formatDateTime(resolved.end, { timeZone, style: "long" })}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
}

export const Relative: StoryObj = {
  render: () => <Demo initial={{ kind: "relative", amount: 6, unit: "hour" }} />,
};

export const Absolute: StoryObj = {
  render: () => (
    <Demo
      initial={{ kind: "absolute", start: "2026-08-20T00:00:00Z", end: "2026-08-23T00:00:00Z" }}
    />
  ),
};

export const AroundATime: StoryObj = {
  name: "Around a time",
  render: () => <Demo initial={{ kind: "around", at: NOW, amount: 30, unit: "minute" }} />,
};

export const SameInstantEveryZone: StoryObj = {
  name: "One instant, four zones",
  render: () => (
    <Stack space="150">
      <Text tone="muted">
        The same instant — 2026-08-23T13:05:00Z — read in four zones. Nothing about the value
        changes; only the zone it is read in does.
      </Text>
      {["UTC", "America/Detroit", "Europe/London", "Asia/Ho_Chi_Minh"].map((timeZone) => (
        <Inline key={timeZone} align="between" space="200">
          <Text size="xs" tone="muted">
            {timeZone}
          </Text>
          <Text size="xs">{formatDateTime(NOW, { timeZone, style: "long" })}</Text>
        </Inline>
      ))}
    </Stack>
  ),
};

export const Descriptions: StoryObj = {
  render: () => (
    <Stack space="100">
      {(
        [
          { kind: "relative", amount: 15, unit: "minute" },
          { kind: "relative", amount: 7, unit: "day" },
          { kind: "absolute", start: "2026-08-20T00:00:00Z", end: "2026-08-23T00:00:00Z" },
          { kind: "around", at: NOW, amount: 30, unit: "minute" },
        ] satisfies TimeRange[]
      ).map((range) => (
        <Text key={JSON.stringify(range)} size="xs">
          {describeTimeRange(range, { timeZone: "Asia/Ho_Chi_Minh" })}
        </Text>
      ))}
    </Stack>
  ),
};
