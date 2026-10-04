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
  Stack,
  Tab,
  TabList,
  TabPanel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Tabs,
  Text,
} from "@collie/ui";
import { Card, DetailRow, Page, Panel } from "./parts.js";

const MEMBERS = [
  { name: "Marisol Vega", email: "marisol@northwind.com", role: "Owner", status: "Active" },
  { name: "Tobias Fell", email: "tobias@northwind.com", role: "Admin", status: "Active" },
  { name: "Priya Raman", email: "priya@northwind.com", role: "Member", status: "Invited" },
  { name: "Dan Okafor", email: "dan@northwind.com", role: "Member", status: "Active" },
];

const INVOICES = [
  {
    id: "INV-2041",
    issued: "1 Aug 2026",
    total: "$4,800.00",
    status: "Past due",
    tone: "critical",
  },
  { id: "INV-2018", issued: "1 Jul 2026", total: "$4,800.00", status: "Paid", tone: "success" },
  { id: "INV-1994", issued: "1 Jun 2026", total: "$4,320.00", status: "Paid", tone: "success" },
] as const;

function SuspendDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button emphasis="secondary" tone="critical" children="Suspend" />} />
      <DialogPanel
        size="sm"
        title="Suspend Northwind Ltd?"
        description="Members lose access immediately. Billing continues until the period ends."
        footer={
          <>
            <DialogClose render={<Button emphasis="tertiary" tone="neutral" children="Cancel" />} />
            <DialogClose render={<Button tone="critical" children="Suspend tenant" />} />
          </>
        }
      >
        <Text tone="muted">
          You can restore the workspace at any time. Nothing is deleted by suspending.
        </Text>
      </DialogPanel>
    </Dialog>
  );
}

export function TenantDetail() {
  return (
    <Page width="lg">
      <Inline align="between" alignY="center" space="200">
        <Inline space="200" alignY="center">
          <Avatar name="Northwind Ltd" size="lg" tone="accent" />
          <Stack space="50">
            <Inline space="100" alignY="center">
              <Heading level={1}>Northwind Ltd</Heading>
              <Badge tone="critical">Past due</Badge>
            </Inline>
            <Text tone="muted">Scale plan · 240 seats · customer since March 2024</Text>
          </Stack>
        </Inline>
        <Inline space="100">
          <SuspendDialog />
          <Button>Message owner</Button>
        </Inline>
      </Inline>

      <Divider />

      <Tabs defaultValue="overview">
        <TabList>
          <Tab value="overview">Overview</Tab>
          <Tab value="members">Members</Tab>
          <Tab value="billing">Billing</Tab>
        </TabList>

        <TabPanel value="overview">
          <Columns space="300" collapseBelow="md">
            <Column width="2/3">
              <Stack space="300">
                <Card title="Account">
                  <Columns space="300">
                    <Column>
                      <Stack space="200">
                        <DetailRow label="Plan">Scale (annual)</DetailRow>
                        <DetailRow label="Seats">240 of 250 used</DetailRow>
                        <DetailRow label="Region">us-east</DetailRow>
                      </Stack>
                    </Column>
                    <Column>
                      <Stack space="200">
                        <DetailRow label="MRR">$4,800</DetailRow>
                        <DetailRow label="Renews">1 Sep 2026</DetailRow>
                        <DetailRow label="Owner">marisol@northwind.com</DetailRow>
                      </Stack>
                    </Column>
                  </Columns>
                </Card>

                <Card title="Notes" description="Internal only — tenants never see these.">
                  <Text tone="muted">
                    Migrated from the legacy plan in June. Wants SSO before renewal. Finance contact
                    is on leave until the 28th, so the past-due invoice may need chasing through the
                    owner directly.
                  </Text>
                </Card>
              </Stack>
            </Column>

            <Column>
              <Stack space="300">
                <Card title="Health">
                  <Stack space="200">
                    <Inline align="between" alignY="center">
                      <Text tone="muted">Weekly active</Text>
                      <Badge tone="success">87%</Badge>
                    </Inline>
                    <Inline align="between" alignY="center">
                      <Text tone="muted">Support tickets</Text>
                      <Badge tone="neutral">3 open</Badge>
                    </Inline>
                    <Inline align="between" alignY="center">
                      <Text tone="muted">Last login</Text>
                      <Text size="xs" tone="muted">
                        2 hours ago
                      </Text>
                    </Inline>
                  </Stack>
                </Card>

                <Box background="critical" border="critical" radius="md" padding="300">
                  <Stack space="200">
                    <Heading level={4} tone="critical">
                      Payment failed twice
                    </Heading>
                    <Text size="xs" tone="muted">
                      The card on file expired on 31 July.
                    </Text>
                    <Inline>
                      <Button size="sm" tone="critical" emphasis="secondary">
                        Retry charge
                      </Button>
                    </Inline>
                  </Stack>
                </Box>
              </Stack>
            </Column>
          </Columns>
        </TabPanel>

        <TabPanel value="members">
          <Panel>
            <Box overflow="auto">
              <Table>
                <TableHead>
                  <TableHeaderCell>Member</TableHeaderCell>
                  <TableHeaderCell>Role</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell align="end">Actions</TableHeaderCell>
                </TableHead>
                <TableBody>
                  {MEMBERS.map((member) => (
                    <TableRow key={member.email}>
                      <TableCell>
                        <Inline space="100" alignY="center">
                          <Avatar name={member.name} />
                          <Stack space="0">
                            <Text as="span" weight="medium">
                              {member.name}
                            </Text>
                            <Text as="span" size="xs" tone="muted">
                              {member.email}
                            </Text>
                          </Stack>
                        </Inline>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <Badge tone={member.status === "Active" ? "success" : "warning"}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell align="end">
                        <Button size="sm" emphasis="tertiary" tone="neutral">
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Panel>
        </TabPanel>

        <TabPanel value="billing">
          <Panel>
            <Box overflow="auto">
              <Table>
                <TableHead>
                  <TableHeaderCell>Invoice</TableHeaderCell>
                  <TableHeaderCell>Issued</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell align="end">Total</TableHeaderCell>
                </TableHead>
                <TableBody>
                  {INVOICES.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <Text as="span" weight="medium">
                          {invoice.id}
                        </Text>
                      </TableCell>
                      <TableCell>
                        <Text as="span" tone="muted">
                          {invoice.issued}
                        </Text>
                      </TableCell>
                      <TableCell>
                        <Badge tone={invoice.tone}>{invoice.status}</Badge>
                      </TableCell>
                      <TableCell align="end">{invoice.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Panel>
        </TabPanel>
      </Tabs>
    </Page>
  );
}
