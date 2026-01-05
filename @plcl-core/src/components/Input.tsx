import type { FC, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { type StylingProps, getStylingClasses } from '../styles';

/**
 * Props for the Input component.
 */
export interface InputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'style'>,
		StylingProps {
	/** Visual style variant */
	variant?: 'filled' | 'unstyled';
	/** Error state - can be boolean or error message */
	error?: boolean | ReactNode;
	/** Content to render on the left side of the input */
	leftSection?: ReactNode;
	/** Content to render on the right side of the input */
	rightSection?: ReactNode;
	/** Props to pass to the wrapper div */
	wrapperProps?: InputHTMLAttributes<HTMLDivElement>;
}

/**
 * Input - A text input component with optional left/right sections.
 *
 * Features include:
 * - Left and right sections for icons or actions
 * - Error state styling
 * - Multiple sizes (xs, sm, md, lg, xl)
 * - Filled or unstyled variants
 * - Full StylingProps support
 *
 * @example Basic input
 * ```tsx
 * <Input placeholder="Enter text..." />
 * ```
 *
 * @example Input with icon
 * ```tsx
 * <Input
 *   leftSection={<IconSearch size={16} />}
 *   placeholder="Search..."
 * />
 * ```
 *
 * @example Input with error
 * ```tsx
 * <Input error="This field is required" />
 * ```
 *
 * @example Different sizes
 * ```tsx
 * <Input size="sm" placeholder="Small" />
 * <Input size="lg" placeholder="Large" />
 * ```
 */
const Input: FC<InputProps> = ({
	variant = 'filled',
	error,
	leftSection,
	rightSection,
	className = '',
	wrapperProps,
	disabled,
	id,
	// Styling props
	style = 'unstyled',
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
	const componentId = id || 'Input';
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
		radius: radius || 'xl',
		shadow,
	});

	// Size defaults
	let heightClass = 'h-10 text-sm';
	if (size === 'xs') heightClass = 'h-8 text-xs';
	if (size === 'sm') heightClass = 'h-9 text-sm';
	if (size === 'md') heightClass = 'h-10 text-sm';
	if (size === 'lg') heightClass = 'h-12 text-base';
	if (size === 'xl') heightClass = 'h-14 text-lg';

	const baseInputStyles = `
        w-full bg-transparent border-0 outline-none focus:ring-0 px-0
        placeholder:text-zinc-400 dark:placeholder:text-zinc-500
        disabled:cursor-not-allowed disabled:opacity-50
    `;

	// Container styles
	const containerBase = `
        relative flex items-center transition-colors
        bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700
        focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500
        overflow-hidden
    `;

	const errorClasses = error
		? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500 text-red-900 dark:text-red-100'
		: '';

	const disabledClasses = disabled
		? 'bg-zinc-50 dark:bg-zinc-900 opacity-60 cursor-not-allowed'
		: '';

	return (
		<div
			id={componentId}
			className={`${variant === 'unstyled' ? '' : containerBase} ${variant === 'unstyled' ? '' : stylingClasses} ${errorClasses} ${disabledClasses} ${variant === 'unstyled' ? '' : heightClass} ${className} ${variant === 'unstyled' ? 'relative' : 'px-3'}`}
			{...(wrapperProps as HTMLAttributes<HTMLDivElement>)}
		>
			{leftSection && (
				<div className="mr-2 text-zinc-500 flex items-center h-full select-none">
					{leftSection}
				</div>
			)}

			<input
				className={`${baseInputStyles} ${variant === 'unstyled' ? stylingClasses : ''} ${variant === 'unstyled' ? heightClass : 'h-full'}`}
				disabled={disabled}
				{...props}
			/>

			{rightSection && (
				<div className="ml-2 text-zinc-500 flex items-center h-full select-none">
					{rightSection}
				</div>
			)}
		</div>
	);
};

export default Input;
