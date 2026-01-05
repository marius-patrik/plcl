import { useRoute } from "wouter";
import { coreComponents, uiComponents } from "../data";
import { ComponentDetail } from "./ComponentDetail";

interface ComponentPageProps {
  library: "core" | "ui";
}

export default function ComponentPage({ library }: ComponentPageProps) {
  const pathPattern =
    library === "core"
      ? "/core-components/:component"
      : "/ui-components/:component";
  const [match, params] = useRoute<{ component: string }>(pathPattern);

  if (!match || !params) return null;

  const components = library === "core" ? coreComponents : uiComponents;
  const component = components.find(
    (c) => c.name.toLowerCase() === params.component.toLowerCase(),
  );

  if (!component) {
    return <div>Component not found: {params.component}</div>;
  }

  const parentPath = library === "core" ? "/core-components" : "/ui-components";
  const parentLabel = library === "core" ? "Core Components" : "UI Components";

  return (
    <ComponentDetail
      component={component}
      parentPath={parentPath}
      parentLabel={parentLabel}
      library={library}
    />
  );
}
