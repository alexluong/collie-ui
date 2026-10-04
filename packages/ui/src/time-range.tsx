import {
  absoluteFromWallClock,
  describeTimeRange,
  formatDateTime,
  formatZoneName,
  instantToZoned,
  resolveTimeRange,
  RELATIVE_PRESETS,
  type RelativeUnit,
  type TimeRange,
  type TimeZone,
} from "@collie/format";
import { popover } from "@collie/recipes-tw";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { useState } from "react";
import { Button } from "./button.js";
import { SelectField, TextField } from "./field.js";
import { Inline, Stack } from "./box.js";
import { Tab, TabList, TabPanel, Tabs } from "./tabs.js";
import { Text } from "./text.js";

const slots = popover();

const UNITS = [
  { value: "minute", label: "minutes" },
  { value: "hour", label: "hours" },
  { value: "day", label: "days" },
];

const ZONES = [
  "UTC",
  "America/Detroit",
  "America/Los_Angeles",
  "Europe/London",
  "Asia/Ho_Chi_Minh",
];

export type TimeRangePickerProps = {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  timeZone: TimeZone;
  onTimeZoneChange?: (timeZone: TimeZone) => void;
  /** Passed in so the component stays pure and stories stay deterministic. */
  now: string;
  label?: string;
};

export function TimeRangePicker({
  value,
  onChange,
  timeZone,
  onTimeZoneChange,
  now,
  label = "Time range",
}: TimeRangePickerProps) {
  const [open, setOpen] = useState(false);
  const resolved = resolveTimeRange(value, now);
  const [draftStart, setDraftStart] = useState(() => instantToZoned(resolved.start, timeZone));
  const [draftEnd, setDraftEnd] = useState(() => instantToZoned(resolved.end, timeZone));
  const [aroundAt, setAroundAt] = useState(() => instantToZoned(resolved.end, timeZone));
  const [aroundAmount, setAroundAmount] = useState("30");
  const [aroundUnit, setAroundUnit] = useState<RelativeUnit>("minute");

  const commit = (next: TimeRange) => {
    onChange(next);
    setOpen(false);
  };

  return (
    <BasePopover.Root open={open} onOpenChange={setOpen}>
      <BasePopover.Trigger
        render={
          <Button
            emphasis="secondary"
            tone="neutral"
            aria-label={label}
            children={`${describeTimeRange(value, { timeZone })} · ${formatZoneName(resolved.end, timeZone)}`}
          />
        }
      />
      <BasePopover.Portal>
        <BasePopover.Positioner sideOffset={6} align="end" className={slots.positioner()}>
          <BasePopover.Popup className={slots.popup()}>
            <div className={slots.section()}>
              <Tabs defaultValue={value.kind === "absolute" ? "custom" : "recent"}>
                <TabList>
                  <Tab value="recent">Recent</Tab>
                  <Tab value="custom">Custom</Tab>
                  <Tab value="around">Around a time</Tab>
                </TabList>

                <TabPanel value="recent">
                  <Stack space="0">
                    {RELATIVE_PRESETS.map((preset) => {
                      const selected =
                        value.kind === "relative" &&
                        preset.range.kind === "relative" &&
                        preset.range.amount === value.amount &&
                        preset.range.unit === value.unit;

                      return (
                        <button
                          key={preset.label}
                          type="button"
                          className={slots.option()}
                          data-selected={selected ? "" : undefined}
                          onClick={() => commit(preset.range)}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </Stack>
                </TabPanel>

                <TabPanel value="custom">
                  <Stack space="200">
                    <TextField
                      label="Start"
                      type="datetime-local"
                      value={draftStart}
                      onChange={(event) => setDraftStart(event.target.value)}
                    />
                    <TextField
                      label="End"
                      type="datetime-local"
                      value={draftEnd}
                      onChange={(event) => setDraftEnd(event.target.value)}
                    />
                    <Button
                      onClick={() => commit(absoluteFromWallClock(draftStart, draftEnd, timeZone))}
                    >
                      Apply range
                    </Button>
                  </Stack>
                </TabPanel>

                <TabPanel value="around">
                  <Stack space="200">
                    <TextField
                      label="Timestamp"
                      type="datetime-local"
                      value={aroundAt}
                      onChange={(event) => setAroundAt(event.target.value)}
                    />
                    <Inline space="100" alignY="bottom">
                      <TextField
                        label="Window"
                        type="number"
                        min={1}
                        value={aroundAmount}
                        onChange={(event) => setAroundAmount(event.target.value)}
                      />
                      <SelectField
                        label="Unit"
                        value={aroundUnit}
                        onChange={(event) => setAroundUnit(event.target.value as RelativeUnit)}
                        options={UNITS}
                      />
                    </Inline>
                    <Button
                      onClick={() =>
                        commit({
                          kind: "around",
                          at: absoluteFromWallClock(aroundAt, aroundAt, timeZone).start,
                          amount: Number(aroundAmount) || 1,
                          unit: aroundUnit,
                        })
                      }
                    >
                      Apply window
                    </Button>
                  </Stack>
                </TabPanel>
              </Tabs>
            </div>

            <div className={slots.footer()}>
              <Stack space="0">
                <Text size="xs" tone="muted">
                  {formatDateTime(resolved.start, { timeZone })} —{" "}
                  {formatDateTime(resolved.end, { timeZone })}
                </Text>
                <Text size="xs" tone="muted">
                  {timeZone}
                </Text>
              </Stack>
              {onTimeZoneChange ? (
                <SelectField
                  label="Time zone"
                  hideLabel
                  value={timeZone}
                  onChange={(event) => onTimeZoneChange(event.target.value)}
                  options={ZONES.map((zone) => ({ value: zone, label: zone }))}
                />
              ) : null}
            </div>
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
