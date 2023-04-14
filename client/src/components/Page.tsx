import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import Head from 'next/head';

interface IProps extends ComponentPropsWithoutRef<'main'> {
	title: string;
	className?: string;
}

const Page = ({
	title,
	children,
	className,
	...props
}: PropsWithChildren<IProps>) => {
	return (
		<div
			{...props}
			className={`Page w-full min-h-full flex items-center justify-center select-none ${
				className ? className : ''
			}`}
		>
			<Head>
				<title>{`Sharpio || ${title}`}</title>
			</Head>
			{children}
		</div>
	);
};

export default Page;
