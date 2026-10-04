import {
  formatCurrency,
  formatDateTime,
  formatRelative,
  resolveTimeRange,
  type TimeRange,
} from "@collie/format";
import {
  Badge,
  Box,
  Button,
  Column,
  Columns,
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
  TimeRangePicker,
} from "@collie/ui";
import { useState } from "react";
import { Page, PageHeader, Panel } from "./parts.js";

// Fixed so the screen renders identically every time — a real app passes the
// clock in the same way, which is what makes the range resolvable in tests.
const NOW = "2026-08-23T13:05:00.000Z";

type Status = "paid" | "pending" | "refunded" | "failed";

const STATUS: Record<
  Status,
  { label: string; tone: "success" | "warning" | "neutral" | "critical" }
> = {
  paid: { label: "Paid", tone: "success" },
  pending: { label: "Pending", tone: "warning" },
  refunded: { label: "Refunded", tone: "neutral" },
  failed: { label: "Failed", tone: "critical" },
};

// Instants and minor units. Never a Date, never a float.
const ORDERS = [
  {
    id: "ORD-1042",
    customer: "Marisol Vega",
    placed: "2026-08-23T12:53:00Z",
    status: "paid",
    total: 24800,
  },
  {
    id: "ORD-1041",
    customer: "Tobias Fell",
    placed: "2026-08-23T11:02:00Z",
    status: "pending",
    total: 112050,
  },
  {
    id: "ORD-1040",
    customer: "Nguyen Ha",
    placed: "2026-08-23T08:45:00Z",
    status: "failed",
    total: 7620,
  },
  {
    id: "ORD-1039",
    customer: "Priya Raman",
    placed: "2026-08-22T20:30:00Z",
    status: "refunded",
    total: 31000,
  },
  {
    id: "ORD-1038",
    customer: "Dan Okafor",
    placed: "2026-08-22T15:11:00Z",
    status: "paid",
    total: 9275,
  },
  {
    id: "ORD-1037",
    customer: "Rae Whitlock",
    placed: "2026-08-19T09:40:00Z",
    status: "paid",
    total: 54000,
  },
  {
    id: "ORD-1036",
    customer: "Otto Brand",
    placed: "2026-08-14T14:05:00Z",
    status: "refunded",
    total: 18900,
  },
] satisfies { id: string; customer: string; placed: string; status: Status; total: number }[];

export function OrderList({ empty = false }: { empty?: boolean }) {
  const [range, setRange] = useState<TimeRange>({ kind: "relative", amount: 1, unit: "day" });
  const [timeZone, setTimeZone] = useState("Asia/Ho_Chi_Minh");

  const window = resolveTimeRange(range, NOW);
  const orders = empty
    ? []
    : ORDERS.filter((order) => order.placed >= window.start && order.placed <= window.end);

  return (
    <Page>
      <PageHeader
        title="Orders"
        description={`${orders.length} orders in the selected range`}
        actions={
          <>
            <Button emphasis="secondary" tone="neutral">
              Export
            </Button>
            <Button>New order</Button>
          </>
        }
      />

      <Panel>
        <Box padding="200">
          <Columns space="200" collapseBelow="md" alignY="center">
            <Column width="1/2">
              <TextField label="Search orders" hideLabel placeholder="Search orders" />
            </Column>
            <Column>
              <SelectField
                label="Status"
                hideLabel
                defaultValue="all"
                options={[
                  { value: "all", label: "All statuses" },
                  { value: "paid", label: "Paid" },
                  { value: "pending", label: "Pending" },
                  { value: "failed", label: "Failed" },
                ]}
              />
            </Column>
            <Column width="content">
              <TimeRangePicker
                value={range}
                onChange={setRange}
                timeZone={timeZone}
                onTimeZoneChange={setTimeZone}
                now={NOW}
              />
            </Column>
          </Columns>
        </Box>

        <Divider />

        <Box paddingX="200" paddingY="150">
          <Text size="xs" tone="muted">
            {formatDateTime(window.start, { timeZone, style: "long" })} —{" "}
            {formatDateTime(window.end, { timeZone, style: "long" })}
          </Text>
        </Box>

        <Divider />

        {orders.length === 0 ? (
          <Box padding="600">
            <Stack space="200" align="center">
              <Heading level={3}>No orders in this range</Heading>
              <Text tone="muted" align="center">
                Widen the time range, or clear the filters, to see more.
              </Text>
              <Button
                emphasis="secondary"
                tone="neutral"
                onClick={() => setRange({ kind: "relative", amount: 30, unit: "day" })}
              >
                Search the last 30 days
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box overflow="auto">
            <Table>
              <TableHead>
                <TableHeaderCell>Order</TableHeaderCell>
                <TableHeaderCell>Customer</TableHeaderCell>
                <TableHeaderCell>Placed</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell align="end">Total</TableHeaderCell>
                <TableHeaderCell align="end">Actions</TableHeaderCell>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Text as="span" weight="medium">
                        {order.id}
                      </Text>
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <Stack space="0">
                        <Text as="span">{formatDateTime(order.placed, { timeZone })}</Text>
                        <Text as="span" size="xs" tone="muted">
                          {formatRelative(order.placed, NOW)}
                        </Text>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Badge tone={STATUS[order.status].tone}>{STATUS[order.status].label}</Badge>
                    </TableCell>
                    <TableCell align="end">{formatCurrency(order.total, "USD")}</TableCell>
                    <TableCell align="end">
                      <Inline space="50" align="end">
                        <Button size="sm" emphasis="tertiary" tone="neutral">
                          View
                        </Button>
                        <Button size="sm" emphasis="tertiary" tone="critical">
                          Refund
                        </Button>
                      </Inline>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Panel>
    </Page>
  );
}
