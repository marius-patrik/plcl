/**
 * Documentation Extractor
 * Parses JSDoc comments from source files to generate documentation JSON
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { type JSDoc, Project, type SourceFile, SyntaxKind } from "ts-morph";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "../..");

interface PropDoc {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

interface ExampleDoc {
  title: string;
  code: string;
}

interface ComponentDoc {
  name: string;
  category: string;
  description: string;
  props: PropDoc[];
  examples: ExampleDoc[];
  sourceFile: string;
}

interface TypeDoc {
  name: string;
  kind: "interface" | "type" | "enum";
  description: string;
  properties: PropDoc[];
  sourceFile: string;
}

function extractJsDocDescription(jsDocs: JSDoc[]): string {
  if (!jsDocs.length) return "";
  const doc = jsDocs[0];
  return doc.getDescription().trim();
}

function extractExamples(jsDocs: JSDoc[]): ExampleDoc[] {
  const examples: ExampleDoc[] = [];
  for (const doc of jsDocs) {
    const tags = doc.getTags();
    for (const tag of tags) {
      if (tag.getTagName() === "example") {
        const text = tag.getCommentText() || "";
        const lines = text.split("\n");
        let title = "Example";
        const codeLines: string[] = [];
        let inCode = false;

        for (const line of lines) {
          if (line.includes("```")) {
            inCode = !inCode;
            continue;
          }
          if (!inCode && line.trim() && !codeLines.length) {
            title = line.trim();
          } else if (inCode) {
            codeLines.push(line);
          }
        }

        if (codeLines.length) {
          examples.push({
            title,
            code: codeLines.join("\n").trim(),
          });
        }
      }
    }
  }
  return examples;
}

function extractPropsFromInterface(
  sourceFile: SourceFile,
  interfaceName: string,
): PropDoc[] {
  const props: PropDoc[] = [];
  const iface = sourceFile.getInterface(interfaceName);

  if (iface) {
    for (const prop of iface.getProperties()) {
      const jsDocs = prop.getJsDocs();
      const description = extractJsDocDescription(jsDocs);
      const typeNode = prop.getTypeNode();

      props.push({
        name: prop.getName(),
        type: typeNode?.getText() || prop.getType().getText(),
        description,
        required: !prop.hasQuestionToken(),
      });
    }
  }

  return props;
}

function extractComponentDocs(
  project: Project,
  packagePath: string,
  category: string,
): ComponentDoc[] {
  const docs: ComponentDoc[] = [];
  const srcPath = join(packagePath, "src");
  const componentsPath = join(srcPath, "components");

  const sourceFiles = project.addSourceFilesAtPaths(
    `${componentsPath}/**/*.tsx`,
  );

  for (const sourceFile of sourceFiles) {
    const fileName = sourceFile.getBaseName().replace(".tsx", "");
    if (fileName === "index") continue;

    // Find default export or named export
    const defaultExport = sourceFile.getDefaultExportSymbol();
    const exportDecl = sourceFile.getExportedDeclarations();

    const componentName = fileName;
    let description = "";
    let examples: ExampleDoc[] = [];

    // Look for function/const declarations with JSDoc
    const functions = sourceFile.getFunctions();
    const variables = sourceFile.getVariableDeclarations();

    // Check functions
    for (const func of functions) {
      const jsDocs = func.getJsDocs();
      if (jsDocs.length) {
        description = extractJsDocDescription(jsDocs);
        examples = extractExamples(jsDocs);
        break;
      }
    }

    // Check variable declarations (arrow functions)
    if (!description) {
      for (const variable of variables) {
        const jsDocs = variable.getJsDocs ? variable.getJsDocs() : [];
        // Try parent statement
        const parent = variable.getParent()?.getParent();
        if (parent && parent.getKind() === SyntaxKind.VariableStatement) {
          const statement = parent.asKind(SyntaxKind.VariableStatement);
          if (statement) {
            const stmtDocs = statement.getJsDocs();
            if (stmtDocs.length) {
              description = extractJsDocDescription(stmtDocs);
              examples = extractExamples(stmtDocs);
              break;
            }
          }
        }
      }
    }

    // Find Props interface
    const propsInterfaceName = `${fileName}Props`;
    const props = extractPropsFromInterface(sourceFile, propsInterfaceName);

    // Only add if we found some documentation
    if (description || props.length) {
      docs.push({
        name: componentName,
        category,
        description: description || `${componentName} component`,
        props,
        examples,
        sourceFile: sourceFile.getFilePath().replace(rootDir, ""),
      });
    }
  }

  return docs;
}

function extractTypeDocs(project: Project, packagePath: string): TypeDoc[] {
  const docs: TypeDoc[] = [];
  const srcPath = join(packagePath, "src");

  const sourceFiles = project.addSourceFilesAtPaths(`${srcPath}/**/*.ts`);

  for (const sourceFile of sourceFiles) {
    // Extract interfaces
    for (const iface of sourceFile.getInterfaces()) {
      if (!iface.isExported()) continue;

      const jsDocs = iface.getJsDocs();
      const description = extractJsDocDescription(jsDocs);
      const properties: PropDoc[] = [];

      for (const prop of iface.getProperties()) {
        const propDocs = prop.getJsDocs();
        properties.push({
          name: prop.getName(),
          type: prop.getType().getText(),
          description: extractJsDocDescription(propDocs),
          required: !prop.hasQuestionToken(),
        });
      }

      docs.push({
        name: iface.getName(),
        kind: "interface",
        description: description || `${iface.getName()} interface`,
        properties,
        sourceFile: sourceFile.getFilePath().replace(rootDir, ""),
      });
    }

    // Extract type aliases
    for (const typeAlias of sourceFile.getTypeAliases()) {
      if (!typeAlias.isExported()) continue;

      const jsDocs = typeAlias.getJsDocs();
      const description = extractJsDocDescription(jsDocs);

      docs.push({
        name: typeAlias.getName(),
        kind: "type",
        description: description || `${typeAlias.getName()} type`,
        properties: [],
        sourceFile: sourceFile.getFilePath().replace(rootDir, ""),
      });
    }
  }

  return docs;
}

async function main() {
  console.log("📚 Extracting documentation from source files...\n");

  const project = new Project({
    tsConfigFilePath: join(rootDir, "@plcl-core", "tsconfig.json"),
    skipAddingFilesFromTsConfig: true,
  });

  // Extract Core Components
  console.log("📦 Processing @plcl/core components...");
  const coreComponents = extractComponentDocs(
    project,
    join(rootDir, "@plcl-core"),
    "Core",
  );
  console.log(`   Found ${coreComponents.length} components`);

  // Extract UI Components
  console.log("📦 Processing @plcl/ui components...");
  const uiProject = new Project({
    tsConfigFilePath: join(rootDir, "@plcl-ui", "tsconfig.json"),
    skipAddingFilesFromTsConfig: true,
  });
  const uiComponents = extractComponentDocs(
    uiProject,
    join(rootDir, "@plcl-ui"),
    "UI",
  );
  console.log(`   Found ${uiComponents.length} components`);

  // Extract Core Types
  console.log("📦 Processing @plcl/core-types...");
  const coreTypesProject = new Project({
    skipAddingFilesFromTsConfig: true,
  });
  const coreTypes = extractTypeDocs(
    coreTypesProject,
    join(rootDir, "@plcl-core-types"),
  );
  console.log(`   Found ${coreTypes.length} types`);

  // Extract UI Types
  console.log("📦 Processing @plcl/ui-types...");
  const uiTypesProject = new Project({
    skipAddingFilesFromTsConfig: true,
  });
  const uiTypes = extractTypeDocs(
    uiTypesProject,
    join(rootDir, "@plcl-ui-types"),
  );
  console.log(`   Found ${uiTypes.length} types`);

  // Write output
  const outputDir = join(__dirname, "../src/data/generated");
  mkdirSync(outputDir, { recursive: true });

  writeFileSync(
    join(outputDir, "core-components.json"),
    JSON.stringify(coreComponents, null, 2),
  );
  writeFileSync(
    join(outputDir, "ui-components.json"),
    JSON.stringify(uiComponents, null, 2),
  );
  writeFileSync(
    join(outputDir, "core-types.json"),
    JSON.stringify(coreTypes, null, 2),
  );
  writeFileSync(
    join(outputDir, "ui-types.json"),
    JSON.stringify(uiTypes, null, 2),
  );

  console.log("\n✅ Documentation extracted successfully!");
  console.log(`   Output: ${outputDir}`);
}

main().catch(console.error);
