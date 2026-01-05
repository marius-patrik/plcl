import {
  AppIcon,
  Footer,
  Header,
  Main,
  NavigationMenu,
  Sidebar,
  ThemeProvider,
} from "@plcl/core";
import type { AppDefinition } from "@plcl/ui-types";
import { IconSearch, IconSettings } from "@tabler/icons-react";
import type { FC, PropsWithChildren, ReactNode } from "react";
import * as React from "react";
import { Children, useCallback, useEffect, useMemo, useState } from "react";
import { DesktopLayoutProvider } from "../hooks/useDesktopLayout";
import { FooterProvider, useFooter } from "../hooks/useFooter";
import { IconSizeProvider, useIconSize } from "../hooks/useIconSize";
import { WallpaperProvider } from "../hooks/useWallpaper";
import { DesktopIcons } from "./Apps";
import { Search } from "./Search";
import { Settings } from "./Settings";

// Inline Clock component for desktop header
const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return <div className="ml-auto font-semibold">{formattedTime}</div>;
};

import { Desktop } from "./Desktop";
import { Wallpaper } from "./Wallpaper";
import { Window } from "./Window";
import { WindowManager } from "./WindowManager";

// Types for Header/Footer/Main variants
type HeaderVariant = "app" | "desktop" | "page" | "sidebar";
type FooterVariant = "app" | "desktop" | "page" | "sidebar";
type MainVariant = "app" | "desktop" | "page" | "sidebar";

// Navigation menu item type
interface NavigationMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

/**
 * Props for Shell.Item subcomponent used to define pages in navigation.
 */
export interface ShellItemProps extends PropsWithChildren {
  /** Unique identifier for the page */
  id: string;
  /** Display title shown in navigation */
  title: string;
  /** Optional icon displayed alongside the title */
  icon?: ReactNode;
}

/**
 * Shell.Item - Defines a page within the Shell component.
 * Used as children of Shell to create navigable pages.
 *
 * @example
 * ```tsx
 * <Shell variant="page">
 *   <Shell.Item id="home" title="Home">
 *     <HomePage />
 *   </Shell.Item>
 *   <Shell.Item id="settings" title="Settings">
 *     <SettingsPage />
 *   </Shell.Item>
 * </Shell>
 * ```
 */
const ShellItem: FC<ShellItemProps> = ({ children }) => {
  return <>{children}</>;
};

/**
 * Available Shell layout variants.
 * - `desktop` - Full desktop environment with windows, dock, and wallpaper
 * - `app` - Standard application layout with header, main content, and footer
 * - `page` - Simple page layout for content-focused views
 * - `sidebar` - Layout with sidebar navigation
 * - `web` - Iframe wrapper for embedding external URLs
 * - `window` - Individual draggable/resizable window
 */
export type ShellVariant =
  | "app"
  | "desktop"
  | "page"
  | "sidebar"
  | "web"
  | "window";

/**
 * Props for the Shell component.
 */
export interface ShellProps {
  /** The layout variant to use */
  variant: ShellVariant;

  /** Background image URL (desktop variant) */
  backgroundImage?: string;
  /** CSS class for background overlay (desktop variant) */
  backgroundOverlay?: string;

  /** Custom apps to display in the desktop environment (desktop variant) */
  customApps?: AppDefinition[];

  /** URL to embed in iframe (web variant) */
  url?: string;
  /** Title for the iframe (web variant) */
  webTitle?: string;

  /** Title displayed in window header (window variant) */
  windowTitle?: ReactNode;
  /** Callback when window is closed (window variant) */
  windowHandleClose?: () => void;
  /** Whether the window is open (window variant) */
  windowIsOpen?: boolean;
  /** Z-index for window stacking (window variant) */
  windowZIndex?: number;
  /** Callback when window receives focus (window variant) */
  windowOnFocus?: () => void;
  /** Key to reset window position/size (window variant) */
  windowResetKey?: number;

  /** Header component variant override */
  headerVariant?: HeaderVariant;
  /** Footer component variant override */
  footerVariant?: FooterVariant;
  /** Main content area variant override */
  mainVariant?: MainVariant;

  /** Content to render inside the header */
  headerContent?: ReactNode;
  /** Content to render inside the footer */
  footerContent?: ReactNode;
  /** Content to render in the main area */
  mainContent?: ReactNode;

  /** Full header component override */
  header?: ReactNode;
  /** Full footer component override */
  footer?: ReactNode;
  /** Full main content component override */
  main?: ReactNode;
  /** Sidebar component (sidebar variant) */
  sidebar?: ReactNode;
  /** Alias for sidebar prop */
  sidebarContent?: ReactNode;

