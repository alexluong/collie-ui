import {
  Badge,
  Box,
  Button,
  Divider,
  Heading,
  Inline,
  SelectField,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  TextField,
  Tiles,
} from "@collie/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";

const THEMES = [
  { id: "polished", label: "Polished", note: "the default — Radix light ramps" },
  { id: "midnight", label: "Midnight", note: "same tokens, dark ramps" },
  { id: "sandstone", label: "Sandstone", note: "warm ramps, softer radius, humanist face" },
  { id: "wireframe", label: "Wireframe", note: "greyed, dashed, square, monospace" },
];

const meta = { title: "Foundations/Themes", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;

/** Every widget the themes actually differ on, in one small screen. */
function Sampler() {
  return (
    <Stack space="300">
      <Stack space="100">
        <Heading level={3}>Reservation 4192</Heading>
        <Inline space="100">
          <Badge tone="success">Confirmed</Badge>
          <Badge tone="warning">Deposit due</Badge>
          <Badge tone="neutral">2 nights</Badge>
        </Inline>
      </Stack>

      <Box background="surface" border="subtle" radius="md" padding="200" shadow="raised">
        <Stack space="200">
          <TextField label="Guest name" defaultValue="Marisol Vega" />
          <SelectField
            label="Room type"
            defaultValue="deluxe"
            options={[
              { value: "deluxe", label: "Deluxe king" },
              { value: "twin", label: "Twin" },
            ]}
          />
        </Stack>
      </Box>

      <Table>
        <TableHead>
          <TableHeaderCell>Night</TableHeaderCell>
          <TableHeaderCell align="end">Rate</TableHeaderCell>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>23 Aug</TableCell>
            <TableCell align="end">$248.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>24 Aug</TableCell>
            <TableCell align="end">$248.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Divider />

      <Inline space="100">
        <Button size="sm">Check in</Button>
        <Button size="sm" emphasis="secondary" tone="neutral">
          Move
        </Button>
        <Button size="sm" emphasis="tertiary" tone="critical">
          Cancel
        </Button>
      </Inline>
    </Stack>
  );
}

// Themes are plain CSS custom properties, so a subtree can carry its own — which
// is what makes a side-by-side gallery possible at all. An app sets the same
// attribute once, on the document root, so portalled surfaces inherit it too.
function ThemeFrame({ id, label, note }: { id: string; label: string; note: string }) {
  return (
    <div data-theme={id}>
      <Box background="canvas" padding="300">
        <Stack space="200">
          <Stack space="0">
            <Text size="xs" weight="strong">
              {label}
            </Text>
            <Text size="xs" tone="muted">
              {note}
            </Text>
          </Stack>
          <Divider />
          <Sampler />
        </Stack>
      </Box>
    </div>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return (
    <Tiles columns="4" space="0">
      {children}
    </Tiles>
  );
}

export const SideBySide: StoryObj = {
  name: "Side by side",
  render: () => (
    <Grid>
      {THEMES.map((theme) => (
        <ThemeFrame key={theme.id} {...theme} />
      ))}
    </Grid>
  ),
};

export const DensityAcrossThemes: StoryObj = {
  name: "Density × theme",
  render: () => (
    <Tiles columns="2" space="0">
      {["comfortable", "compact"].map((density) => (
        <div key={density} data-density={density === "compact" ? "compact" : undefined}>
          <Grid>
            {THEMES.slice(0, 2).map((theme) => (
              <ThemeFrame key={theme.id} {...theme} note={`${theme.note} · ${density}`} />
            ))}
          </Grid>
        </div>
      ))}
    </Tiles>
  ),
};
