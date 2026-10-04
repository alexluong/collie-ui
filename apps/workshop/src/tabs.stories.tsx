import { Stack, Tab, TabList, TabPanel, Tabs, Text } from "@collie/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = { title: "Primitives/Tabs" } satisfies Meta;
export default meta;

export const Basic: StoryObj = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="members">Members</Tab>
        <Tab value="billing">Billing</Tab>
      </TabList>
      <TabPanel value="overview">
        <Stack space="100">
          <Text>Overview panel</Text>
          <Text tone="muted">
            The moving indicator reads Base UI&apos;s `--active-tab-width` and `--active-tab-left`,
            so the recipe animates it without any measuring code.
          </Text>
        </Stack>
      </TabPanel>
      <TabPanel value="members">
        <Text>Members panel</Text>
      </TabPanel>
      <TabPanel value="billing">
        <Text>Billing panel</Text>
      </TabPanel>
    </Tabs>
  ),
};
