import type { FC, HTMLAttributes } from 'react';
import { type StylingProps, getStylingClasses } from '../styles';

export type KbdVariant = 'default' | 'unstyled';

export interface KbdProps extends Omit<HTMLAttributes<HTMLElement>, 'style'>, StylingProps {
	variant?: KbdVariant;
}

const Kbd: FC<KbdProps> = ({
	children,
	className = '',
	id,
	variant = 'default',
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
	const componentId = id || 'Kbd';
	const isDefault = variant === 'default';

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
		radius: isDefault ? radius || 'xl' : radius,
		shadow,
	});

	let sizeClass = '';
	let styledClasses = '';

	if (isDefault) {
		sizeClass = 'text-xs px-1.5 py-0.5';
		if (size === 'xs') sizeClass = 'text-[10px] px-1 py-0';
		if (size === 'lg') sizeClass = 'text-sm px-2 py-1';

		styledClasses = `font-mono font-semibold 
                bg-zinc-100 dark:bg-zinc-800 
                border-b-2 border-zinc-300 dark:border-zinc-600 
                text-zinc-700 dark:text-zinc-300
                rounded-md`;
	}

	return (
		<kbd
			id={componentId}
			className={`${styledClasses} ${sizeClass} ${stylingClasses} ${className}`.trim()}
			{...props}
		>
			{children}
		</kbd>
	);
};

export default Kbd;
