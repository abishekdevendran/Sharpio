import dynamic from 'next/dynamic';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import UserContext from '../contexts/UserContext';
import LogoutButton from './LogoutButton';
import Image from 'next/image';

const BiSun = dynamic(
	() =>
		import('react-icons/bi').then((module) => {
			return module.BiSun;
		}),
	{
		loading: () => <p>Loading...</p>,
	}
);
const BiMoon = dynamic(
	() =>
		import('react-icons/bi').then((module) => {
			return module.BiMoon;
		}),
	{
		loading: () => <p>Loading...</p>,
	}
);

const Navbar = () => {
	const [mounted, setMounted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { theme, setTheme } = useTheme();
	const { user } = useContext(UserContext);
	const themeMenu = useRef<HTMLDivElement>(null);
	const themeMenuButton = useRef<HTMLDivElement>(null);
	const themeHandler = () => {
		// toast.success('Theme changed!');
		switch (theme) {
			case 'pastel':
				setTheme('dark');
				break;
			case 'dark':
				setTheme('valentine');
				break;
			case 'valentine':
				setTheme('night');
				break;
			case 'night':
				setTheme('pastel');
				break;
			default:
				setTheme('pastel');
		}
	};
	const themeIcon = () => {
		switch (theme) {
			case 'pastel':
				return <BiSun size="2rem" />;
			case 'dark':
				return <BiMoon size="2rem" />;
			case 'valentine':
				return <BiSun size="2rem" />;
			case 'night':
				return <BiMoon size="2rem" />;
			default:
				return <BiSun size="2rem" />;
		}
	};

	useEffect(() => setMounted(true), []);
	useEffect(() => {
		if (!isOpen) {
			(document.activeElement as HTMLElement).blur();
		} else if (isOpen && !themeMenu.current?.contains(document.activeElement)) {
			setIsOpen(false);
		}
	}, [isOpen]);
	return (
		<div className="navbar glassy fixed z-[2] top-0 left-0 right-0 mx-auto w-[98%] bg-base-300 px-8 rounded-full mt-2">
			<div className="flex-1 -ml-2">
				<Link className="btn btn-ghost normal-case" href={'/'}>
					<h1 className="text-4xl font-black tracking-tight">Sharpio</h1>
				</Link>
			</div>
			<div className="flex-none">
				<div onClick={themeHandler}>
					{mounted && (
						<div
							className="tooltip tooltip-left tooltip-success w-10 flex justify-center cursor-pointer hover:scale-110"
							data-tip={theme}
						>
							{themeIcon()}
						</div>
					)}
				</div>
				{user && (
					<div
						className="dropdown dropdown-end ml-4 hover:scale-105"
						ref={themeMenu}
					>
						<div
							tabIndex={0}
							className="btn btn-ghost btn-circle avatar select-none"
							ref={themeMenuButton}
							onBlur={(e) => {
								setIsOpen(false);
							}}
							onClick={(e) => {
								if (isOpen) {
									setIsOpen(false);
								} else {
									setIsOpen(true);
								}
							}}
						>
							<div className="w-10 rounded-full">
								<Image
									src="/defaultAvatar.jpg"
									alt="avatar"
									fill
									className="rounded-full"
								/>
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li className="justify-between">
								<Link href="/dashboard">Achievements</Link>
							</li>
							<li className="justify-between">
								<Link href="/">Home</Link>
							</li>
							<li>
								<LogoutButton />
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
