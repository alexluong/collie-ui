import {
  Avatar,
  Badge,
  Box,
  Button,
  Column,
  Columns,
  Dialog,
  DialogClose,
  DialogPanel,
  DialogTrigger,
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
import { Card, Page, PageHeader, Panel } from "./parts.js";

const METRICS = [
  { label: "Monthly revenue", value: "$48,210", delta: "+12.4%", tone: "success" },
  { label: "Active tenants", value: "1,284", delta: "+38", tone: "success" },
  { label: "Seats in use", value: "9,140", delta: "+2.1%", tone: "success" },
  { label: "Failed payments", value: "17", delta: "+5", tone: "critical" },
] as const;

const ACTIVITY = [
  { who: "Marisol Vega", what: "upgraded to Scale", when: "12 minutes ago", tone: "success" },
  { who: "Northwind Ltd", what: "payment failed", when: "1 hour ago", tone: "critical" },
  { who: "Tobias Fell", what: "invited 4 members", when: "3 hours ago", tone: "neutral" },
  { who: "Acme Corp", what: "trial ends tomorrow", when: "5 hours ago", tone: "warning" },
  { who: "Priya Raman", what: "connected Stripe", when: "yesterday", tone: "neutral" },
] as const;

function NewTenantDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>New tenant</Button>} />
      <DialogPanel
        title="Create a tenant"
        description="They will get an invite email straight away."
        footer={
          <>
            <DialogClose render={<Button emphasis="tertiary" tone="neutral" children="Cancel" />} />
            <DialogClose render={<Button children="Create tenant" />} />
          </>
        }
      >
        <Stack space="200">
          <TextField label="Company name" placeholder="Northwind Ltd" />
          <TextField label="Owner email" type="email" placeholder="owner@northwind.com" />
          <SelectField
            label="Plan"
            defaultValue="growth"
            options={[
              { value: "starter", label: "Starter" },
              { value: "growth", label: "Growth" },
              { value: "scale", label: "Scale" },
            ]}
          />
        </Stack>
      </DialogPanel>
    </Dialog>
  );
}

export function Dashboard() {
  return (
    <Page>
      <PageHeader
        title="Overview"
        description="How the workspace is doing this month."
        actions={
          <>
            <Button emphasis="secondary" tone="neutral">
              Export
            </Button>
            <NewTenantDialog />
          </>
        }
      />

      <Tiles columns="4" space="200">
        {METRICS.map((metric) => (
          <Box
            key={metric.label}
            background="surface"
            border="subtle"
            radius="md"
            padding="300"
            shadow="raised"
          >
            <Stack space="100">
              <Text size="xs" tone="muted">
                {metric.label}
              </Text>
              <Heading level={2}>{metric.value}</Heading>
              <Inline space="50" alignY="center">
                <Badge tone={metric.tone}>{metric.delta}</Badge>
                <Text size="xs" tone="muted">
                  vs last month
                </Text>
              </Inline>
            </Stack>
          </Box>
        ))}
      </Tiles>

      <Columns space="300" collapseBelow="md" alignY="stretch">
        <Column width="2/3">
          <Panel>
            <Box padding="300">
              <Inline align="between" alignY="center" space="200">
                <Heading level={3}>Recent activity</Heading>
                <Button size="sm" emphasis="tertiary" tone="neutral">
                  View all
                </Button>
              </Inline>
            </Box>
            <Divider />
            <Table>
              <TableHead>
                <TableHeaderCell>Account</TableHeaderCell>
                <TableHeaderCell>Event</TableHeaderCell>
                <TableHeaderCell align="end">When</TableHeaderCell>
              </TableHead>
              <TableBody>
                {ACTIVITY.map((row) => (
                  <TableRow key={row.who}>
                    <TableCell>
                      <Inline space="100" alignY="center">
                        <Avatar name={row.who} size="sm" />
                        <Text as="span" weight="medium">
                          {row.who}
                        </Text>
                      </Inline>
                    </TableCell>
                    <TableCell>
                      <Badge tone={row.tone}>{row.what}</Badge>
                    </TableCell>
                    <TableCell align="end">
                      <Text as="span" tone="muted">
                        {row.when}
                      </Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Panel>
        </Column>

        <Column>
          <Stack space="300">
            <Card title="Needs attention" description="Three things worth a look today.">
              <Stack space="200">
                <Inline align="between" alignY="center" space="100">
                  <Text>Failed payments</Text>
                  <Badge tone="critical">17</Badge>
                </Inline>
                <Divider />
                <Inline align="between" alignY="center" space="100">
                  <Text>Trials ending</Text>
                  <Badge tone="warning">6</Badge>
                </Inline>
                <Divider />
                <Inline align="between" alignY="center" space="100">
                  <Text>Support escalations</Text>
                  <Badge tone="neutral">2</Badge>
                </Inline>
              </Stack>
            </Card>

            <Card title="Plan mix">
              <Stack space="200">
                <Inline align="between" alignY="center">
                  <Text tone="muted">Starter</Text>
                  <Text weight="medium">612</Text>
                </Inline>
                <Inline align="between" alignY="center">
                  <Text tone="muted">Growth</Text>
                  <Text weight="medium">497</Text>
                </Inline>
                <Inline align="between" alignY="center">
                  <Text tone="muted">Scale</Text>
                  <Text weight="medium">175</Text>
                </Inline>
              </Stack>
            </Card>
          </Stack>
        </Column>
      </Columns>
    </Page>
  );
}
