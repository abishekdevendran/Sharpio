import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Router, { useRouter } from 'next/router';
import SWRImmutable from 'swr/immutable';
import UserContext from '@/contexts/UserContext';
import LoadingPage from '@/components/LoadingPage';
import Page from '@/components/Page';
import {
	BarChart,
	Bar,
	XAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import UserStats from '@/components/UserStats';

const AdminPanel = () => {
	const { mutate, user, isLoading } = useContext(UserContext);
	const { isReady } = useRouter();
	// const [data, setData] = useState<any>(null);

	const { data, isLoading: isStatsLoading } = SWRImmutable(
		isReady && user && user.isAdmin ? '/api/stats' : null,
		async () => {
			const res = await fetch('/api/stats', {
				// no cache
				headers: {
					'Cache-Control': 'no-cache',
				},
			});
			if (res.ok) {
				const data = await res.json();
				console.log(data.data);
				return data.data;
			} else if (res.status === 500) {
				toast.error('Server unavailable, please try again later.');
			}
			return null;
		},
		{ revalidateOnFocus: true }
	);
	// async function statsFetcher() {
	// 	try {
	// 		const response = await fetch('/api/stats', {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 		});
	// 		if (!response.ok) {
	// 			if (response.status === 500) {
	// 				toast.error(
	// 					'Server temporarily unavailable. Please try again later.'
	// 				);
	// 				return;
	// 			}
	// 			const result = await response.json();
	// 			console.error(result);
	// 			toast.error(result.message);
	// 			return;
	// 		}
	// 		const result = await response.json();
	// 		setData(result);
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// }
	useEffect(() => {
		async function achievementHandler() {
			//check if user already has achievement
			if (user?.achievements.includes('admin')) {
				toast.error('Do not push your luck buddy.');
				return;
			}
			try {
				const response = await fetch('/api/user/newAchievement', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ achievement: 'Hackerman' }),
				});
				if (!response.ok) {
					if (response.status === 500) {
						toast.error(
							'Server temporarily unavailable. Please try again later.'
						);
						return;
					}
					const result = await response.json();
					console.error(result);
					toast.error(result.message);
					return;
				}
				const result = await response.json();
				toast.success('Achievement Unlocked: Hackerman');
				//update local user
				await mutate();
			} catch (e) {
				console.log(e);
			}
		}

		if (isReady) {
			if (!user) {
				Router.push('/adminPanel/login');
			} else {
				if (!user.isAdmin) {
					achievementHandler();
					Router.push('/game');
				}
			}
		}
	}, [user, isReady, mutate]);
	if (isLoading || !isReady || isStatsLoading) return <LoadingPage />;
	return (
		<Page title="Admin Panel">
			<div className="glassy w-[98%] flex flex-col gap-2 p-4 items-center justify-center mt-20 mb-8 rounded-3xl mx-auto">
				<h1 className="text-4xl font-bold text-center">Admin Panel</h1>
				<div className="w-full flex-grow flex flex-col items-center justify-center gap-2 p-4 glassy z-[4] rounded-3xl">
					<div className="barContainer w-full flex-grow flex items-center justify-center gap-2 p-4 glassy z-[4] rounded-3xl h-full">
						{isStatsLoading ? (
							'Loading...'
						) : (
							<ResponsiveContainer width="100%" height={500}>
								<BarChart data={data}>
									<CartesianGrid strokeDasharray="3 3" />
									<Legend />
									<XAxis
										dataKey="name"
										style={{
											fontSize: '0.8rem',
										}}
									/>
									<Tooltip />
									<Bar dataKey="value" fill="rgba(136, 132, 216, 0.7)" />
								</BarChart>
							</ResponsiveContainer>
						)}
					</div>
					<UserStats />
				</div>
			</div>
		</Page>
	);
};

export default AdminPanel;
