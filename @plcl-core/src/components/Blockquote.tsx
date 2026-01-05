import type { BlockquoteHTMLAttributes, FC, ReactNode } from 'react';
import { type StylingProps, getStylingClasses } from '../styles';

export type BlockquoteVariant = 'default' | 'unstyled';

export interface BlockquoteProps
	extends Omit<BlockquoteHTMLAttributes<HTMLQuoteElement>, 'style'>,
		StylingProps {
	icon?: ReactNode;
	cite?: string;
	color?: string;
	variant?: BlockquoteVariant;
}

const Blockquote: FC<BlockquoteProps> = ({
	icon,
	cite,
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
	const componentId = id || 'Blockquote';
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

	// Use padding default only when styled
	const paddingClass =
		!isDefault || p || px || py || pt || pb || pl || pr ? '' : 'p-8';

	const bgClass = isDefault ? 'bg-zinc-50 dark:bg-zinc-900' : '';

	return (
		<blockquote
			id={componentId}
			className={`relative ${bgClass} ${paddingClass} ${stylingClasses} ${className}`.trim()}
			{...props}
		>
			{icon && isDefault && (
				<div className="absolute top-0 left-0 -translate-y-1/2 translate-x-4 bg-white dark:bg-zinc-800 p-2 rounded-full shadow-sm text-zinc-400">
					{icon}
				</div>
			)}

			{isDefault ? (
				<div className="text-lg italic text-zinc-900 dark:text-zinc-100 leading-relaxed">
					{children}
				</div>
			) : (
				children
			)}

			{cite && isDefault && (
				<footer className="mt-3 text-sm text-zinc-500 font-semibold">
					— {cite}
				</footer>
			)}
		</blockquote>
	);
};

export default Blockquote;
