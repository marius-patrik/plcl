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
import { useEffect, useState } from "react";
import { Link } from "wouter";

interface LibraryAboutProps {
  library: "core" | "ui";
}

export default function LibraryAbout({ library }: LibraryAboutProps) {
  const [readme, setReadme] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReadme = async () => {
      try {
        const readmePath =
          library === "core" ? "/@plcl-core/README.md" : "/@plcl-ui/README.md";

        // Try to fetch the README
        const response = await fetch(
          `../../${library === "core" ? "@plcl-core" : "@plcl-ui"}/README.md`,
        );
        if (response.ok) {
          const text = await response.text();
          setReadme(text);
        } else {
          // Fallback: use hardcoded content
          setReadme(getDefaultReadme(library));
        }
      } catch (error) {
        // Fallback: use hardcoded content
        setReadme(getDefaultReadme(library));
      } finally {
        setLoading(false);
      }
    };

    loadReadme();
  }, [library]);

  const renderMarkdown = (content: string) => {
    // Simple markdown parser for basic formatting
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let currentCodeBlock = "";
    let inCodeBlock = false;
    let codeLanguage = "";

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          // End code block
          elements.push(
            <Card
              key={`code-${index}`}
              style={{
                fontFamily: "monospace",
                fontSize: "0.85rem",
                whiteSpace: "pre-wrap",
                padding: "1rem",
              }}
            >
              <Text>{currentCodeBlock}</Text>
            </Card>,
          );
          currentCodeBlock = "";
          inCodeBlock = false;
          codeLanguage = "";
        } else {
          // Start code block
          codeLanguage = line.substring(3).trim();
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        currentCodeBlock += line + "\n";
        return;
      }

      // Headers
      if (line.startsWith("# ")) {
        elements.push(
          <Title key={index} order={1}>
            {line.substring(2)}
          </Title>,
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <Title key={index} order={2}>
            {line.substring(3)}
          </Title>,
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <Title key={index} order={3}>
            {line.substring(4)}
          </Title>,
        );
      } else if (line.startsWith("#### ")) {
        elements.push(
          <Title key={index} order={4}>
            {line.substring(5)}
          </Title>,
        );
      } else if (line.startsWith("##### ")) {
        elements.push(
          <Title key={index} order={5}>
            {line.substring(6)}
          </Title>,
        );
      } else if (line.startsWith("###### ")) {
        elements.push(
          <Title key={index} order={6}>
            {line.substring(7)}
          </Title>,
        );
      }
      // Horizontal rule
      else if (line.trim() === "---" || line.trim() === "***") {
        elements.push(<Divider key={index} />);
      }
      // Lists
      else if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const text = line.trim().substring(2);
        elements.push(
          <Text key={index} component="li" style={{ marginLeft: "1.5rem" }}>
            {text}
          </Text>,
        );
      }
      // Empty line
      else if (line.trim() === "") {
        elements.push(<div key={index} style={{ height: "0.5rem" }} />);
      }
      // Regular text
      else if (line.trim()) {
        // Handle inline code
        const parts = line.split(/(`[^`]+`)/g);
        if (parts.length > 1) {
          elements.push(
            <Text key={index}>
              {parts.map((part, i) =>
                part.startsWith("`") && part.endsWith("`") ? (
                  <Code key={i}>{part.slice(1, -1)}</Code>
                ) : (
                  part
                ),
              )}
            </Text>,
          );
        } else {
          elements.push(<Text key={index}>{line}</Text>);
        }
      }
    });

    return elements;
  };

  const libraryName = library === "core" ? "@plcl/core" : "@plcl/ui";
  const parentPath = library === "core" ? "/core-components" : "/ui-components";
  const parentLabel = library === "core" ? "Core Components" : "UI Components";

  if (loading) {
    return (
      <Container size="lg" style={{ padding: "2rem" }}>
        <Text>Loading...</Text>
      </Container>
    );
  }

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
            <Title order={1}>About {libraryName}</Title>
            <Badge variant="outline">Library</Badge>
          </Group>
        </div>

        <Divider />

        <Card>
          <Stack gap="md">{renderMarkdown(readme)}</Stack>
        </Card>
      </Stack>
    </Container>
  );
}

function getDefaultReadme(library: "core" | "ui"): string {
  if (library === "core") {
    return `# 🪟 PLC Core

A React component library inspired by Apple's Liquid Glass design language.

## 🎯 Overview

**PLC Core** is a comprehensive React component library inspired by Apple's Liquid Glass design language. It provides a complete set of UI components with glassmorphism styling, built with modern web technologies and optimized for performance.

### ✨ Key Features

- 🪟 **Liquid Glass** - Frosted glass effects with blur and transparency
- ⚡ **Lightweight** - Tree-shakeable ESM and CJS bundles
- 🎨 **Customizable** - Built with Tailwind CSS v4 for easy theming
- 📦 **TypeScript** - Full type definitions included
- 🌙 **Dark Mode** - Built-in dark mode support
- ♿ **Accessible** - WCAG compliant components
- 📱 **Responsive** - Mobile-first design approach

## 📦 Installation

\`\`\`bash
npm install @plcl/core
\`\`\`

## 🚀 Quick Start

\`\`\`tsx
import { Button, Card, ThemeProvider } from '@plcl/core';
import '@plcl/core/styles.css';

function App() {
  return (
    <ThemeProvider>
      <Card variant="glass">
        <Button variant="glass">Click me</Button>
      </Card>
    </ThemeProvider>
  );
}
\`\`\`
`;
  } else {
    return `# PLC UI

A React library specialized for building desktop-like interfaces on the web, using the PLC design system.

## Features

- 🖥️ **Desktop Metaphor** - Window management and desktop environments
- 📦 **Rslib** - Optimized library packaging (ESM/CJS)
- 🎨 **Tailwind v4** - Styled with the latest Tailwind CSS
- 🔗 **PLC Integration** - Built on top of @plcl/core

## Installation

\`\`\`bash
npm install @plcl/ui
\`\`\`

## Dependencies

This library depends on \`@plcl/core\` for base components.

## Usage

\`\`\`tsx
import { Shell } from '@plcl/ui';
import '@plcl/core/styles.css';

function App() {
  return (
    <Shell variant="desktop">
      {/* Your desktop content */}
    </Shell>
  );
}
\`\`\`
`;
  }
}
