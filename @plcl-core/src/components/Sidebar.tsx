import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
	isScrollable?: boolean;
}

const Sidebar: FC<PropsWithChildren<SidebarProps>> = ({
	children,
	className = '',
	isScrollable = true,
	...props
}) => {
	return (
		<aside
			className={`w-64 h-full variant-glass flex flex-col ${
				isScrollable ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden'
			} ${className}`}
			style={{ maxHeight: '100vh' }}
			{...props}
		>
			{children}
		</aside>
	);
};

export default Sidebar;
