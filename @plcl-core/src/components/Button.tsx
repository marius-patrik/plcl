import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import { Link as WouterLink } from 'wouter';
import { type StylingProps, getStylingClasses } from '../styles';

/** Button render type - either a button element or a link */
export type ButtonType = 'button' | 'link';

/**
 * Props for the Button component.
 */
export interface ButtonProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'style'>,
		StylingProps {
	/** Render as button or link element */
	as?: ButtonType;
	/** URL for link variant (when as="link") */
	href?: string;
}

/**
 * Button - A versatile button component with glassmorphism styling.
 *
 * Uses StylingProps for consistent styling across all components.
 * Can render as either a button or link element.
 *
 * @example Basic usage
 * ```tsx
 * <Button>Click me</Button>
 * ```
 *
 * @example Primary action button
 * ```tsx
 * <Button style="glass-highlight">Submit</Button>
 * ```
 *
 * @example Unstyled button
 * ```tsx
 * <Button style="unstyled">Plain Button</Button>
 * ```
 *
 * @example Link button
 * ```tsx
 * <Button as="link" href="/settings">Go to Settings</Button>
 * ```
 *
 * @example With size
 * ```tsx
 * <Button size="lg">Large Button</Button>
 * ```
 */
const Button: FC<PropsWithChildren<ButtonProps>> = ({
	style = 'glass',
	as = 'button',
	href = '',
	children,
	className = '',
	id,
	// Styling props
	m,
	mt,
	mb,
	ml,
	mr,
	mx,
	my,
	p,
	pt,
	pb,
	pl,
	pr,
	px,
	py,
	radius,
	shadow,
	size,
	...props
}) => {
	const componentId = id || 'Button';

	// Generate utility classes using StylingProps
	const stylingClasses = getStylingClasses({
		style,
		m,
		mt,
		mb,
		ml,
		mr,
		mx,
		my,
		p,
		pt,
		pb,
		pl,
		pr,
		px,
		py,
		radius,
		shadow,
		size,
	});

	const styles = `${stylingClasses} ${className}`;

	if (as === 'link') {
		return (
			<WouterLink href={href} className={styles} id={componentId}>
				{children}
			</WouterLink>
		);
	}

	return (
		<button type="button" className={styles} id={componentId} {...props}>
			{children}
		</button>
	);
};

export default Button;