  /** Navigation menu items (legacy) */
  menuItems?: NavigationMenuItem[];
  /** Page content map keyed by page ID (legacy) */
  pages?: Record<string, ReactNode>;
  /** Default active page ID (legacy) */
  defaultPageId?: string;
  /** Callback when active page changes */
  onPageChange?: (pageId: string) => void;

  /** Navigation menu items */
  navigationItems?: NavigationMenuItem[];
  /** Default active page ID */
  defaultActivePageId?: string;

  /** Whether main content area is scrollable */
  isMainScrollable?: boolean;
  /** Alias for isMainScrollable */
  isScrollable?: boolean;
  /** Whether sidebar is scrollable (sidebar variant) */
  isSidebarScrollable?: boolean;
}

/**
 * Shell - A versatile layout component with multiple variants for different use cases.
 *
 * The Shell component provides a flexible foundation for building applications with
 * consistent layout patterns. It supports 6 variants:
 *
 * - **desktop**: Full desktop environment with windows, dock, wallpaper, and app management
 * - **app**: Standard application layout with header, main content area, and footer
 * - **page**: Simple page layout for content-focused views
 * - **sidebar**: Layout with sidebar navigation and main content area
 * - **web**: Iframe wrapper for embedding external URLs
 * - **window**: Individual draggable, resizable window component
 *
 * @example Desktop environment with custom apps
 * ```tsx
 * import { Shell } from '@plcl/ui';
 *
 * const customApps = [
 *   { id: 'calculator', title: 'Calculator', icon: <IconCalc />, Component: CalcApp }
 * ];
 *
 * <Shell variant="desktop" customApps={customApps} />
 * ```
 *
 * @example App layout with header and footer
 * ```tsx
 * <Shell variant="app" headerContent={<Logo />} footerContent={<Copyright />}>
 *   <MainContent />
 * </Shell>
 * ```
 *
 * @example Sidebar navigation layout
 * ```tsx
 * <Shell variant="sidebar" sidebar={<NavMenu />}>
 *   <PageContent />
 * </Shell>
 * ```
 */
