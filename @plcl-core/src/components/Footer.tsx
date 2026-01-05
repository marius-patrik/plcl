import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { useState } from 'react';
import Box from './Box';

/**
 * Footer layout variants.
 * - `app` - Fixed mobile dock at bottom of screen
 * - `desktop` - Floating dock with optional auto-hide
 * - `page` - Standard footer for page layouts
 * - `sidebar` - Footer for sidebar layouts
 */
export type FooterVariant = 'app' | 'desktop' | 'page' | 'sidebar';

/**
 * Props for the Footer component.
 */
export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
	/** Whether to hide the footer by default (hover to reveal) */
	hideByDefault?: boolean;
	/** Layout variant to use */
	variant?: FooterVariant;
}

/**
 * Footer - A layout component for application footers and docks.
 *
 * Supports multiple variants including a desktop dock that can auto-hide and
 * reveal on hover. The desktop variant provides a macOS-like dock experience.
 *
 * @example Desktop dock
 * ```tsx
 * <Footer variant="desktop">
 *   <AppIcon name="Settings" icon={<IconSettings />} />
 *   <AppIcon name="Files" icon={<IconFolder />} />
 * </Footer>
 * ```
 *
 * @example Auto-hiding dock
 * ```tsx
 * <Footer variant="desktop" hideByDefault>
 *   <AppIcon name="Settings" icon={<IconSettings />} />
 * </Footer>
 * ```
 *
 * @example Page footer
 * ```tsx
 * <Footer variant="page">
 *   <p>© 2024 My App</p>
 * </Footer>
 * ```
 */
const Footer: FC<PropsWithChildren<FooterProps>> = ({
	hideByDefault = false,
	variant = 'desktop',
	children,
	className = '',
	...props
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const { style: _style, ...restProps } = props as any;

	if (variant === 'page' || variant === 'sidebar') {
		return (
			<div className={`w-full variant-glass p-4 ${className}`} {...props}>
				<div className="container mx-auto max-w-7xl">{children}</div>
			</div>
		);
	}

	if (variant === 'app') {
		return (
			<Box
				style="glass"
				radius="full"
				p="sm"
				px="lg"
				className={`fixed bottom-2 left-1/2 -translate-x-1/2 z-50 md:invisible flex flex-row gap-3 ${className}`}
				{...restProps}
			>
				{children}
			</Box>
		);
	}

	// Desktop variant
	if (hideByDefault) {
		return (
			<>
				{/* Invisible hover trigger zone at the bottom of the screen */}
				<div
					className="fixed bottom-0 left-0 right-0 h-8 z-40"
					onMouseEnter={() => setIsHovered(true)}
				/>
				{/* Footer that appears on hover */}
				<Box
					style="glass"
					radius="2xl"
					p="sm"
					className={`system-overlay-50 bottom-2 max-w-[95vw] left-1/2 -translate-x-1/2 flex flex-row gap-3 overflow-x-auto transition-all duration-300 ${
						isHovered
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-full pointer-events-none'
					} ${className}`}
					onMouseLeave={() => setIsHovered(false)}
					{...restProps}
				>
					{children}
				</Box>
			</>
		);
	}

	return (
		<Box
			style="glass"
			radius="2xl"
			p="sm"
			className={`system-overlay-50 bottom-2 max-w-[95vw] left-1/2 -translate-x-1/2 flex flex-row gap-3 overflow-x-auto ${className}`}
			{...restProps}
		>
			{children}
		</Box>
	);
};

export default Footer;
