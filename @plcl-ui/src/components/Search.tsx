import type { AppDefinition } from "@plcl/ui-types";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

/**
 * Props for the Search component.
 */
interface SearchProps {
  /** Whether the search overlay is open */
  open: boolean;
  /** Callback to close the search overlay */
  onClose: () => void;
  /** Map of app IDs to their open state */
  appStates: Record<string, boolean>;
  /** Callback to open an app by ID */
  openApp: (id: string) => void;
  /** Map of app IDs to their focus functions */
  focusApp: Record<string, () => void>;
  /** List of available apps to search */
  apps: AppDefinition[];
}

/**
 * Search - A spotlight-style search overlay for finding and launching apps.
 *
 * The Search component provides a quick way to find and launch applications
 * in the desktop environment. Features include:
 *
 * - Real-time filtering as you type
 * - Shows running state for open apps
 * - Click to open new app or focus existing window
 * - Escape key to close
 * - Backdrop click to close
 *
 * This component is used internally by Shell's desktop variant.
 *
 * @example
 * ```tsx
 * <Search
 *   open={searchOpen}
 *   onClose={() => setSearchOpen(false)}
 *   appStates={windowStates}
 *   openApp={openApp}
 *   focusApp={focusFunctions}
 *   apps={allApps}
 * />
 * ```
 */
export const Search = ({
  open,
  onClose,
  appStates,
  openApp,
  focusApp,
  apps,
}: SearchProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const filteredApps = apps.filter((app) =>
    app.title.toLowerCase().includes(query.toLowerCase()),
  );

  const handleAppClick = (appId: string) => {
    if (appStates[appId]) {
      focusApp[appId]?.();
    } else {
      openApp(appId);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 pointer-events-auto">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-default"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      />

      {/* Search Panel */}
      <div className="relative glass rounded-2xl p-4 w-full max-w-lg mx-4 animate-scale-in">
        {/* Search Input */}
        <div className="flex items-center gap-3 mb-4">
          <IconSearch size={24} className="opacity-70" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search apps..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-lg focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Results */}
        <div className="space-y-1 max-h-80 overflow-y-auto">
          {filteredApps.length === 0 ? (
            <div className="text-center py-8 opacity-50">No apps found</div>
          ) : (
            filteredApps.map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => handleAppClick(app.id)}
                className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/10 transition-colors text-left"
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  {app.icon}
                </div>
                <div>
                  <div className="font-medium">{app.title}</div>
                  {appStates[app.id] && (
                    <div className="text-xs opacity-50">Running</div>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
