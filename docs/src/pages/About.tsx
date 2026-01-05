import { Card, Container, Divider, Stack, Text, Title } from "@plcl/core";
import readme from "../../../README.md?raw";

/**
 * Renders markdown content as simple HTML
 */
function MarkdownContent({ content }: { content: string }) {
  // Simple markdown parsing for headers, code blocks, lists
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let inCodeBlock = false;
  let codeContent: string[] = [];
  let codeLanguage = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <Card
            key={i}
            style={{
              fontFamily: "monospace",
              fontSize: "0.85rem",
              whiteSpace: "pre",
              overflow: "auto",
            }}
          >
            {codeContent.join("\n")}
          </Card>,
        );
        codeContent = [];
        inCodeBlock = false;
      } else {
        codeLanguage = line.slice(3);
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }

    // Headers
    if (line.startsWith("# ")) {
      elements.push(
        <Title key={i} order={1}>
          {line
            .slice(2)
            .replace(/[🪟📦🚀📖🏗️🛠️📝🔗📄❤️🎯]/gu, "")
            .trim()}
        </Title>,
      );
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <Title key={i} order={2} style={{ marginTop: "1.5rem" }}>
          {line
            .slice(3)
            .replace(/[🪟📦🚀📖🏗️🛠️📝🔗📄❤️🎯]/gu, "")
            .trim()}
        </Title>,
      );
      continue;
    }
    if (line.startsWith("### ")) {
      elements.push(
        <Title key={i} order={3} style={{ marginTop: "1rem" }}>
          {line
            .slice(4)
            .replace(/[🪟📦🚀📖🏗️🛠️📝🔗📄❤️🎯]/gu, "")
            .trim()}
        </Title>,
      );
      continue;
    }

    // Horizontal rule
    if (line.startsWith("---")) {
      elements.push(<Divider key={i} style={{ margin: "1.5rem 0" }} />);
      continue;
    }

    // Lists
    if (line.startsWith("- ")) {
      const listItem = line.slice(2).replace(/\*\*(.*?)\*\*/g, "$1");
      elements.push(
        <Text key={i} style={{ paddingLeft: "1rem" }}>
          • {listItem}
        </Text>,
      );
      continue;
    }

    // Regular text (skip badges and empty lines)
    if (
      line.trim() &&
      !line.includes("img.shields.io") &&
      !line.startsWith("<")
    ) {
      const cleanLine = line
        .replace(/\*\*(.*?)\*\*/g, "$1") // Bold
        .replace(/\*(.*?)\*/g, "$1") // Italic
        .replace(/`(.*?)`/g, "$1") // Inline code
        .replace(/\[(.*?)\]\(.*?\)/g, "$1"); // Links

      if (cleanLine.trim()) {
        elements.push(<Text key={i}>{cleanLine}</Text>);
      }
    }
  }

  return <>{elements}</>;
}

export default function About() {
  return (
    <Container size="lg" style={{ padding: "2rem" }}>
      <Stack gap="md">
        <MarkdownContent content={readme} />
      </Stack>
    </Container>
  );
}
