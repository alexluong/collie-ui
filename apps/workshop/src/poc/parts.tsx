import { Box, Container, Heading, Inline, Stack, Text } from "@collie/ui";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <Inline align="between" alignY="center" space="200">
      <Stack space="50">
        <Heading level={1}>{title}</Heading>
        {description ? <Text tone="muted">{description}</Text> : null}
      </Stack>
      {actions ? <Inline space="100">{actions}</Inline> : null}
    </Inline>
  );
}

export function Card({
  title,
  description,
  actions,
  children,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Box background="surface" border="subtle" radius="md" padding="300" shadow="raised">
      <Stack space="300">
        {title ? (
          <Inline align="between" alignY="center" space="200">
            <Stack space="50">
              <Heading level={3}>{title}</Heading>
              {description ? (
                <Text size="xs" tone="muted">
                  {description}
                </Text>
              ) : null}
            </Stack>
            {actions ? <Inline space="100">{actions}</Inline> : null}
          </Inline>
        ) : null}
        {children}
      </Stack>
    </Box>
  );
}

export function Panel({ children }: { children: ReactNode }) {
  return (
    <Box background="surface" border="subtle" radius="md" shadow="raised" overflow="hidden">
      {children}
    </Box>
  );
}

export function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Stack space="50">
      <Text size="xs" tone="muted">
        {label}
      </Text>
      <Text>{children}</Text>
    </Stack>
  );
}

export function Page({ children, width = "xl" }: { children: ReactNode; width?: "lg" | "xl" }) {
  return (
    <Box background="canvas" padding="400">
      <Container width={width}>
        <Stack space="300">{children}</Stack>
      </Container>
    </Box>
  );
}
