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
import { coreComponents, groupByCategory } from "../data";
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

export default function CoreComponents() {
  const [location, setLocation] = useLocation();
  const grouped = groupByCategory(coreComponents);
  const categories = Object.keys(grouped).sort();

  return (
    <Container size="lg" style={{ padding: "2rem" }}>
      <Stack gap="xl">
        <div>
          <Title order={1}>Core Components</Title>
          <Text size="lg">
            All components from @plcl/core with their props and usage examples.
            Documentation is automatically extracted from JSDoc comments.
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
                  setLocation(
                    `/core-components/${component.name.toLowerCase()}`,
                  )
                }
              />
            ))}
          </Stack>
        ))}

        {coreComponents.length === 0 && (
          <Card>
            <Text>
              No components found. Run `npm run extract-docs` to generate
              documentation.
            </Text>
          </Card>
        )}
      </Stack>
    </Container>
  );
}