const ShellComponent: FC<PropsWithChildren<ShellProps>> = ({
  variant,
  backgroundImage,
  backgroundOverlay,
  customApps = [],
  url,
  webTitle = "Web App",
  windowTitle,
  windowHandleClose,
  windowIsOpen = true,
  windowZIndex = 1,
  windowOnFocus,
  windowResetKey,
  headerVariant,
  footerVariant,
  mainVariant,
  headerContent,
  footerContent,
  mainContent,
  header,
  footer,
  main,
  sidebar,
  sidebarContent,
  menuItems,
  navigationItems,
  pages,
  defaultPageId,
  defaultActivePageId,
  onPageChange,
  isMainScrollable,
  isScrollable,
  isSidebarScrollable = true,
  children,
}) => {
  // Auto-set variants based on shell variant if not provided (exclude 'web' and 'window' variants)
  const finalHeaderVariant =
    headerVariant ||
    (variant === "web" || variant === "window"
      ? undefined
      : (variant as HeaderVariant));
  const finalFooterVariant =
    footerVariant ||
    (variant === "web" || variant === "window"
      ? undefined
      : (variant as FooterVariant));
  const finalMainVariant =
    mainVariant ||
    (variant === "web" || variant === "window"
      ? undefined
      : (variant as MainVariant));

  // Handle scrollable prop aliases
  const finalIsMainScrollable = isMainScrollable ?? isScrollable ?? true;

  // Handle sidebar content
  const finalSidebar = sidebarContent || sidebar;

  // Extract Shell.Item children and build menu items and pages
  const { shellItems, shellPages, shellNavItems } = useMemo(() => {
    const items: ShellItemProps[] = [];
    const pagesMap: Record<string, ReactNode> = {};
    const navItems: NavigationMenuItem[] = [];

    Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === ShellItem) {
        const props = child.props as ShellItemProps;
        items.push(props);
        pagesMap[props.id] = props.children;
        navItems.push({
          id: props.id,
          label: props.title,
          icon: props.icon,
        });
      }
    });

    return {
      shellItems: items,
      shellPages: pagesMap,
      shellNavItems: navItems,
    };
  }, [children]);

  // Handle navigation items (support Shell.Item children, new props, and legacy props)
  const navItems =
    shellNavItems.length > 0
      ? shellNavItems
      : navigationItems || menuItems || [];
  const activePageId =
    defaultActivePageId ||
    defaultPageId ||
    navItems[0]?.id ||
    shellItems[0]?.id ||
    "";

  // Handle page content from pages prop or Shell.Item children
  const [currentPageId, setCurrentPageId] = React.useState(activePageId);

  // Sync with external defaultPageId/defaultActivePageId changes
  React.useEffect(() => {
    const newActivePageId =
      defaultActivePageId ||
      defaultPageId ||
      navItems[0]?.id ||
      shellItems[0]?.id ||
      "";
    if (newActivePageId && newActivePageId !== currentPageId) {
      setCurrentPageId(newActivePageId);
    }
  }, [defaultActivePageId, defaultPageId, navItems, shellItems, currentPageId]);

  React.useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPageId);
    }
  }, [currentPageId, onPageChange]);

  // Determine which content to use (inline content takes precedence)
  // If menuItems/navigationItems are provided, wrap header content with NavigationMenu
  let finalHeader = headerContent || header;
  if (navItems.length > 0 && finalHeader) {
    const navVariant =
      finalHeaderVariant ||
      (variant === "sidebar"
        ? "sidebar"
        : variant === "app"
          ? "app"
          : variant === "desktop"
            ? "desktop"
            : "page");
    finalHeader = (
      <NavigationMenu
        items={navItems}
        defaultActiveId={currentPageId}
        onItemChange={(id: string) => {
          setCurrentPageId(id);
        }}
        variant={navVariant}
      >
        <div className="flex items-center gap-4 w-full">
          {headerContent || header}
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <NavigationMenu.Item key={item.id} {...item} />
            ))}
          </div>
        </div>
      </NavigationMenu>
    );
  }
  const finalFooter = footerContent || footer;

  // Use page content from Shell.Item children, pages prop, or mainContent/main/children
  let finalMain = mainContent || main;
  if (shellPages && currentPageId && shellPages[currentPageId]) {
    finalMain = shellPages[currentPageId];
  } else if (pages && currentPageId && pages[currentPageId]) {
    finalMain = pages[currentPageId];
  } else if (shellPages && currentPageId && !shellPages[currentPageId]) {
    // Fallback to first available Shell.Item page if currentPageId doesn't exist
    const firstPageId = Object.keys(shellPages)[0];
    if (firstPageId) {
      finalMain = shellPages[firstPageId];
    }
  } else if (pages && currentPageId && !pages[currentPageId]) {
    // Fallback to first available page if currentPageId doesn't exist
    const firstPageId = Object.keys(pages)[0];
    if (firstPageId) {
      finalMain = pages[firstPageId];
    }
  } else if (!finalMain) {
    // Fallback to children if no other content is provided
    finalMain = children;
  }

  // Web variant - iframe only, no header/footer
  if (variant === "web") {
    if (!url) {
      return null;
    }
    return (
      <div className="fixed inset-0 w-full h-full">
        <iframe
          src={url}
          title={webTitle}
          className="w-full h-full border-none"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
        />
      </div>
    );
  }

  // Window variant - uses the Window component
  if (variant === "window") {
    if (!windowTitle || !windowHandleClose) {
      return null;
    }

    return (
      <Window
        title={windowTitle}
        handleClose={windowHandleClose}
        isOpen={windowIsOpen}
        zIndex={windowZIndex}
        onFocus={windowOnFocus ?? (() => {})}
        resetKey={windowResetKey}
      >
        {finalMain}
      </Window>
    );
  }

  // Desktop variant - integrates Explorer functionality
  if (variant === "desktop") {
    const DesktopContent = () => {
      const [searchOpen, setSearchOpen] = useState(false);
      const [windowStates, setWindowStates] = useState<Record<string, boolean>>(
        {},
      );
      const [focusFunctions, setFocusFunctions] = useState<
        Record<string, () => void>
      >({});

      const coreApps: AppDefinition[] = useMemo(
        () => [
          {
            id: "Settings",
            title: "Settings",
            icon: <IconSettings size={32} />,
            Component: Settings,
          },
        ],
        [],
      );

      const allApps = useMemo(
        () => [...coreApps, ...customApps],
        [coreApps, customApps],
      );

      const allAppsWithSearch = useMemo(
        () => [
          {
            id: "Search",
            title: "Search",
            icon: <IconSearch size={32} />,
            Component: () => null,
          },
          ...allApps,
        ],
        [allApps],
      );

      const handleFocusReady = useCallback(
        (fns: Record<string, () => void>) => {
          setFocusFunctions(fns);
        },
        [],
      );

      const openApp = useCallback((id: string) => {
        if (id === "Search") {
          setSearchOpen(true);
        } else {
          setWindowStates((prev) => ({ ...prev, [id]: true }));
        }
      }, []);

      const closeApp = useCallback((id: string) => {
        if (id === "Search") {
          setSearchOpen(false);
        } else {
          setWindowStates((prev) => ({ ...prev, [id]: false }));
        }
      }, []);

      const { hideFooter } = useFooter();
      const { iconSize, showTitle } = useIconSize();

      const size = iconSize === "small" ? "sm" : "md";

      return (
        <>
          <WindowManager
            apps={allApps}
            openStates={windowStates}
            onClose={closeApp}
            onFocusReady={handleFocusReady}
          />

          <Search
            open={searchOpen}
            onClose={() => setSearchOpen(false)}
            appStates={windowStates}
            openApp={openApp}
            focusApp={focusFunctions}
            apps={allApps}
          />

          <Desktop>{mainContent || <DesktopIcons openApp={openApp} />}</Desktop>

          {footerContent || (
            <Footer
              variant={"desktop" as FooterVariant}
              hideByDefault={hideFooter}
            >
              {allAppsWithSearch.map((app) => (
                <AppIcon
                  key={app.id}
                  name={app.title}
                  icon={app.icon}
                  size={size}
                  showTitle={showTitle}
                  onClick={() => openApp(app.id)}
                />
              ))}
            </Footer>
          )}
        </>
      );
    };

    return (
      <ThemeProvider>
        <IconSizeProvider>
          <FooterProvider>
            <WallpaperProvider>
              <DesktopLayoutProvider customApps={customApps}>
                <div className="fixed inset-0 overflow-hidden w-full h-full select-none">
                  {/* Background Image Layer */}
                  {backgroundImage && (
                    <div
                      className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-500"
                      style={{ backgroundImage: `url(${backgroundImage})` }}
                    />
                  )}

                  {/* Background Overlay Layer */}
                  {backgroundOverlay && (
                    <div
                      className={`absolute inset-0 z-0 transition-all duration-500 ${backgroundOverlay}`}
                    />
                  )}

                  <Wallpaper>
                    {headerContent || (
                      <div className="absolute z-50 top-0 w-full flex justify-center pointer-events-none pt-2">
                        <Header
                          variant={"desktop" as HeaderVariant}
                          className="system-overlay-10 w-screen"
                        >
                          <Clock />
                        </Header>
                      </div>
                    )}
                    <DesktopContent />
                  </Wallpaper>
                </div>
              </DesktopLayoutProvider>
            </WallpaperProvider>
          </FooterProvider>
        </IconSizeProvider>
      </ThemeProvider>
    );
  }

  // App variant
  if (variant === "app") {
    return (
      <ThemeProvider>
        <div className="flex flex-col h-screen w-full overflow-hidden text-slate-900 dark:text-slate-100 transition-colors duration-300 shell-bg">
          {finalHeader && (
              <Header variant={finalHeaderVariant}>{finalHeader}</Header>
          )}

          <Main variant={finalMainVariant} isScrollable={finalIsMainScrollable}>
            {finalMain}
          </Main>

          {finalFooter && (
              <Footer variant={finalFooterVariant}>{finalFooter}</Footer>
          )}
        </div>
      </ThemeProvider>
    );
  }

  // Sidebar variant
  if (variant === "sidebar") {
    return (
      <ThemeProvider>
        <div className="flex h-screen w-screen fixed inset-0 overflow-hidden text-slate-900 dark:text-slate-100 transition-colors duration-300 shell-bg">
          {finalSidebar && (
            <div className="h-full flex-shrink-0">
            <Sidebar isScrollable={isSidebarScrollable}>{finalSidebar}</Sidebar>
            </div>
          )}

          <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
            {finalHeader && (
              <Header variant={finalHeaderVariant}>{finalHeader}</Header>
            )}

            <Main
              variant={finalMainVariant}
              isScrollable={finalIsMainScrollable}
            >
              {finalMain}
            </Main>

            {finalFooter && (
              <Footer variant={finalFooterVariant}>{finalFooter}</Footer>
            )}
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Page variant (default)
  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen w-full overflow-hidden text-slate-900 dark:text-slate-100 transition-colors duration-300 shell-bg">
        {finalHeader && (
          <Header variant={finalHeaderVariant}>{finalHeader}</Header>
        )}

        <Main
          key={currentPageId}
          variant={finalMainVariant}
          isScrollable={finalIsMainScrollable}
        >
          {finalMain}
        </Main>

        {finalFooter && (
          <Footer variant={finalFooterVariant}>{finalFooter}</Footer>
        )}
      </div>
    </ThemeProvider>
  );
};

// Create Shell with Item subcomponent
const Shell = ShellComponent as typeof ShellComponent & {
  Item: typeof ShellItem;
};

Shell.Item = ShellItem;

export default Shell;
