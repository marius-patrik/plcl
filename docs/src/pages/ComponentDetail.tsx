import {
  Badge,
  Button,
  Card,
  Code,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@plcl/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "wouter";
import { ComponentPlayground } from "../components/ComponentPlayground";
import type { ComponentDoc, PropDoc } from "../data/types";

export function PropTable({ props }: { props: PropDoc[] }) {
  if (!props.length)
    return (
      <Text size="sm" color="dimmed">
        No props documented
      </Text>
    );

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.875rem",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
            <th
              style={{ textAlign: "left", padding: "0.5rem", fontWeight: 600 }}
            >
              Prop
            </th>
            <th
              style={{ textAlign: "left", padding: "0.5rem", fontWeight: 600 }}
            >
              Type
            </th>
            <th
              style={{ textAlign: "left", padding: "0.5rem", fontWeight: 600 }}
            >
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <td style={{ padding: "0.5rem", fontFamily: "monospace" }}>
                {prop.name}
                {prop.required && (
                  <Badge
                    style={{ marginLeft: "0.5rem" }}
                    variant="glass-highlight"
                  >
                    required
                  </Badge>
                )}
              </td>
              <td style={{ padding: "0.5rem" }}>
                <Code>{prop.type}</Code>
              </td>
              <td style={{ padding: "0.5rem" }}>{prop.description || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ComponentDetail({
  component,
  parentPath,
  parentLabel,
  library,
}: {
  component: ComponentDoc;
  parentPath: string;
  parentLabel: string;
  library: "core" | "ui";
}) {
  return (
    <Container size="lg" style={{ padding: "2rem" }}>
      <Stack gap="xl">
        <div>
          <Link href={parentPath}>
            <Button variant="text" size="sm" mb="md">
              <IconArrowLeft size={16} style={{ marginRight: "0.5rem" }} />
              Back to {parentLabel}
            </Button>
          </Link>
          <Group gap="md" align="center">
            <Title order={1}>{component.name}</Title>
            <Badge variant="outline">{component.category}</Badge>
          </Group>
          <Text size="lg" mt="sm">
            {component.description}
          </Text>
        </div>

        <Divider />

        {/* Interactive Component Playground */}
        <ComponentPlayground component={component} library={library} />

        {component.examples && component.examples.length > 0 && (
          <Card>
            <Stack gap="md">
              <Title order={2}>Examples</Title>
              {component.examples.map((example, i) => (
                <Card
                  key={i}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.85rem",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {example.title && (
                    <Text
                      size="sm"
                      weight="bold"
                      style={{ marginBottom: "0.5rem" }}
                    >
                      {example.title}
                    </Text>
                  )}
                  <Text>{example.code}</Text>
                </Card>
              ))}
            </Stack>
          </Card>
        )}

        <Card>
          <Stack gap="md">
            <Title order={2}>Props</Title>
            <PropTable props={component.props || []} />
          </Stack>
        </Card>

        {component.sourceFile && (
          <Card>
            <Text size="sm" color="dimmed">
              Source: <Code>{component.sourceFile}</Code>
            </Text>
          </Card>
        )}
      </Stack>
    </Container>
  );
}
