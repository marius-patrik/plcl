import { Button, Group, Stack, Title } from "@plcl/core";
import { Shell } from "@plcl/ui";
import {
  IconArrowsMaximize,
  IconBook,
  IconBox,
  IconBraces,
  IconBrush,
  IconChevronDown,
  IconChevronRight,
  IconLayoutGrid,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import { coreComponents, uiComponents } from "./data";

// Pages
import About from "./pages/About";
import ComponentPage from "./pages/ComponentPage";
import CoreComponents from "./pages/CoreComponents";
import CoreTypes from "./pages/CoreTypes";
import LibraryAbout from "./pages/LibraryAbout";
import Styling from "./pages/Styling";
import UIComponents from "./pages/UIComponents";
import UITypes from "./pages/UITypes";

const navItems = [
  { id: "/", label: "About", icon: <IconBook size={18} /> },
  {
    id: "/core-components",
    label: "Core Components",
    icon: <IconBox size={18} />,
    children: [
      { name: "About", path: "/core-components/about" },
      ...coreComponents.map((c) => ({
        name: c.name,
        path: `/core-components/${c.name.toLowerCase()}`,
      })),
    ],
  },
  {
    id: "/ui-components",
    label: "UI Components",
    icon: <IconArrowsMaximize size={18} />,
    children: [
      { name: "About", path: "/ui-components/about" },
      ...uiComponents.map((c) => ({
        name: c.name,
        path: `/ui-components/${c.name.toLowerCase()}`,
      })),
    ],
  },
  { id: "/core-types", label: "Core Types", icon: <IconBraces size={18} /> },
  { id: "/ui-types", label: "UI Types", icon: <IconLayoutGrid size={18} /> },
  { id: "/styling", label: "Styling", icon: <IconBrush size={18} /> },
];

function Sidebar() {
  const [location, setLocation] = useLocation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Parse component from path like /core-components/button
  const pathParts = location.split("/").filter(Boolean);
  const currentPath = `/${pathParts[0] || ""}`;
  const selectedComponent = pathParts[1];

  // Auto-expand items that have selected children
  useEffect(() => {
    if (selectedComponent) {
      const parent = navItems.find(
        (item) => item.id === currentPath && item.children,
      );
      if (parent) {
        setExpandedItems((prev) => new Set([...prev, parent.id]));
      }
    }
  }, [selectedComponent, currentPath]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isExpanded = (id: string) => expandedItems.has(id);
  const isActive = (id: string) => location.split("?")[0] === id;

  return (
    <Stack gap="xs" p="md">
      <Group gap="sm" mb="md">
        <IconBox size={24} />
        <Title order={4}>PLCL Docs</Title>
      </Group>

      {navItems.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const expanded = isExpanded(item.id);
        const active = isActive(item.id);
        const isChildActive = hasChildren && selectedComponent;

        return (
          <div key={item.id} style={{ width: "100%" }}>
            <Button
              style="unstyled"
              onClick={(e) => {
                e.stopPropagation();
                if (hasChildren) {
                  toggleExpanded(item.id);
                } else {
                  setLocation(item.id);
                }
              }}
              style={{
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <Group gap="sm">
                {hasChildren && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpanded(item.id);
                    }}
                  >
                    {expanded ? (
                      <IconChevronDown size={16} />
                    ) : (
                      <IconChevronRight size={16} />
                    )}
                  </div>
                )}
                {item.icon}
                <span>{item.label}</span>
              </Group>
            </Button>

            {hasChildren && expanded && (
              <div>
                {item.children!.map((child) => {
                  const childPath =
                    (child as any).path ||
                    `${item.id}/${child.name.toLowerCase()}`;

                  return (
                    <Button
                      key={child.name}
                      variant="unstyled"
                      onClick={() => setLocation(childPath)}
                      style={{
                        justifyContent: "flex-start",
                        width: "100%",
                        fontSize: "0.875rem",
                        marginLeft: "1.5rem",
                      }}
                    >
                      {child.name}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </Stack>
  );
}

export default function App() {
  return (
    <Shell variant="sidebar" sidebar={<Sidebar />}>
      <Switch>
        <Route path="/" component={About} />
        <Route
          path="/core-components/about"
          component={() => <LibraryAbout library="core" />}
        />
        <Route
          path="/core-components/:component"
          component={() => <ComponentPage library="core" />}
        />
        <Route path="/core-components" component={CoreComponents} />
        <Route
          path="/ui-components/about"
          component={() => <LibraryAbout library="ui" />}
        />
        <Route
          path="/ui-components/:component"
          component={() => <ComponentPage library="ui" />}
        />
        <Route path="/ui-components" component={UIComponents} />
        <Route path="/core-types" component={CoreTypes} />
        <Route path="/ui-types" component={UITypes} />
        <Route path="/styling" component={Styling} />
      </Switch>
    </Shell>
  );
}
