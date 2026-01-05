import type { ElementType, FC, HTMLAttributes, ReactNode } from 'react';
import { type StylingProps, getStylingClasses } from '../styles';

export type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;
export type TitleVariant = 'default' | 'unstyled';

export interface TitleProps
	extends Omit<HTMLAttributes<HTMLHeadingElement>, 'style'>,
		StylingProps {
	order?: TitleOrder;
	variant?: TitleVariant;
}

const Title: FC<TitleProps> = ({
	order = 1,
	children,
	className = '',
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

	const Component = `h${order}` as ElementType;

	const isDefault = variant === 'default';

	let sizeClass = '';
	let colorClass = '';

	if (isDefault) {
		// Mantine defaults: h1=34px, h2=26px, h3=22px, h4=18px, h5=16px, h6=14px
		if (order === 1) sizeClass = 'text-4xl font-bold tracking-tight'; // ~36px
		if (order === 2) sizeClass = 'text-3xl font-bold tracking-tight'; // ~30px
		if (order === 3) sizeClass = 'text-2xl font-bold'; // ~24px
		if (order === 4) sizeClass = 'text-xl font-bold'; // ~20px
		if (order === 5) sizeClass = 'text-lg font-bold'; // ~18px
		if (order === 6) sizeClass = 'text-base font-bold'; // ~16px
		colorClass = 'text-zinc-900 dark:text-zinc-100';
	}

	return (
		<Component
			className={`${sizeClass} ${colorClass} ${stylingClasses} ${className}`.trim()}
			{...props}
		>
			{children}
		</Component>
	);
};

export default Title;
