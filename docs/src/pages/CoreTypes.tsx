import {
  Badge,
  Card,
  Code,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@plcl/core";
import { coreTypes } from "../data";
import type { PropDoc, TypeDoc } from "../data/types";

function PropertyTable({ properties }: { properties: PropDoc[] }) {
  if (!properties.length)
    return (
      <Text size="sm" color="dimmed">
        No properties
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
              Property
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
          {properties.map((prop) => (
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

function TypeCard({ typeDoc }: { typeDoc: TypeDoc }) {
  return (
    <Card id={typeDoc.name.toLowerCase()}>
      <Stack gap="md">
        <Group gap="md">
          <Title order={3}>{typeDoc.name}</Title>
          <Badge variant="outline">{typeDoc.kind}</Badge>
        </Group>

        <Text>{typeDoc.description}</Text>

        {typeDoc.properties.length > 0 && (
          <>
            <Title order={5}>Properties</Title>
            <PropertyTable properties={typeDoc.properties} />
          </>
        )}

        {typeDoc.sourceFile && (
          <Text size="xs" color="dimmed">
            Source: <Code>{typeDoc.sourceFile}</Code>
          </Text>
        )}
      </Stack>
    </Card>
  );
}

export default function CoreTypes() {
  // Group by kind
  const interfaces = coreTypes.filter((t) => t.kind === "interface");
  const types = coreTypes.filter((t) => t.kind === "type");

  return (
    <Container size="lg" style={{ padding: "2rem" }}>
      <Stack gap="xl">
        <div>
          <Title order={1}>Core Types</Title>
          <Text size="lg">
            TypeScript type definitions from @plcl/core-types for styling,
            components, and layouts. Documentation is automatically extracted
            from JSDoc comments.
          </Text>
        </div>

        <Divider />

        {/* Quick Navigation */}
        {coreTypes.length > 0 && (
          <Card>
            <Title order={4}>Quick Navigation</Title>
            <Group gap="sm" style={{ flexWrap: "wrap", marginTop: "0.5rem" }}>
              {coreTypes.map((t) => (
                <Badge
                  key={t.name}
                  variant="outline"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    document
                      .getElementById(t.name.toLowerCase())
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {t.name}
                </Badge>
              ))}
            </Group>
          </Card>
        )}

        {interfaces.length > 0 && (
          <Stack gap="lg">
            <Title order={2}>Interfaces</Title>
            {interfaces.map((typeDoc) => (
              <TypeCard key={typeDoc.name} typeDoc={typeDoc} />
            ))}
          </Stack>
        )}

        {types.length > 0 && (
          <Stack gap="lg">
            <Title order={2}>Type Aliases</Title>
            {types.map((typeDoc) => (
              <TypeCard key={typeDoc.name} typeDoc={typeDoc} />
            ))}
          </Stack>
        )}

        {coreTypes.length === 0 && (
          <Card>
            <Text>
              No types found. Run `npm run extract-docs` to generate
              documentation.
            </Text>
          </Card>
        )}
      </Stack>
    </Container>
  );
}
