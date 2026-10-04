import {
  Avatar,
  Badge,
  Box,
  Button,
  CheckboxField,
  Divider,
  Drawer,
  DrawerClose,
  DrawerPanel,
  DrawerTrigger,
  Heading,
  Inline,
  SelectField,
  Stack,
  Text,
  TextField,
  Tiles,
} from "@collie/ui";
import { Page, PageHeader } from "./parts.js";

type State = "connected" | "available" | "error";

const STATE: Record<State, { label: string; tone: "success" | "neutral" | "critical" }> = {
  connected: { label: "Connected", tone: "success" },
  available: { label: "Available", tone: "neutral" },
  error: { label: "Needs attention", tone: "critical" },
};

const INTEGRATIONS = [
  {
    name: "Stripe",
    blurb: "Sync invoices, payments and refunds.",
    state: "connected",
    category: "Billing",
  },
  {
    name: "Slack",
    blurb: "Post alerts to a channel of your choice.",
    state: "connected",
    category: "Comms",
  },
  {
    name: "QuickBooks",
    blurb: "Push revenue into your ledger nightly.",
    state: "error",
    category: "Billing",
  },
  {
    name: "HubSpot",
    blurb: "Keep tenant records in step with CRM.",
    state: "available",
    category: "Sales",
  },
  {
    name: "PagerDuty",
    blurb: "Escalate failed jobs to on-call.",
    state: "available",
    category: "Ops",
  },
  {
    name: "Snowflake",
    blurb: "Nightly export of usage events.",
    state: "available",
    category: "Data",
  },
] satisfies { name: string; blurb: string; state: State; category: string }[];

function ConfigureDrawer({ integration }: { integration: (typeof INTEGRATIONS)[number] }) {
  const connected = integration.state !== "available";

  return (
    <Drawer>
      <DrawerTrigger
        render={
          <Button
            size="sm"
            emphasis={connected ? "tertiary" : "secondary"}
            tone={connected ? "neutral" : "accent"}
            children={connected ? "Configure" : "Connect"}
          />
        }
      />
      <DrawerPanel
        title={integration.name}
        description={integration.blurb}
        footer={
          <>
            <DrawerClose render={<Button emphasis="tertiary" tone="neutral" children="Cancel" />} />
            <DrawerClose render={<Button children="Save connection" />} />
          </>
        }
      >
        <Stack space="300">
          <Inline space="100" alignY="center">
            <Avatar name={integration.name} size="lg" tone="accent" />
            <Badge tone={STATE[integration.state].tone}>{STATE[integration.state].label}</Badge>
          </Inline>

          <Divider />

          <TextField
            label="API key"
            type="password"
            defaultValue="sk_live_51H8xQ2"
            description="Rotated automatically every 90 days."
          />
          <SelectField
            label="Sync frequency"
            defaultValue="hourly"
            options={[
              { value: "realtime", label: "Real time" },
              { value: "hourly", label: "Hourly" },
              { value: "nightly", label: "Nightly" },
            ]}
          />
          <Stack space="200">
            <CheckboxField label="Sync invoices" defaultChecked />
            <CheckboxField label="Sync refunds" defaultChecked />
            <CheckboxField label="Sync disputes" />
          </Stack>

          {integration.state === "error" ? (
            <Box background="critical" border="critical" radius="md" padding="200">
              <Stack space="50">
                <Text size="xs" weight="medium" tone="critical">
                  Last sync failed
                </Text>
                <Text size="xs" tone="muted">
                  The credentials were rejected 4 hours ago.
                </Text>
              </Stack>
            </Box>
          ) : null}
        </Stack>
      </DrawerPanel>
    </Drawer>
  );
}

export function Integrations() {
  return (
    <Page>
      <PageHeader
        title="Integrations"
        description="Connect the tools this workspace already runs on."
        actions={
          <Button emphasis="secondary" tone="neutral">
            Browse directory
          </Button>
        }
      />

      <Tiles columns="3" space="200">
        {INTEGRATIONS.map((integration) => (
          <Box
            key={integration.name}
            background="surface"
            border="subtle"
            radius="md"
            padding="300"
            shadow="raised"
          >
            <Stack space="200">
              <Inline align="between" alignY="top" space="100">
                <Inline space="100" alignY="center">
                  <Avatar name={integration.name} tone="accent" />
                  <Stack space="0">
                    <Heading level={4}>{integration.name}</Heading>
                    <Text as="span" size="xs" tone="muted">
                      {integration.category}
                    </Text>
                  </Stack>
                </Inline>
                <Badge tone={STATE[integration.state].tone}>{STATE[integration.state].label}</Badge>
              </Inline>

              <Text size="xs" tone="muted">
                {integration.blurb}
              </Text>

              <Divider />

              <Inline align="between" alignY="center" space="100">
                <Text size="xs" tone="muted">
                  {integration.state === "connected" ? "Synced 4 minutes ago" : "Not connected"}
                </Text>
                <ConfigureDrawer integration={integration} />
              </Inline>
            </Stack>
          </Box>
        ))}
      </Tiles>
    </Page>
  );
}
