# 🪟 PLC UI

<div align="center">

**Desktop UI library for building OS-like interfaces with window management**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Build desktop-like applications with window management, dock, and desktop environments.

</div>

---

## 🎯 Overview

**PLC UI** is a React library specialized for building desktop-like interfaces on the web. It provides a comprehensive `Shell` component with multiple variants for different use cases, along with window management, desktop environments, and custom app support.

### ✨ Key Features

- 🖥️ **Shell Component** - Single component with 6 variants for different layouts
- 🪟 **Window Management** - Draggable, resizable windows with z-index management
- 🎨 **Desktop Environment** - Full OS-like interface with dock, wallpaper, and app icons
- 🔧 **Custom Apps** - Easy API for adding custom applications
- ⚡ **Lightweight** - Built on top of `@plcl/core` components
- 📦 **TypeScript** - Full type definitions included

---

## 📦 Installation

```bash
npm install @plcl/ui
```

### Peer Dependencies

This library requires `@plcl/core`:

```bash
npm install @plcl/core @plcl/ui
```

---

## 🚀 Quick Start

### Basic Usage

```tsx
import { Shell } from "@plcl/ui";
import "@plcl/core/styles.css";

function App() {
  return <Shell variant="desktop" />;
}
```

### Import Styles

Don't forget to import the CSS file:

```tsx
import "@plcl/core/styles.css";
```

---

## 📚 Shell Component

The `Shell` component is the main component of PLC UI, providing 6 different variants for various use cases.

### Variants

#### 1. Desktop (`desktop`)

Full desktop environment with windows, dock, wallpaper, and app management.

```tsx
import { Shell } from "@plcl/ui";
import type { AppDefinition } from "@plcl/ui-types";

const customApps: AppDefinition[] = [
  {
    id: "my-app",
    title: "My App",
    icon: <IconApp size={32} />,
    Component: MyAppComponent,
  },
];

<Shell variant="desktop" customApps={customApps} />
```

**Features:**
- Window management (draggable, resizable)
- Dock with app icons
- Desktop with app icons
- App search overlay (Cmd/Ctrl + Space)
- Settings app (theme, wallpaper, icons, dock)
- Custom apps support

#### 2. App (`app`)

Standard application layout with header, main content, and optional footer.

```tsx
<Shell 
  variant="app" 
  header={<Header>My App</Header>}
  footer={<Footer>Copyright 2024</Footer>}
>
  <MainContent />
</Shell>
```

#### 3. Page (`page`)

Simple page layout with header content.

```tsx
<Shell 
  variant="page" 
  headerContent={<NavigationBar />}
>
  <PageContent />
</Shell>
```

#### 4. Sidebar (`sidebar`)

Layout with sidebar navigation.

```tsx
<Shell 
  variant="sidebar" 
  sidebar={<SidebarNavigation />}
>
  <MainContent />
</Shell>
```

#### 5. Web (`web`)

Iframe wrapper for embedding external URLs.

```tsx
<Shell variant="web" url="https://example.com" />
```

#### 6. Window (`window`)

Individual draggable/resizable window component.

```tsx
<Shell 
  variant="window"
  windowTitle="My Window"
  windowIsOpen={isOpen}
  windowHandleClose={() => setIsOpen(false)}
  windowZIndex={zIndex}
  windowOnFocus={onFocus}
>
  <WindowContent />
</Shell>
```

---

## 🔧 Custom Apps API

You can add custom apps to the desktop variant:

```tsx
import { Shell } from "@plcl/ui";
import { Window } from "@plcl/ui"; // Internal, but needed for custom apps
import type { AppDefinition, AppWindowProps } from "@plcl/ui-types";
import { IconCalculator } from "@tabler/icons-react";

// Define your app component
const CalculatorApp = ({ 
  isOpen, 
  handleClose, 
  zIndex, 
  onFocus, 
  resetKey 
}: AppWindowProps) => {
  return (
    <Window
      title="Calculator"
      isOpen={isOpen}
      handleClose={handleClose}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <div>Calculator content</div>
    </Window>
  );
};

// Register the app
const customApps: AppDefinition[] = [
  {
    id: "calculator",
    title: "Calculator",
    icon: <IconCalculator size={32} />,
    Component: CalculatorApp,
  },
];

// Use in Shell
<Shell variant="desktop" customApps={customApps} />
```

### AppWindowProps Interface

```typescript
interface AppWindowProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey: number;
}
```

---

## 🎨 Built-in Apps

The desktop variant includes several built-in apps:

- **Settings** - Theme, wallpaper, icons, dock, and layout settings
- **Search** - App search overlay (Cmd/Ctrl + Space)

---

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone https://github.com/marius-patrik/plcl.git
cd plcl

# Install dependencies
npm install
```

### Build

Build the library:

```bash
cd @plcl-ui
npm run build
```

### Watch Mode

Build in watch mode for development:

```bash
npm run dev
```

### Linting & Formatting

```bash
# Lint and fix
npm run lint

# Format code
npm run format
```

---

## 📦 Package Structure

```
@plcl-ui/
├── dist/              # Built output
│   ├── esm/          # ES Module build
│   ├── cjs/          # CommonJS build
│   └── index.d.ts    # Type definitions
├── src/
│   ├── components/   # React components
│   │   ├── Shell.tsx # Main Shell component
│   │   ├── Window.tsx
│   │   ├── WindowManager.tsx
│   │   ├── Settings.tsx
│   │   ├── Search.tsx
│   │   └── ...
│   ├── hooks/        # Desktop-specific hooks
│   └── index.ts      # Main export
└── package.json
```

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build the library |
| `npm run dev` | Build in watch mode |
| `npm run lint` | Lint and fix with Biome |
| `npm run format` | Format code with Biome |

---

## 🔧 Configuration

### Rslib Configuration

The library uses Rslib for building. Configuration is in `rslib.config.ts`.

### TypeScript Configuration

TypeScript settings are in `tsconfig.json` with strict type checking.

### Biome Configuration

Code formatting and linting rules are in `biome.json`.

---

## 📦 Exports

The library exports both ESM and CJS formats:

- **ESM**: `dist/esm/index.js`
- **CJS**: `dist/cjs/index.cjs`
- **Types**: `dist/index.d.ts`

**Main Exports:**
- `Shell` - Main component with all variants
- `IFrameApp` - Utility for embedding web apps
- Types: `ShellProps`, `ShellVariant`, `ShellItemProps`

---

## 🤝 Contributing

Contributions are welcome! When contributing:

1. Follow the existing code style
2. Add TypeScript types for all props
3. Include examples in documentation
4. Ensure components are accessible
5. Test all Shell variants

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🔗 Related Projects

- **[@plcl/core](../@plcl-core/)** - Core component library
- **[@plcl-ui-types](../@plcl-ui-types/)** - TypeScript type definitions
- **[docs](../docs/)** - Documentation website
- **[playground](../playground/)** - Component playground

---

## 📞 Support

For questions, issues, or contributions, please visit the main [PLCL repository](https://github.com/marius-patrik/plcl).

---

<div align="center">

**Built with ❤️ for beautiful desktop UIs**

</div>
