import { Badge, Box, Button, Column, Columns, Divider, Inline, Stack, Text } from "@collie/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const SPACE = ["0", "50", "100", "150", "200", "300", "400", "600"] as const;

const meta = { title: "Primitives/Layout" } satisfies Meta;
export default meta;

function Swatch({ children }: { children: React.ReactNode }) {
  return (
    <Box background="accent" padding="100" radius="sm">
      <Text size="xs" tone="accent">
        {children}
      </Text>
    </Box>
  );
}

export const StackSpacing: StoryObj = {
  render: () => (
    <Stack space="300">
      {SPACE.map((space) => (
        <Stack key={space} space="50">
          <Text size="xs" tone="muted">
            space={space}
          </Text>
          <Stack space={space}>
            <Swatch>one</Swatch>
            <Swatch>two</Swatch>
          </Stack>
        </Stack>
      ))}
    </Stack>
  ),
};

export const InlineAlignment: StoryObj = {
  render: () => (
    <Stack space="300">
      {(["start", "center", "end", "between"] as const).map((align) => (
        <Box key={align} border="subtle" radius="md" padding="150">
          <Inline align={align} space="100">
            <Button size="sm">Primary</Button>
            <Button size="sm" emphasis="secondary" tone="neutral">
              Secondary
            </Button>
            <Badge tone="success">{align}</Badge>
          </Inline>
        </Box>
      ))}
    </Stack>
  ),
};

export const ColumnWidths: StoryObj = {
  render: () => (
    <Stack space="300">
      {(["auto", "1/2", "1/3", "1/4"] as const).map((width) => (
        <Columns key={width} space="150">
          <Column width={width}>
            <Swatch>width={width}</Swatch>
          </Column>
          <Column>
            <Swatch>auto</Swatch>
          </Column>
          <Column>
            <Swatch>auto</Swatch>
          </Column>
        </Columns>
      ))}
      <Divider />
      <Text size="xs" tone="muted">
        Columns collapse to a stack below the chosen breakpoint.
      </Text>
    </Stack>
  ),
};
