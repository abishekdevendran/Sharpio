import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, loginFormSchemaType } from '@/schemas/loginSchema';
import { toast } from 'react-hot-toast';
import CryptoJS from 'crypto-js';
import Router, { useRouter } from 'next/router';
import UserContext from '@/contexts/UserContext';
import LoadingPage from '@/components/LoadingPage';
import Page from '@/components/Page';

const AdminPanel = () => {
	const secretKey = process.env.NEXT_PUBLIC_COUPLING_SECRET;
	const [interactive, setInteractive] = useState(true);
	const { mutate, user, isLoading } = useContext(UserContext);
	const { isReady } = useRouter();

	useEffect(() => {
		if (isReady) {
			if (!user) {
				Router.push('/adminPanel/login');
			} else {
				if (!user.isAdmin) {
					// TODO: add feature here
					toast.error(
						'You are not an admin! But for your curiosity, you get an additional clue:',
						{
							id: 'adminPanelRedirect',
						}
					);
					console.log(user, isReady);
					Router.push('/game');
				}
			}
		}
	}, [user, isReady]);
	if (isLoading) return <LoadingPage />;
	return (
		<Page title="Admin Panel">
			<h1>Admin Panel</h1>
		</Page>
	);
};

export default AdminPanel;
