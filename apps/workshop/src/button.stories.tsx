import { Button } from "@collie/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const EMPHASIS = ["primary", "secondary", "tertiary"] as const;
const TONES = ["neutral", "accent", "critical"] as const;

const meta = {
  title: "Primitives/Button",
  component: Button,
  argTypes: {
    emphasis: { control: "inline-radio", options: EMPHASIS },
    tone: { control: "inline-radio", options: TONES },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  args: { children: "Save changes" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: (args) => (
    <table className="border-separate border-spacing-100">
      <tbody>
        {EMPHASIS.map((emphasis) => (
          <tr key={emphasis}>
            <td className="pr-200 text-sm text-fg-muted">{emphasis}</td>
            {TONES.map((tone) => (
              <td key={tone}>
                <Button {...args} emphasis={emphasis} tone={tone}>
                  {tone}
                </Button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-100">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex items-center gap-100">
      <Button {...args}>Default</Button>
      <Button {...args} disabled>
        Disabled
      </Button>
      <Button {...args} loading>
        Loading
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex items-center gap-100">
      <Button {...args} leading={<Dot />}>
        Leading
      </Button>
      <Button {...args} trailing={<Dot />}>
        Trailing
      </Button>
    </div>
  ),
};

function Dot() {
  return (
    <svg viewBox="0 0 8 8" aria-hidden className="size-full">
      <circle cx="4" cy="4" r="4" fill="currentColor" />
    </svg>
  );
}
