import * as CoreComponents from "@plcl/core";
import {
  Button,
  Card,
  Code,
  Group,
  Input,
  Select,
  Stack,
  Switch,
  Text,
  Title,
} from "@plcl/core";
import * as UIComponents from "@plcl/ui";
import type * as React from "react";
import { useMemo, useState } from "react";
import type { ComponentDoc, PropDoc } from "../data/types";

interface PropControlProps {
  prop: PropDoc;
  value: unknown;
  onChange: (value: unknown) => void;
}

function PropControl({ prop, value, onChange }: PropControlProps) {
  const parseType = (type: string): { kind: string; options?: string[] } => {
    // Check for union types like 'string | number' or 'glass | outline | text'
    if (type.includes("|")) {
      const options = type.split("|").map((s) => s.trim().replace(/['"]/g, ""));
      return { kind: "union", options };
    }

    // Check for literal types like 'glass' | 'outline'
    if (type.match(/^['"].*['"]$/)) {
      return { kind: "literal", options: [type.replace(/['"]/g, "")] };
    }

    // Check for array types
    if (type.includes("[]") || type.startsWith("Array<")) {
      return { kind: "array" };
    }

    // Check for object types
    if (
      type.startsWith("{") ||
      type.includes("Record<") ||
      type.includes("ReactNode")
    ) {
      return { kind: "object" };
    }

    // Check for function types
    if (
      type.includes("=>") ||
      type.includes("Function") ||
      type.includes("() =>")
    ) {
      return { kind: "function" };
    }

    // Primitive types
    if (type.includes("boolean")) return { kind: "boolean" };
    if (type.includes("number")) return { kind: "number" };
    if (type.includes("string")) return { kind: "string" };

    return { kind: "string" };
  };

  const typeInfo = parseType(prop.type);
  const defaultValue = prop.default || (prop.required ? "" : undefined);

  // Handle union types with string literals
  if (
    typeInfo.kind === "union" &&
    typeInfo.options &&
    typeInfo.options.length > 0
  ) {
    const allString = typeInfo.options.every((opt) => !opt.match(/^\d+$/));
    if (allString) {
      return (
        <Select
          data={typeInfo.options.map((opt) => ({ value: opt, label: opt }))}
          value={(value as string) || defaultValue || typeInfo.options[0]}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: "100%" }}
        />
      );
    }
  }

  // Handle boolean
  if (typeInfo.kind === "boolean") {
    return (
      <Switch
        checked={
          (value as boolean) ??
          (defaultValue === "true" || defaultValue === true)
        }
        onChange={(checked) => onChange(checked)}
      />
    );
  }

  // Handle number
  if (typeInfo.kind === "number") {
    return (
      <Input
        type="number"
        value={(value as number) ?? defaultValue ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : undefined)
        }
        style={{ width: "100%" }}
      />
    );
  }

  // Handle string or default
  return (
    <Input
      type="text"
      value={(value as string) ?? defaultValue ?? ""}
      onChange={(e) => onChange(e.target.value || undefined)}
      placeholder={prop.description || `Enter ${prop.name}`}
      style={{ width: "100%" }}
    />
  );
}

interface ComponentPlaygroundProps {
  component: ComponentDoc;
  library: "core" | "ui";
}

export function ComponentPlayground({
  component,
  library,
}: ComponentPlaygroundProps) {
  const [props, setProps] = useState<Record<string, unknown>>({});

  // Get the actual component from the library
  const Component = useMemo(() => {
    const components = library === "core" ? CoreComponents : UIComponents;
    return (components as Record<string, unknown>)[component.name] as
      | React.ComponentType<any>
      | undefined;
  }, [component.name, library]);

  // Initialize props with defaults
  const initialProps = useMemo(() => {
    const initial: Record<string, unknown> = {};
    for (const prop of component.props || []) {
      if (prop.default) {
        // Try to parse default value
        if (prop.default === "true") initial[prop.name] = true;
        else if (prop.default === "false") initial[prop.name] = false;
        else if (!isNaN(Number(prop.default)))
          initial[prop.name] = Number(prop.default);
        else initial[prop.name] = prop.default;
      } else if (prop.required) {
        // Set required props to sensible defaults
        if (prop.type.includes("boolean")) initial[prop.name] = false;
        else if (prop.type.includes("number")) initial[prop.name] = 0;
        else if (prop.type.includes("string")) initial[prop.name] = "";
      }
    }
    return initial;
  }, [component.props]);

  const currentProps = { ...initialProps, ...props };

  // Filter out props that shouldn't be shown (like children, className, etc.)
  const editableProps = (component.props || []).filter(
    (prop) =>
      !["children", "className", "style", "key", "ref"].includes(prop.name) &&
      !prop.type.includes("ReactNode") &&
      !prop.type.includes("React.ReactNode") &&
      !prop.type.includes("() => void") &&
      !prop.type.includes("Function"),
  );

  const updateProp = (name: string, value: unknown) => {
    setProps((prev) => ({ ...prev, [name]: value }));
  };

  if (!Component) {
    return (
      <Card>
        <Text color="dimmed">
          Component "{component.name}" not found in {library} library. It may
          not be exported or the name may differ.
        </Text>
      </Card>
    );
  }

  return (
    <Card>
      <Stack gap="lg">
        <Title order={2}>Interactive Demo</Title>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
          }}
        >
          {/* Props Controls */}
          <Stack gap="md">
            <Title order={4}>Props</Title>
            {editableProps.length > 0 ? (
              <Stack gap="sm">
                {editableProps.map((prop) => (
                  <div key={prop.name}>
                    <Group gap="sm" align="center" mb="xs">
                      <Text
                        size="sm"
                        weight="bold"
                        style={{ fontFamily: "monospace" }}
                      >
                        {prop.name}
                      </Text>
                      {prop.required && (
                        <Text size="xs" color="dimmed">
                          required
                        </Text>
                      )}
                    </Group>
                    <PropControl
                      prop={prop}
                      value={currentProps[prop.name]}
                      onChange={(value) => updateProp(prop.name, value)}
                    />
                    {prop.description && (
                      <Text size="xs" color="dimmed" mt="xs">
                        {prop.description}
                      </Text>
                    )}
                  </div>
                ))}
              </Stack>
            ) : (
              <Text size="sm" color="dimmed">
                No editable props available
              </Text>
            )}
          </Stack>

          {/* Component Preview */}
          <Stack gap="md">
            <Title order={4}>Preview</Title>
            <Card
              style={{
                minHeight: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
              }}
            >
              <Component {...currentProps}>
                {component.name === "Button" && "Click me"}
                {component.name === "Card" && "Card content"}
                {component.name === "Text" && "Sample text"}
                {component.name === "Title" && "Sample Title"}
                {component.name === "Badge" && "Badge"}
                {component.name === "Alert" && "Alert message"}
                {component.name === "Loading" && null}
                {component.name === "Progress" && null}
                {component.name === "Divider" && null}
              </Component>
            </Card>
          </Stack>
        </div>

        {/* Code Preview */}
        <Card style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>
          <Text weight="bold" mb="sm">
            Code:
          </Text>
          <Code>
            {`<${component.name}`}
            {Object.entries(currentProps)
              .filter(
                ([_, val]) => val !== undefined && val !== null && val !== "",
              )
              .map(([key, val]) => {
                if (typeof val === "string") {
                  return `\n  ${key}="${val}"`;
                }
                if (typeof val === "boolean") {
                  return val ? `\n  ${key}` : "";
                }
                return `\n  ${key}={${JSON.stringify(val)}}`;
              })
              .join("")}
            {`\n>`}
            {currentProps.children !== undefined ? "\n  {children}" : ""}
            {`\n</${component.name}>`}
          </Code>
        </Card>
      </Stack>
    </Card>
  );
}
