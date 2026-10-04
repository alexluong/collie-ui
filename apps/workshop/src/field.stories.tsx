import { Box, CheckboxField, SelectField, Stack, TextAreaField, TextField } from "@collie/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = { title: "Primitives/Fields" } satisfies Meta;
export default meta;

export const All: StoryObj = {
  render: () => (
    <Box padding="0">
      <Stack space="300">
        <TextField label="Name" placeholder="Jane Doe" description="As it appears on invoices." />
        <TextField label="Email" defaultValue="not-an-email" error="Enter a valid email address." />
        <SelectField
          label="Status"
          options={[
            { value: "paid", label: "Paid" },
            { value: "pending", label: "Pending" },
          ]}
        />
        <TextAreaField label="Notes" placeholder="Anything worth remembering." />
        <CheckboxField label="Send a receipt" description="Emailed once payment clears." />
      </Stack>
    </Box>
  ),
};
