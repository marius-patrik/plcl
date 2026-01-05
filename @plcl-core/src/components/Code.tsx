import type { FC, HTMLAttributes } from 'react';
import { type StylingProps, getStylingClasses } from '../styles';

export type CodeVariant = 'default' | 'unstyled';

export interface CodeProps extends Omit<HTMLAttributes<HTMLElement>, 'style'>, StylingProps {
	block?: boolean;
	color?: string; // 'blue', 'pink' etc - subtle background
	variant?: CodeVariant;
}

const Code: FC<CodeProps> = ({
	block,
	color = 'zinc',
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
	const componentId = id || 'Code';
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

	// Default padding if not provided should be small for inline (only when styled)
	const paddingClass =
		!isDefault || p || px || py || pt || pb || pl || pr
			? ''
			: block
				? 'p-3'
				: 'px-1.5 py-0.5';

	// Only apply background/border if using default variant
	const colorClass = isDefault
		? block
			? 'bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700'
			: 'bg-zinc-100 dark:bg-zinc-800'
		: '';

	// Only apply font styling when using default variant
	const fontClass = isDefault ? 'font-mono text-sm' : '';

	return (
		<code
			id={componentId}
			className={`${fontClass} ${block && isDefault ? 'block w-full overflow-x-auto' : isDefault ? 'inline-block' : ''} ${colorClass} ${paddingClass} ${stylingClasses} ${className}`.trim()}
			{...props}
		>
			{children}
		</code>
	);
};

export default Code;
