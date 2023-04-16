import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import SWRImmutable from 'swr/immutable';
import gameData from '@/data/gamePlay.json';

const ACHCOUNT = JSON.stringify(gameData).split('achievement').length - 1;

const UserStats = () => {
	const [data, setData] = useState<string | null>(null);
	const {
		data: statsData,
		isLoading: isStatsLoading,
		mutate,
	} = SWRImmutable(data ? `/api/stats/users` : null, async () => {
		const res = await fetch(`/api/stats/users`, {
			headers: {
				'Cache-Control': 'no-cache',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ username: data }),
		});
		if (res.ok) {
			const data = await res.json();
			console.log(data.data);
			if (data.data.length > 10) return data.data.slice(0, 10);
			else return data.data;
		} else if (res.status === 500) {
			toast.error('Server unavailable, please try again later.');
		}
		return null;
	});

	useEffect(() => {
		let temp = setTimeout(() => {
			mutate();
		}, 1000);
		return () => {
			clearTimeout(temp);
		};
	}, [data, mutate]);
	return (
		<div className="w-full flex-grow flex flex-col items-center justify-center gap-2 p-4 glassy z-[4] rounded-3xl h-full">
			<form className="w-1/2 flex text-center items-center justify-center gap-8">
				{`Search:`}
				<input
					type="text"
					onChange={(e) => setData(e.target.value)}
					placeholder="ex: admin"
					className="input"
				/>
			</form>
			{isStatsLoading ? (
				<div>Loading...</div>
			) : (
				statsData &&
				statsData.map((user: any) => {
					return (
						<div key={user.id} className="flex flex-col items-center gap-2">
							<div className="flex flex-row items-center gap-2">
								<div className="text-xl font-bold">{user.username}</div>
								<div className="text-md font-medium">{user.email}</div>
                <div className="text-md font-medium">{user.achievements.length===0?"No Progress": `${((user.achievements.length)/ACHCOUNT)*100}%`}</div>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};

export default UserStats;
