import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Column,
  Columns,
  Divider,
  Drawer,
  DrawerClose,
  DrawerPanel,
  DrawerTrigger,
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
} from "@collie/ui";
import { DetailRow, Page, PageHeader, Panel } from "./parts.js";

type Plan = "Starter" | "Growth" | "Scale";
type Status = "active" | "trial" | "past_due" | "churned";

const STATUS: Record<
  Status,
  { label: string; tone: "success" | "warning" | "critical" | "neutral" }
> = {
  active: { label: "Active", tone: "success" },
  trial: { label: "Trial", tone: "warning" },
  past_due: { label: "Past due", tone: "critical" },
  churned: { label: "Churned", tone: "neutral" },
};

const TENANTS = [
  {
    name: "Northwind Ltd",
    owner: "marisol@northwind.com",
    plan: "Scale",
    seats: 240,
    status: "past_due",
    mrr: "$4,800",
  },
  {
    name: "Acme Corp",
    owner: "tobias@acme.io",
    plan: "Growth",
    seats: 82,
    status: "trial",
    mrr: "$0",
  },
  {
    name: "Harbour Foods",
    owner: "priya@harbour.co",
    plan: "Growth",
    seats: 51,
    status: "active",
    mrr: "$1,020",
  },
  {
    name: "Kestrel Labs",
    owner: "dan@kestrel.dev",
    plan: "Starter",
    seats: 12,
    status: "active",
    mrr: "$240",
  },
  {
    name: "Vela Studio",
    owner: "ha@vela.studio",
    plan: "Starter",
    seats: 6,
    status: "churned",
    mrr: "$0",
  },
] satisfies {
  name: string;
  owner: string;
  plan: Plan;
  seats: number;
  status: Status;
  mrr: string;
}[];

function TenantDrawer({ tenant }: { tenant: (typeof TENANTS)[number] }) {
  return (
    <Drawer>
      <DrawerTrigger
        render={<Button size="sm" emphasis="tertiary" tone="neutral" children="View" />}
      />
      <DrawerPanel
        title={tenant.name}
        description={tenant.owner}
        footer={
          <>
            <DrawerClose render={<Button emphasis="tertiary" tone="neutral" children="Close" />} />
            <Button>Open full record</Button>
          </>
        }
      >
        <Stack space="300">
          <Inline space="100" alignY="center">
            <Avatar name={tenant.name} size="lg" tone="accent" />
            <Stack space="50">
              <Badge tone={STATUS[tenant.status].tone}>{STATUS[tenant.status].label}</Badge>
              <Text size="xs" tone="muted">
                Customer since March 2024
              </Text>
            </Stack>
          </Inline>
          <Divider />
          <Columns space="200">
            <Column>
              <DetailRow label="Plan">{tenant.plan}</DetailRow>
            </Column>
            <Column>
              <DetailRow label="Seats">{tenant.seats}</DetailRow>
            </Column>
          </Columns>
          <Columns space="200">
            <Column>
              <DetailRow label="MRR">{tenant.mrr}</DetailRow>
            </Column>
            <Column>
              <DetailRow label="Renews">1 Sep 2026</DetailRow>
            </Column>
          </Columns>
          <Divider />
          <DetailRow label="Notes">
            Migrated from the legacy plan in June. Wants SSO before renewal.
          </DetailRow>
        </Stack>
      </DrawerPanel>
    </Drawer>
  );
}

export function TenantList() {
  return (
    <Page>
      <PageHeader
        title="Tenants"
        description="Every workspace on the platform."
        actions={
          <>
            <Button emphasis="secondary" tone="neutral">
              Import
            </Button>
            <Button>New tenant</Button>
          </>
        }
      />

      <Panel>
        <Box padding="200">
          <Columns space="200" collapseBelow="md" alignY="center">
            <Column width="1/2">
              <TextField label="Search tenants" hideLabel placeholder="Search tenants" />
            </Column>
            <Column>
              <SelectField
                label="Plan"
                hideLabel
                defaultValue="all"
                options={[
                  { value: "all", label: "All plans" },
                  { value: "starter", label: "Starter" },
                  { value: "growth", label: "Growth" },
                  { value: "scale", label: "Scale" },
                ]}
              />
            </Column>
            <Column>
              <SelectField
                label="Status"
                hideLabel
                defaultValue="all"
                options={[
                  { value: "all", label: "Any status" },
                  { value: "active", label: "Active" },
                  { value: "trial", label: "Trial" },
                  { value: "past_due", label: "Past due" },
                ]}
              />
            </Column>
          </Columns>
        </Box>

        <Divider />

        <Box background="accent" paddingX="200" paddingY="150">
          <Inline align="between" alignY="center" space="200">
            <Text size="xs" tone="accent">
              2 tenants selected
            </Text>
            <Inline space="100">
              <Button size="sm" emphasis="secondary" tone="neutral">
                Change plan
              </Button>
              <Button size="sm" emphasis="secondary" tone="critical">
                Suspend
              </Button>
            </Inline>
          </Inline>
        </Box>

        <Box overflow="auto">
          <Table>
            <TableHead>
              <TableHeaderCell>
                <Checkbox aria-label="Select all tenants" />
              </TableHeaderCell>
              <TableHeaderCell>Tenant</TableHeaderCell>
              <TableHeaderCell>Plan</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell align="end">Seats</TableHeaderCell>
              <TableHeaderCell align="end">MRR</TableHeaderCell>
              <TableHeaderCell align="end">Actions</TableHeaderCell>
            </TableHead>
            <TableBody>
              {TENANTS.map((tenant, index) => (
                <TableRow key={tenant.name}>
                  <TableCell>
                    <Checkbox aria-label={`Select ${tenant.name}`} defaultChecked={index < 2} />
                  </TableCell>
                  <TableCell>
                    <Inline space="100" alignY="center">
                      <Avatar name={tenant.name} />
                      <Stack space="0">
                        <Text as="span" weight="medium">
                          {tenant.name}
                        </Text>
                        <Text as="span" size="xs" tone="muted">
                          {tenant.owner}
                        </Text>
                      </Stack>
                    </Inline>
                  </TableCell>
                  <TableCell>{tenant.plan}</TableCell>
                  <TableCell>
                    <Badge tone={STATUS[tenant.status].tone}>{STATUS[tenant.status].label}</Badge>
                  </TableCell>
                  <TableCell align="end">{tenant.seats}</TableCell>
                  <TableCell align="end">{tenant.mrr}</TableCell>
                  <TableCell align="end">
                    <TenantDrawer tenant={tenant} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Divider />

        <Box padding="200">
          <Inline align="between" alignY="center" space="200">
            <Text size="xs" tone="muted">
              Showing 1–5 of 1,284
            </Text>
            <Inline space="100">
              <Button size="sm" emphasis="secondary" tone="neutral" disabled>
                Previous
              </Button>
              <Button size="sm" emphasis="secondary" tone="neutral">
                Next
              </Button>
            </Inline>
          </Inline>
        </Box>
      </Panel>
    </Page>
  );
}
