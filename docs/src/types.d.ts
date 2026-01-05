// Allow importing markdown files as raw text
declare module "*.md?raw" {
  const content: string;
  export default content;
}

// Allow importing JSON files
declare module "*.json" {
  const value: unknown;
  export default value;
}
