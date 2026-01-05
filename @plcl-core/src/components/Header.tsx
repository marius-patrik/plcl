import { IconMoon, IconSun } from '@tabler/icons-react';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../hooks/useTheme';
import Button from './Button';

/**
 * Header layout variants.
 * - `app` - Fixed header for mobile app layouts
 * - `desktop` - Glass-styled header for desktop environments
 * - `page` - Sticky header for page layouts
 * - `sidebar` - Sticky header for sidebar layouts
 */
export type HeaderVariant = 'app' | 'desktop' | 'page' | 'sidebar';

/**
 * Props for the Header component.
 */
export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
	/** Layout variant to use */
	variant?: HeaderVariant;
	/** Whether to show the dark mode toggle button */
	showDarkModeToggle?: boolean;
}

/**
 * Header - A layout component for application headers with theme toggle support.
 *
 * Automatically integrates with ThemeProvider when available to provide a theme
 * toggle button. Supports multiple layout variants for different use cases.
 *
 * @example Basic header
 * ```tsx
 * <Header>
 *   <Logo />
 *   <Navigation />
 * </Header>
 * ```
 *
 * @example Desktop header
 * ```tsx
 * <Header variant="desktop">
 *   <Clock />
 * </Header>
 * ```
 *
 * @example Without theme toggle
 * ```tsx
 * <Header showDarkModeToggle={false}>
 *   <Navigation />
 * </Header>
 * ```
 */
const Header: FC<PropsWithChildren<HeaderProps>> = ({
	children,
	className = '',
	variant = 'desktop',
	showDarkModeToggle = true,
	...props
}) => {
	// Use theme context if available (returns undefined if not wrapped in ThemeProvider)
	const themeContext = useContext(ThemeContext);
	const canShowToggle = showDarkModeToggle && themeContext;

	const baseStyles = 'w-full flex flex-row gap-2 px-1 pointer-events-auto';

	const variantStyles = {
		app: 'invisible md:h-auto md:visible p-2 gap-2 flex flex-row justify-items-start items-center fixed z-50',
		desktop: 'system-overlay-10 glass',
		page: 'sticky top-0 z-40 variant-glass',
		sidebar: 'sticky top-0 z-40 variant-glass',
	};

	const handleThemeToggle = () => {
		if (!themeContext) return;
		const { theme, setTheme } = themeContext;
		if (theme === 'dark') {
			setTheme('light');
		} else if (theme === 'light') {
			setTheme('system');
		} else {
			setTheme('dark');
		}
	};

	return (
		<div
			className={`${baseStyles} ${variantStyles[variant]} ${className}`}
			{...props}
		>
			{children}
			{canShowToggle && (
				<div className="ml-auto">
					<Button
						style="unstyled"
						onClick={handleThemeToggle}
						title={
							themeContext.theme === 'dark'
								? 'Dark mode (click for light)'
								: themeContext.theme === 'light'
									? 'Light mode (click for system)'
									: 'System mode (click for dark)'
						}
						className="p-2"
					>
						{themeContext.isDark ? (
							<IconMoon size={20} />
						) : (
							<IconSun size={20} />
						)}
					</Button>
				</div>
			)}
		</div>
	);
};

export default Header;
