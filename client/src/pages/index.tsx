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
				<div className="card p-24 rounded-3xl drop-shadow-xl bg-base-200">
					<div className="hero">
						<div className="hero-content text-center">
							<div className="max-w-md">
								<h1 className="text-5xl font-bold">Hello there</h1>
								<p className="py-6">
									Provident cupiditate voluptatem et in. Quaerat fugiat ut
									assumenda excepturi exercitationem quasi. In deleniti eaque
									aut repudiandae et a id nisi.
								</p>

								{!user ? (
									<Link
										href="/login"
										className="btn btn-primary hover:scale-110"
									>
										Login
									</Link>
								) : (
									<Link
										href="/game"
										className="btn btn-primary hover:scale-110"
									>
										Continue solving
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			</Page>
		);
}
