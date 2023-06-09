import { createContext, useEffect, useState } from 'react';
import type { TUser } from '../types/types';
import SWRImmutable from 'swr/immutable';
import type { KeyedMutator } from 'swr';
import { toast } from 'react-hot-toast';

type UserContextType = {
	user: TUser | null;
	mutate: KeyedMutator<any>;
	isLoading: boolean;
};

export const UserContext = createContext<UserContextType>({
	user: null,
	mutate: null as unknown as KeyedMutator<any>,
	isLoading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [initUser, setInitUser] = useState(false);
	const {
		data: user,
		mutate,
		isLoading,
	} = SWRImmutable(
		'/api/user',
		async () => {
			const res = await fetch('/api/user', {
				// no cache
				headers: {
					'Cache-Control': 'no-cache',
				},
			});
			if (res.ok) {
				const data = await res.json();
				console.log(data);
				return data.user;
			} else if (res.status === 500) {
				toast.error('Server unavailable, please try again later.');
			}
			return null;
		},
		{
			revalidateOnFocus: true,
		}
	);

	useEffect(() => {
		if (!initUser && user) {
			toast.success(`Welcome back, ${user.username}!`);
			setInitUser(true);
		}
	}, [initUser, user]);

	return (
		<UserContext.Provider value={{ user, mutate, isLoading }}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContext;
