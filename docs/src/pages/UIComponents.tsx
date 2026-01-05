import {
  Badge,
  Card,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@plcl/core";
import { useLocation } from "wouter";
import { groupByCategory, uiComponents } from "../data";
import type { ComponentDoc } from "../data/types";

function ComponentListItem({
  component,
  onClick,
}: {
  component: ComponentDoc;
  onClick: () => void;
}) {
  return (
    <Card style={{ cursor: "pointer" }} onClick={onClick}>
      <Stack gap="sm">
        <Group gap="md" align="center">
          <Title order={4}>{component.name}</Title>
          <Badge variant="outline">{component.category}</Badge>
        </Group>
        <Text size="sm" color="dimmed">
          {component.description}
        </Text>
      </Stack>
    </Card>
  );
}

export default function UIComponents() {
  const [location, setLocation] = useLocation();
  const grouped = groupByCategory(uiComponents);
  const categories = Object.keys(grouped).sort();

  return (
    <Container size="lg" style={{ padding: "2rem" }}>
      <Stack gap="xl">
        <div>
          <Title order={1}>UI Components</Title>
          <Text size="lg">
            Desktop UI components from @plcl/ui including Shell variants and
            window management. Documentation is automatically extracted from
            JSDoc comments.
          </Text>
        </div>

        <Divider />

        {categories.map((category) => (
          <Stack key={category} gap="md">
            <Title order={2}>{category}</Title>
            {grouped[category].map((component) => (
              <ComponentListItem
                key={component.name}
                component={component}
                onClick={() =>
                  setLocation(`/ui-components/${component.name.toLowerCase()}`)
                }
              />
            ))}
          </Stack>
        ))}

        {uiComponents.length === 0 && (
          <Card>
            <Text>
              No UI components found. Run `npm run extract-docs` to generate
              documentation.
            </Text>
          </Card>
        )}
      </Stack>
    </Container>
  );
}
