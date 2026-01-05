/**
 * Documentation data loader
 * Imports generated JSON documentation from JSDoc extraction
 */

// Import generated documentation (created by extract-docs script)
// These will be generated at build time from JSDoc comments
import coreComponentsData from "./generated/core-components.json";
import coreTypesData from "./generated/core-types.json";
import uiComponentsData from "./generated/ui-components.json";
import uiTypesData from "./generated/ui-types.json";
import type { ComponentDoc, TypeDoc } from "./types";

export const coreComponents: ComponentDoc[] =
  coreComponentsData as ComponentDoc[];
export const uiComponents: ComponentDoc[] = uiComponentsData as ComponentDoc[];
export const coreTypes: TypeDoc[] = coreTypesData as TypeDoc[];
export const uiTypes: TypeDoc[] = uiTypesData as TypeDoc[];

// Group components by category
export function groupByCategory<T extends { category: string }>(
  items: T[],
): Record<string, T[]> {
  return items.reduce(
    (acc, item) => {
      const category = item.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, T[]>,
  );
}

export type { ComponentDoc, ExampleDoc, PropDoc, TypeDoc } from "./types";
