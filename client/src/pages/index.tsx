import { useContext } from 'react';
import Page from '../components/Page';
import UserContext from '../contexts/UserContext';
import Link from 'next/link';
import LoadingPage from '../components/LoadingPage';

export default function Home() {
	const { user, isLoading } = useContext(UserContext);
	if (isLoading) return <LoadingPage />;
	else
		return (
			<Page title="Main">
				<div className="p-10 rounded-lg z-[2] glassy mx-8">
					<div className="hero">
						<div className="hero-content text-center">
							<div className="max-w-xl">
								<h1 className="text-5xl font-bold">Hello there</h1>
								<p className="py-6 text-justify">
									{`Welcome to this text-based virtual adventure. You will be put in situations (sometimes purely randomly), with a timer going off. Be quick on your feet and make the right decisions. Unlike the traditional treasure hunt, the "treasure" here is ultimately up to your interpretation (and mine, the gameMaster's :P). As long as you're making progress, you're winning!.`}
								</p>
								<p className="py-6 text-center">{`The theme for the game is "Progress. Good Luck!"`}</p>
								<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
									{!user ? (
										<Link
											href="/login"
											className="btn btn-primary disabled:btn-disabled btn-md lg:btn-lg"
										>
											Login
										</Link>
									) : (
										<Link
											href="/game"
											className="btn btn-primary disabled:btn-disabled btn-md lg:btn-lg"
										>
											Continue solving
										</Link>
									)}
									{user?.isAdmin && (
										<Link
											href="/adminPanel"
											className="btn btn-outline disabled:btn-disabled btn-md lg:btn-lg"
										>
											Go to Admin Panel
										</Link>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Page>
		);
}
