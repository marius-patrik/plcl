import {
  Badge,
  Box,
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

/**
 * Styling documentation - documents the StylingProps system
 * This data comes from @plcl/core-types/styles.ts
 */

const sizingScale = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"];
const spacingScale = ["none", ...sizingScale];
const radiusScale = ["none", ...sizingScale, "full"];
const shadowScale = ["none", ...sizingScale];
const variants = [
  "glass",
  "glass-highlight",
  "flat",
  "outline",
  "transparent",
  "unstyled",
];

const marginProps = [
  { name: "m", description: "Margin on all sides" },
  { name: "mt", description: "Margin top" },
  { name: "mb", description: "Margin bottom" },
  { name: "ml", description: "Margin left" },
  { name: "mr", description: "Margin right" },
  { name: "mx", description: "Margin horizontal (left + right)" },
  { name: "my", description: "Margin vertical (top + bottom)" },
];

const paddingProps = [
  { name: "p", description: "Padding on all sides" },
  { name: "pt", description: "Padding top" },
  { name: "pb", description: "Padding bottom" },
  { name: "pl", description: "Padding left" },
  { name: "pr", description: "Padding right" },
  { name: "px", description: "Padding horizontal (left + right)" },
  { name: "py", description: "Padding vertical (top + bottom)" },
];

function ScaleDemo({ scale, label }: { scale: string[]; label: string }) {
  return (
    <Group gap="sm" style={{ flexWrap: "wrap" }}>
      {scale.map((value) => (
        <Badge key={value} variant="outline">
          {value}
        </Badge>
      ))}
    </Group>
  );
}

export default function Styling() {
  return (
    <Container size="lg" style={{ padding: "2rem" }}>
      <Stack gap="xl">
        <div>
          <Title order={1}>Styling System</Title>
          <Text size="lg">
            PLC components use a consistent styling prop system for spacing,
            sizing, and visual variants. All components that accept StylingProps
            can use these properties.
          </Text>
        </div>

        <Divider />

        {/* StylingProps Interface */}
        <Card>
          <Stack gap="md">
            <Title order={2}>StylingProps Interface</Title>
            <Text>
              The StylingProps interface is the foundation of the styling
              system. It's available on all components and provides consistent
              control over margins, padding, border radius, shadows, and visual
              variants.
            </Text>
            <Card
              style={{
                fontFamily: "monospace",
                fontSize: "0.85rem",
                whiteSpace: "pre",
              }}
            >
              {`interface StylingProps {
  variant?: Variant;
  m?: Spacing;    // margin
  mt?: Spacing;   // margin-top
  mb?: Spacing;   // margin-bottom
  ml?: Spacing;   // margin-left
  mr?: Spacing;   // margin-right
  mx?: Spacing;   // margin horizontal
  my?: Spacing;   // margin vertical
  p?: Spacing;    // padding
  pt?: Spacing;   // padding-top
  pb?: Spacing;   // padding-bottom
  pl?: Spacing;   // padding-left
  pr?: Spacing;   // padding-right
  px?: Spacing;   // padding horizontal
  py?: Spacing;   // padding vertical
  radius?: Radius;
  shadow?: Shadow;
  size?: Size;
}`}
            </Card>
          </Stack>
        </Card>

        {/* Size Scale */}
        <Card>
          <Stack gap="md">
            <Title order={2}>Size Scale</Title>
            <Text>
              The size scale is used for the <Code>size</Code> prop and affects
              component sizing.
            </Text>
            <Code>
              type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
            </Code>
            <ScaleDemo scale={sizingScale} label="Size" />

            <Title order={4}>Example</Title>
            <Group gap="md">
              <Button size="xs">XS Button</Button>
              <Button size="sm">SM Button</Button>
              <Button size="md">MD Button</Button>
              <Button size="lg">LG Button</Button>
            </Group>
          </Stack>
        </Card>

        {/* Spacing Scale */}
        <Card>
          <Stack gap="md">
            <Title order={2}>Spacing Scale</Title>
            <Text>The spacing scale is used for margin and padding props.</Text>
            <Code>type Spacing = 'none' | Size</Code>
            <ScaleDemo scale={spacingScale} label="Spacing" />

            <Title order={4}>Margin Props</Title>
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
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>
                      Prop
                    </th>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {marginProps.map((prop) => (
                    <tr
                      key={prop.name}
                      style={{ borderBottom: "1px solid var(--color-border)" }}
                    >
                      <td
                        style={{ padding: "0.5rem", fontFamily: "monospace" }}
                      >
                        {prop.name}
                      </td>
                      <td style={{ padding: "0.5rem" }}>{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Title order={4}>Padding Props</Title>
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
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>
                      Prop
                    </th>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paddingProps.map((prop) => (
                    <tr
                      key={prop.name}
                      style={{ borderBottom: "1px solid var(--color-border)" }}
                    >
                      <td
                        style={{ padding: "0.5rem", fontFamily: "monospace" }}
                      >
                        {prop.name}
                      </td>
                      <td style={{ padding: "0.5rem" }}>{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Title order={4}>Example</Title>
            <Card style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>
              {`<Card p="lg" m="md">
  <Button mt="sm" mb="lg">Spaced Button</Button>
</Card>`}
            </Card>
          </Stack>
        </Card>

        {/* Radius Scale */}
        <Card>
          <Stack gap="md">
            <Title order={2}>Border Radius</Title>
            <Text>The radius scale controls border-radius values.</Text>
            <Code>type Radius = 'none' | Size | 'full'</Code>
            <ScaleDemo scale={radiusScale} label="Radius" />

            <Title order={4}>Example</Title>
            <Group gap="md">
              <Box
                p="md"
                radius="none"
                style={{ background: "var(--color-surface)" }}
              >
                none
              </Box>
              <Box
                p="md"
                radius="sm"
                style={{ background: "var(--color-surface)" }}
              >
                sm
              </Box>
              <Box
                p="md"
                radius="md"
                style={{ background: "var(--color-surface)" }}
              >
                md
              </Box>
              <Box
                p="md"
                radius="lg"
                style={{ background: "var(--color-surface)" }}
              >
                lg
              </Box>
              <Box
                p="md"
                radius="full"
                style={{ background: "var(--color-surface)" }}
              >
                full
              </Box>
            </Group>
          </Stack>
        </Card>

        {/* Shadow Scale */}
        <Card>
          <Stack gap="md">
            <Title order={2}>Shadow Scale</Title>
            <Text>The shadow scale controls box-shadow intensity.</Text>
            <Code>type Shadow = 'none' | Size</Code>
            <ScaleDemo scale={shadowScale} label="Shadow" />
          </Stack>
        </Card>

        {/* Variants */}
        <Card>
          <Stack gap="md">
            <Title order={2}>Visual Variants</Title>
            <Text>
              The variant prop controls the visual style of components.
            </Text>
            <Code>
              type Variant = 'glass' | 'glass-highlight' | 'flat' | 'outline' |
              'transparent' | 'unstyled'
            </Code>

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
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>
                      Variant
                    </th>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>
                      Description
                    </th>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "0.5rem", fontFamily: "monospace" }}>
                      glass
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      Glassmorphism effect with blur and transparency (default)
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      <Button variant="glass">Glass</Button>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "0.5rem", fontFamily: "monospace" }}>
                      glass-highlight
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      Enhanced glass effect for primary actions
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      <Button variant="glass-highlight">Highlight</Button>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "0.5rem", fontFamily: "monospace" }}>
                      outline
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      Border only, no background fill
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      <Button variant="outline">Outline</Button>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "0.5rem", fontFamily: "monospace" }}>
                      text
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      Text only, no background or border
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                      <Button variant="text">Text</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>
        </Card>

        {/* Usage Example */}
        <Card>
          <Stack gap="md">
            <Title order={2}>Complete Example</Title>
            <Text>
              Here's an example showing multiple styling props in action:
            </Text>
            <Card
              style={{
                fontFamily: "monospace",
                fontSize: "0.85rem",
                whiteSpace: "pre",
              }}
            >
              {`import { Card, Button, Stack } from '@plcl/core';

function Example() {
  return (
    <Card 
      variant="glass" 
      p="xl" 
      m="md" 
      radius="lg" 
      shadow="md"
    >
      <Stack gap="md">
        <Button variant="glass-highlight" size="lg">
          Primary Action
        </Button>
        <Button variant="outline" size="md" mt="sm">
          Secondary
        </Button>
      </Stack>
    </Card>
  );
}`}
            </Card>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
