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
				<div className="p-20 rounded-lg z-[2] glassy">
					<div className="hero">
						<div className="hero-content text-center">
							<div className="max-w-md">
								<h1 className="text-5xl font-bold">Hello there</h1>
								<p className="py-6">
									Provident cupiditate voluptatem et in. Quaerat fugiat ut
									assumenda excepturi exercitationem quasi. In deleniti eaque
									aut repudiandae et a id nisi.
								</p>

								<div className="flex flex-row gap-4 justify-center items-center mt-8">
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
