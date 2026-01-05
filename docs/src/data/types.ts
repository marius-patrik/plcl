/**
 * Documentation data types
 */

export interface PropDoc {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export interface ExampleDoc {
  title: string;
  code: string;
}

export interface ComponentDoc {
  name: string;
  category: string;
  description: string;
  props: PropDoc[];
  examples: ExampleDoc[];
  sourceFile: string;
}

export interface TypeDoc {
  name: string;
  kind: "interface" | "type" | "enum";
  description: string;
  properties: PropDoc[];
  sourceFile: string;
}
