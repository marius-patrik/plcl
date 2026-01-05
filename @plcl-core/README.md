# 🪟 PLC Core

<div align="center">

**A React component library inspired by Apple's Liquid Glass design language**

[![npm](https://img.shields.io/npm/v/plc-core?color=CB3837&logo=npm)](https://www.npmjs.com/package/plc-core)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Beautiful, modern UI components with that signature frosted glass aesthetic.

</div>

---

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

---

## 📦 Installation

```bash
npm install @plcl/core
```

### Peer Dependencies

This library requires React 17+ and React DOM 17+:

```bash
npm install react react-dom
```

---

## 🚀 Quick Start

### Basic Usage

```tsx
import { Button, Card, ThemeProvider } from "@plcl/core";
import "@plcl/core/styles.css";

function App() {
  return (
    <ThemeProvider>
      <Card variant="glass">
        <Button variant="glass">Click me</Button>
      </Card>
    </ThemeProvider>
  );
}
```

### Import Styles

Don't forget to import the CSS file:

```tsx
import "@plcl/core/styles.css";
```

Or in your main CSS file:

```css
@import "plc-core/styles.css";
```

---

## 📚 Components

### 🎨 Core Components

#### Button

Versatile button component with multiple variants.

```tsx
import { Button } from "@plcl/core";

<Button variant="glass" type="button" onClick={() => {}}>
  Click me
</Button>
```

**Variants:** `glass`, `glass-highlight`, `icon`, `text`, `outline`

#### Card

Container component with glassmorphism styling.

```tsx
import { Card } from "@plcl/core";

<Card variant="glass" header={<h2>Title</h2>} footer={<Button>Action</Button>}>
  Card content
</Card>
```

**Variants:** `glass`, `glass-highlight`, `flat`

#### Loading

Loading indicator component.

```tsx
import { Loading } from "@plcl/core";

<Loading variant="glass" />
```

**Variants:** `glass`, `primary`

---

### 📝 Form Components

#### Input

Text input field with glass styling.

```tsx
import { Input } from "@plcl/core";

<Input
  type="text"
  placeholder="Enter text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

#### Textarea

Multi-line text input.

```tsx
import { Textarea } from "@plcl/core";

<Textarea
  placeholder="Enter message"
  rows={4}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

#### Select

Dropdown select component.

```tsx
import { Select } from "@plcl/core";

<Select
  items={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

#### Checkbox

Checkbox input.

```tsx
import { Checkbox } from "@plcl/core";

<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  label="Accept terms"
/>
```

#### Radio

Radio button group.

```tsx
import { Radio } from "@plcl/core";

<Radio
  name="option"
  value={value}
  onChange={setValue}
  options={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ]}
/>
```

#### Switch

Toggle switch component.

```tsx
import { Switch } from "@plcl/core";

<Switch
  checked={enabled}
  onChange={setEnabled}
  label="Enable feature"
/>
```

#### Slider

Range slider input.

```tsx
import { Slider } from "@plcl/core";

<Slider
  min={0}
  max={100}
  value={value}
  onChange={setValue}
/>
```

#### NumberInput

Numeric input with increment/decrement controls.

```tsx
import { NumberInput } from "@plcl/core";

<NumberInput
  min={0}
  max={100}
  value={value}
  onChange={setValue}
/>
```

#### PasswordInput

Password input with show/hide toggle.

```tsx
import { PasswordInput } from "@plcl/core";

<PasswordInput
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
```

#### SegmentedControl

Segmented control for selecting options.

```tsx
import { SegmentedControl } from "@plcl/core";

<SegmentedControl
  value={selected}
  onChange={setSelected}
  options={["Option 1", "Option 2", "Option 3"]}
/>
```

---

### 📊 Data Display

#### Progress

Progress bar component.

```tsx
import { Progress } from "@plcl/core";

<Progress value={75} max={100} />
```

#### Skeleton

Loading skeleton placeholder.

```tsx
import { Skeleton } from "@plcl/core";

<Skeleton width="200px" height="20px" />
```

#### Badge

Badge component for labels and tags.

```tsx
import { Badge } from "@plcl/core";

<Badge variant="glass">New</Badge>
```

**Variants:** `glass`, `primary`, `success`, `warning`, `error`

#### Avatar

User avatar component.

```tsx
import { Avatar } from "@plcl/core";

<Avatar src="/avatar.jpg" alt="User" size="md" />
```

#### Alert

Alert message component.

```tsx
import { Alert } from "@plcl/core";

<Alert variant="info" title="Information">
  This is an alert message.
</Alert>
```

**Variants:** `info`, `success`, `warning`, `error`

#### Accordion

Collapsible content sections.

```tsx
import { Accordion } from "@plcl/core";

<Accordion
  items={[
    { title: "Section 1", content: "Content 1" },
    { title: "Section 2", content: "Content 2" },
  ]}
/>
```

---

### 🧭 Navigation & Overlay

#### Menu

Dropdown menu component.

```tsx
import { Menu } from "@plcl/core";

<Menu
  items={[
    { label: "Item 1", onClick: () => {} },
    { label: "Item 2", onClick: () => {} },
  ]}
/>
```

#### Modal

Modal dialog overlay.

```tsx
import { Modal } from "@plcl/core";

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Dialog Title">
  Modal content
</Modal>
```

#### Drawer

Side drawer component.

```tsx
import { Drawer } from "@plcl/core";

<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  side="left"
>
  Drawer content
</Drawer>
```

#### Popover

Popover tooltip component.

```tsx
import { Popover } from "@plcl/core";

<Popover content="Popover content">
  <Button>Hover me</Button>
</Popover>
```

#### Tooltip

Tooltip component.

```tsx
import { Tooltip } from "@plcl/core";

<Tooltip content="Tooltip text">
  <Button>Hover me</Button>
</Tooltip>
```

#### Burger

Hamburger menu button.

```tsx
import { Burger } from "@plcl/core";

<Burger opened={isOpen} onClick={() => setIsOpen(!isOpen)} />
```

---

### 📐 Layout Components

#### Box

Display container with title and action buttons.

```tsx
import { Box } from "@plcl/core";

<Box title="Section Title" buttons={<Button>Add</Button>}>
  Content
</Box>
```

#### Container

Centered container with max-width.

```tsx
import { Container } from "@plcl/core";

<Container size="lg">
  Content
</Container>
```

#### Grid

CSS Grid wrapper component.

```tsx
import { Grid } from "@plcl/core";

<Grid cols={3} gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

**Columns:** `1`, `2`, `3`, `4`, `5`, `6`, `12`  
**Gap:** `none`, `sm`, `md`, `lg`, `xl`

#### Flex

Flexbox wrapper component.

```tsx
import { Flex } from "@plcl/core";

<Flex direction="row" justify="between" align="center" gap="md">
  <div>Left</div>
  <div>Right</div>
</Flex>
```

**Direction:** `row`, `col`, `row-reverse`, `col-reverse`  
**Justify:** `start`, `end`, `center`, `between`, `around`, `evenly`  
**Align:** `start`, `end`, `center`, `stretch`, `baseline`  
**Gap:** `none`, `sm`, `md`, `lg`, `xl`

#### Stack

Vertical flex container (shorthand for `Flex direction="col"`).

```tsx
import { Stack } from "@plcl/core";

<Stack gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

#### Group

Horizontal flex container (shorthand for `Flex direction="row"`).

```tsx
import { Group } from "@plcl/core";

<Group gap="sm">
  <Button>Save</Button>
  <Button>Cancel</Button>
</Group>
```

#### Spacer

Flexible spacing element.

```tsx
import { Spacer } from "@plcl/core";

<Flex>
  <div>Left</div>
  <Spacer />
  <div>Right</div>
</Flex>
```

#### Divider

Horizontal divider line.

```tsx
import { Divider } from "@plcl/core";

<div>Content 1</div>
<Divider />
<div>Content 2</div>
```

---

### 🖥️ Interface Components

#### Header, Footer, Main, Sidebar

Layout components for building application structures.

```tsx
import { Header, Footer, Main, Sidebar } from "@plcl/core";

<Header>
  <span>Status info</span>
</Header>
<Main>
  <div>Main content</div>
</Main>
<Footer>
  <AppIcon icon={<IconHome />} label="Home" />
</Footer>
```

#### AppIcon

Desktop-style application icon.

```tsx
import { AppIcon } from "@plcl/core";

<AppIcon
  icon={<IconHome />}
  label="Home"
  onClick={() => {}}
/>
```

#### Header

Application header/status bar.

```tsx
import { Header } from "@plcl/core";

<Header>
  <span>Status info</span>
</Header>
```

#### Footer

Application footer/dock bar.

```tsx
import { Footer } from "@plcl/core";

<Footer>
  <AppIcon icon={<IconHome />} label="Home" />
</Footer>
```

---

### 📄 Typography

#### Text

Text component with styling options.

```tsx
import { Text } from "@plcl/core";

<Text size="lg" weight="bold" align="center">
  Text content
</Text>
```

#### Title

Heading component.

```tsx
import { Title } from "@plcl/core";

<Title order={1}>Main Title</Title>
```

**Order:** `1` (h1) through `6` (h6)

#### Code

Inline code component.

```tsx
import { Code } from "@plcl/core";

<Code>const x = 1;</Code>
```

#### Blockquote

Blockquote component.

```tsx
import { Blockquote } from "@plcl/core";

<Blockquote>
  This is a quote.
</Blockquote>
```

#### Kbd

Keyboard key indicator.

```tsx
import { Kbd } from "@plcl/core";

Press <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy
```

---

## 🎨 Styling

### Glassmorphism

All components support glassmorphism styling through variants:

- **glass** - Standard frosted glass effect
- **glass-highlight** - Highlighted glass with accent colors
- **flat** - Solid background (no glass effect)

### Dark Mode

Dark mode is automatically supported. Use the `.dark` class on a parent element:

```tsx
<div className="dark">
  <Button variant="glass">Dark Mode Button</Button>
</div>
```

### Customization

Since components are built with Tailwind CSS, you can customize them using Tailwind classes:

```tsx
<Button variant="glass" className="bg-blue-500/50">
  Custom Button
</Button>
```

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

# Check only (no fixes)
npm run lint:check
```

---

## 📦 Package Structure

```
plc-core/
├── dist/              # Built output
│   ├── esm/          # ES Module build
│   ├── cjs/          # CommonJS build
│   └── index.d.ts    # Type definitions
├── src/
│   ├── components/   # React components
│   ├── styles.css    # Global styles
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
| `npm run lint:check` | Check linting without fixing |

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
- **Styles**: `dist/esm/index.css`

---

## 🤝 Contributing

Contributions are welcome! When contributing:

1. Follow the existing code style
2. Add TypeScript types for all props
3. Include examples in documentation
4. Ensure components are accessible
5. Test in both light and dark modes

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🔗 Related Projects

- **[@plcl-core-types](../@plcl-core-types/)** - TypeScript type definitions
- **[@plcl-ui](../@plcl-ui/)** - Desktop UI library
- **[docs](../docs/)** - Documentation website
- **[playground](../playground/)** - Component playground

---

## 📞 Support

For questions, issues, or contributions, please visit the main [PLCL repository](https://github.com/marius-patrik/plcl).

---

<div align="center">

**Built with ❤️ for beautiful UIs**

</div>
