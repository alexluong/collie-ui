import {
  Badge,
  Box,
  Button,
  CheckboxField,
  Column,
  Columns,
  Container,
  Divider,
  Heading,
  Inline,
  SelectField,
  Stack,
  Text,
  TextAreaField,
  TextField,
} from "@collie/ui";
import type { ReactNode } from "react";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Box
      as="section"
      background="surface"
      border="subtle"
      radius="md"
      padding="300"
      shadow="raised"
    >
      <Stack space="300">
        <Stack space="50">
          <Heading level={3}>{title}</Heading>
          {description ? (
            <Text size="xs" tone="muted">
              {description}
            </Text>
          ) : null}
        </Stack>
        {children}
      </Stack>
    </Box>
  );
}

export function SettingsPage() {
  return (
    <Box background="canvas" padding="400">
      <Container width="lg">
        <Stack space="400">
          <Stack space="100">
            <Inline align="between" alignY="center">
              <Heading level={1}>Settings</Heading>
              <Badge tone="success">Saved</Badge>
            </Inline>
            <Text tone="muted">Manage how this workspace behaves for everyone on the team.</Text>
          </Stack>

          <Divider />

          <Section title="Profile" description="Shown to teammates on shared records.">
            <Stack space="200">
              <Columns space="200" collapseBelow="sm">
                <Column>
                  <TextField label="First name" defaultValue="Jane" />
                </Column>
                <Column>
                  <TextField label="Last name" defaultValue="Doe" />
                </Column>
              </Columns>
              <TextField
                label="Email"
                type="email"
                defaultValue="jane@example.com"
                description="Used for sign-in and notifications."
              />
              <TextAreaField label="Bio" placeholder="A sentence or two." />
            </Stack>
          </Section>

          <Section title="Regional" description="Affects how dates and money are displayed.">
            <Columns space="200" collapseBelow="sm">
              <Column>
                <SelectField
                  label="Time zone"
                  defaultValue="America/Detroit"
                  options={[
                    { value: "America/Detroit", label: "Detroit (ET)" },
                    { value: "Asia/Ho_Chi_Minh", label: "Ho Chi Minh City (ICT)" },
                    { value: "UTC", label: "UTC" },
                  ]}
                />
              </Column>
              <Column>
                <SelectField
                  label="Currency"
                  defaultValue="USD"
                  options={[
                    { value: "USD", label: "US Dollar" },
                    { value: "VND", label: "Vietnamese Dong" },
                  ]}
                />
              </Column>
            </Columns>
          </Section>

          <Section title="Notifications">
            <Stack space="200">
              <CheckboxField
                label="Order updates"
                description="When an order changes status."
                defaultChecked
              />
              <CheckboxField label="Weekly summary" description="Every Monday morning." />
              <CheckboxField label="Product announcements" />
            </Stack>
          </Section>

          <Box as="section" background="critical" border="critical" radius="md" padding="300">
            <Stack space="200">
              <Stack space="50">
                <Heading level={3} tone="critical">
                  Delete workspace
                </Heading>
                <Text size="xs" tone="muted">
                  Removes every order and cannot be undone.
                </Text>
              </Stack>
              <Inline>
                <Button tone="critical" emphasis="secondary">
                  Delete workspace
                </Button>
              </Inline>
            </Stack>
          </Box>

          <Divider />

          <Inline align="end" space="100">
            <Button tone="neutral" emphasis="tertiary">
              Cancel
            </Button>
            <Button>Save changes</Button>
          </Inline>
        </Stack>
      </Container>
    </Box>
  );
}
