import Router from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';
import IUser from '../types/User';
import LoadingPage from './LoadingPage';

const WithAuth = (Child: any) => {
	const AuthenticatedComponent = () => {
		const [cachedUser, setCachedUser] = useState<IUser | null>(null);
		const { user, isLoading } = useContext(UserContext);

		useEffect(() => {
			if (!isLoading) {
				if (!user) {
					console.log('redirecting');
					const redirect = Router.asPath;
					Router.push({
						pathname: '/login',
						query: redirect ? { redirect } : {},
					});
				} else {
					setCachedUser(user);
				}
			}
		}, [user, isLoading]);
		return (
			<>
				{isLoading && !user && <LoadingPage />}
				{cachedUser && <Child user={cachedUser} />}
			</>
		);
	};
	return AuthenticatedComponent;
};

export default WithAuth;
