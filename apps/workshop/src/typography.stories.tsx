import { Badge, Heading, Stack, Text } from "@collie/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = { title: "Primitives/Typography" } satisfies Meta;
export default meta;

export const Headings: StoryObj = {
  render: () => (
    <Stack space="200">
      {([1, 2, 3, 4] as const).map((level) => (
        <Heading key={level} level={level}>
          Heading level {level}
        </Heading>
      ))}
    </Stack>
  ),
};

export const TextScale: StoryObj = {
  render: () => (
    <Stack space="200">
      {(["lg", "md", "sm", "xs"] as const).map((size) => (
        <Text key={size} size={size}>
          {size} — the quick brown fox jumps over the lazy dog
        </Text>
      ))}
    </Stack>
  ),
};

export const Tones: StoryObj = {
  render: () => (
    <Stack space="200">
      {(["default", "muted", "accent", "critical", "warning", "success"] as const).map((tone) => (
        <Text key={tone} tone={tone}>
          {tone}
        </Text>
      ))}
    </Stack>
  ),
};

export const Badges: StoryObj = {
  render: () => (
    <Stack space="200" align="start">
      {(["neutral", "accent", "critical", "warning", "success"] as const).map((tone) => (
        <Badge key={tone} tone={tone}>
          {tone}
        </Badge>
      ))}
    </Stack>
  ),
};
