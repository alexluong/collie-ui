import {
  Badge,
  Box,
  Column,
  Columns,
  Divider,
  Heading,
  Inline,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Tiles,
} from "@collie/ui";
import type { ReactNode } from "react";
import { Card, Page, PageHeader } from "../poc/parts.js";
import {
  areas,
  gaps,
  goals,
  layers,
  lessons,
  openQuestions,
  type Decision,
  type Status,
} from "./content.js";

const statusTone = {
  decided: "success",
  leaning: "accent",
  planned: "neutral",
  open: "warning",
} as const satisfies Record<Status, string>;

function StatusBadge({ status }: { status: Status }) {
  return <Badge tone={statusTone[status]}>{status}</Badge>;
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Stack space="200">
      <Stack space="50">
        <Heading level={2}>{title}</Heading>
        <Text tone="muted">{description}</Text>
      </Stack>
      {children}
    </Stack>
  );
}

function Line({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Columns space="150" collapseBelow="sm">
      <Column width="content">
        <Box paddingX="100" paddingY="50" background="neutral" radius="sm">
          <Text size="xs" weight="medium" tone="muted">
            {label}
          </Text>
        </Box>
      </Column>
      <Column>
        <Text>{children}</Text>
      </Column>
    </Columns>
  );
}

function DecisionCard({ decision }: { decision: Decision }) {
  return (
    <Box background="surface" border="subtle" radius="md" padding="300" shadow="raised">
      <Stack space="200">
        <Inline align="between" alignY="center" space="100">
          <Heading level={4}>{decision.title}</Heading>
          <StatusBadge status={decision.status} />
        </Inline>
        <Stack space="100">
          <Line label="Chose">{decision.chose}</Line>
          {decision.over ? <Line label="Over">{decision.over}</Line> : null}
          <Line label="Why">{decision.why}</Line>
          {decision.cost ? <Line label="Cost">{decision.cost}</Line> : null}
        </Stack>
      </Stack>
    </Box>
  );
}

function Layers() {
  return (
    <Columns space="100" collapseBelow="md">
      {layers.map((layer, i) => (
        <Column key={layer.name}>
          <Box
            background={i === layers.length - 1 ? "accent" : "surface"}
            border="subtle"
            radius="md"
            padding="200"
          >
            <Stack space="100">
              <Text weight="strong">{layer.name}</Text>
              <Stack space="50">
                <Text size="xs" tone="muted">
                  owns
                </Text>
                <Text>{layer.owns}</Text>
              </Stack>
              <Stack space="50">
                <Text size="xs" tone="muted">
                  never
                </Text>
                <Text tone="critical">{layer.never}</Text>
              </Stack>
            </Stack>
          </Box>
        </Column>
      ))}
    </Columns>
  );
}

function Legend() {
  return (
    <Inline space="150">
      {(Object.keys(statusTone) as Status[]).map((status) => (
        <StatusBadge key={status} status={status} />
      ))}
    </Inline>
  );
}

function count(status: Status) {
  return areas.flatMap((a) => a.decisions).filter((d) => d.status === status).length;
}

export function Decisions() {
  return (
    <Page width="lg">
      <PageHeader
        title="Why Collie UI is built this way"
        description="The decisions behind the system, what we chose them over, and what is still open. This page is itself built from Collie UI components, with no CSS of its own."
        actions={<Badge tone="warning">Experiment: nothing here is stable API</Badge>}
      />

      <Tiles columns="3" space="200">
        {goals.map((goal) => (
          <Card key={goal.title} title={goal.title}>
            <Text>{goal.body}</Text>
          </Card>
        ))}
      </Tiles>

      <Divider />

      <Section
        title="Four layers, one direction"
        description="Each layer owns one thing and is forbidden one thing. Dependencies point left; nothing points back."
      >
        <Layers />
      </Section>

      <Divider />

      <Section
        title="Decisions"
        description={`${count("decided")} decided, ${count("leaning")} leaning, ${count("planned")} planned. Switch the theme in the toolbar: this page should survive all of them.`}
      >
        <Legend />
        <Tabs defaultValue={areas[0]!.name}>
          <TabList>
            {areas.map((area) => (
              <Tab key={area.name} value={area.name}>
                {area.name}
              </Tab>
            ))}
          </TabList>
          {areas.map((area) => (
            <TabPanel key={area.name} value={area.name}>
              <Stack space="200">
                <Text tone="muted">{area.summary}</Text>
                <Tiles columns="2" space="200">
                  {area.decisions.map((decision) => (
                    <DecisionCard key={decision.title} decision={decision} />
                  ))}
                </Tiles>
              </Stack>
            </TabPanel>
          ))}
        </Tabs>
      </Section>

      <Divider />

      <Section
        title="What building it taught us"
        description="Each of these was a real bug found by building screens, and each left a rule behind."
      >
        <Box background="surface" border="subtle" radius="md" overflow="hidden">
          <Table>
            <TableHead>
              <TableHeaderCell>Found</TableHeaderCell>
              <TableHeaderCell>Rule it left</TableHeaderCell>
            </TableHead>
            <TableBody>
              {lessons.map((lesson) => (
                <TableRow key={lesson.rule}>
                  <TableCell>
                    <Text tone="muted">{lesson.found}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="medium">{lesson.rule}</Text>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Section>

      <Divider />

      <Section title="Open questions" description="Undecided on purpose. Opinions welcome.">
        <Tiles columns="2" space="200">
          {openQuestions.map((q) => (
            <Box key={q.question} background="warning" radius="md" padding="200">
              <Stack space="50">
                <Text weight="strong">{q.question}</Text>
                <Text>{q.detail}</Text>
              </Stack>
            </Box>
          ))}
        </Tiles>
      </Section>

      <Section title="Not built yet" description="Gaps the POC screens ran into.">
        <Inline space="100">
          {gaps.map((gap) => (
            <Badge key={gap}>{gap}</Badge>
          ))}
        </Inline>
      </Section>

      <Text size="xs" tone="muted">
        Where the ideas came from: Guides → Inspirations.
      </Text>
    </Page>
  );
}
