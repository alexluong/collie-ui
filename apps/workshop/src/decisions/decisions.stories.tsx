import type { Meta, StoryObj } from "@storybook/react-vite";
import { Decisions } from "./decisions.js";

const meta = {
  title: "Guides/Decisions",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

export const Overview: StoryObj = { name: "Decisions", render: () => <Decisions /> };
