import LoadingPage from '@/components/LoadingPage';
import WithAuth from '@/components/WithAuth';
import useUser from '@/hooks/useUser';

const Achievements = () => {
	const { user, isLoading } = useUser();
	if (isLoading) return <LoadingPage />;
	if (!user?.achievements || user.achievements.length === 0)
		return <p>You have no achievements yet!</p>;
	return (
		<div className="card glassy p-4 mt-32 mb-12">
			<h1 className="text-4xl font-bold text-center mb-8">Achievements</h1>
			<ul>
				{user.achievements.map((achievement) => (
					<li
						key={achievement}
						className="glassy p-4 rounded-full my-2 text-center hover:scale-105"
					>
						{achievement}
					</li>
				))}
			</ul>
		</div>
	);
};

export default WithAuth(Achievements);
