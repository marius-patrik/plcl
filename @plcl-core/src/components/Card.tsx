import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { type StylingProps, getStylingClasses } from '../styles';
import Text from './Text';

/**
 * Props for the Card component.
 */
export interface CardProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'style'>,
		StylingProps {
	/** Content to display in the card header */
	header?: React.ReactNode;
	/** Content to display in the card footer */
	footer?: React.ReactNode;
}

/**
 * Card - A container component with glassmorphism styling and optional header/footer.
 *
 * Cards provide a way to group related content with consistent styling. They support
 * optional header and footer sections, multiple visual variants, and full StylingProps.
 *
 * @example Basic card
 * ```tsx
 * <Card>
 *   <p>Card content goes here</p>
 * </Card>
 * ```
 *
 * @example Card with header and footer
 * ```tsx
 * <Card header="Title" footer={<Button>Action</Button>}>
 *   <p>Card content</p>
 * </Card>
 * ```
 *
 * @example Outlined card
 * ```tsx
 * <Card style="outline" p="lg">
 *   <p>Outlined card</p>
 * </Card>
 * ```
 */
const Card: FC<PropsWithChildren<CardProps>> = ({
	header,
	footer,
	children,
	className = '',
	id,
	// Styling props
	style = 'glass',
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
	const componentId = id || 'Card';
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
	});

	// Handle size for Card if needed (e.g., padding/spacing scale)
	// Default padding is p-3 gap-2.
	// If size is provided, we can scale these.
	// Skip default padding for unstyled style
	let sizeClasses = '';
	if (size && style !== 'unstyled') {
		if (size === 'xs') sizeClasses = 'p-1 gap-1 text-xs';
		if (size === 'sm') sizeClasses = 'p-2 gap-1.5 text-sm';
		if (size === 'md') sizeClasses = 'p-3 gap-2 text-base';
		if (size === 'lg') sizeClasses = 'p-4 gap-3 text-lg';
		if (size === 'xl') sizeClasses = 'p-6 gap-4 text-xl';

		// Override with specific p props if present
		if (p || px || py || pt || pb || pl || pr) {
			sizeClasses = sizeClasses.replace(/p-\S+/g, '');
		}
	}

	const defaultPadding =
		style !== 'unstyled' &&
		!size &&
		!p &&
		!px &&
		!py &&
		!pt &&
		!pb &&
		!pl &&
		!pr
			? 'p-3 gap-2'
			: '';

	return (
		<div
			id={componentId}
			className={`${stylingClasses} ${style !== 'unstyled' ? sizeClasses : ''} ${defaultPadding} flex flex-col ${className}`}
			{...props}
		>
			{header && (
				<Text
					variant="text"
					size="lg"
					align="center"
					className="mx-auto font-medium p-2"
				>
					{header}
				</Text>
			)}
			<div className="flex flex-col gap-2">{children}</div>
			{footer && (
				<div className="flex flex-col gap-2 md:flex-wrap">{footer}</div>
			)}
		</div>
	);
};

export default Card;
