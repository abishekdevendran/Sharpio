import React, { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const Layout = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	return (
		<>
			<Navbar />
			<AnimatePresence
				initial={false}
				mode="popLayout"
				onExitComplete={() => window.scrollTo(0, 0)}
			>
				<motion.main
					initial={{ x: '-100%' }}
					animate={{ x: 0 }}
					exit={{ x: '100%' }}
					className="motionMain page w-full min-h-screen flex items-center justify-center overflow-hidden"
					transition={{
						type: 'spring',
						duration: 0.5,
					}}
					key={router.asPath}
				>
					{children}
				</motion.main>
			</AnimatePresence>
		</>
	);
};

export default Layout;
