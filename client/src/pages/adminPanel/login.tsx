import LoadingPage from '@/components/LoadingPage';
import Page from '@/components/Page';
import UserContext from '@/contexts/UserContext';
import { loginFormSchema, loginFormSchemaType } from '@/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Router, { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import CryptoJS from 'crypto-js';

const AdminLogin = () => {
	const secretKey = process.env.NEXT_PUBLIC_COUPLING_SECRET;
	const [interactive, setInteractive] = useState(true);
	const { mutate, user, isLoading } = useContext(UserContext);
	const router = useRouter();
	const { query, isReady } = router;
	useEffect(() => {
		if (isReady) {
			if (user && user.isAdmin) {
				if (query.redirect) {
					// console.log(query.redirect);
					router.push(query.redirect as string);
					return;
				}
				router.push('/adminPanel');
			}
		}
	}, [user, isReady, query, router]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<loginFormSchemaType>({
		resolver: zodResolver(loginFormSchema),
	});

	const submitHandler = async (data: loginFormSchemaType) => {
		setInteractive(false);
		console.log(data);
		//encrypt password
		data.password = CryptoJS.AES.encrypt(data.password, secretKey!).toString();
		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				if (response.status === 500) {
					toast.error(
						'Server temporarily unavailable. Please try again later.'
					);
					setInteractive(true);
					return;
				}
				const result = await response.json();
				console.error(result);
				toast.error(result.message);
				setInteractive(true);
			} else {
				toast.success('Login successful. Redirecting...');
				mutate();
			}
		} catch (error) {
			console.error(error);
			setInteractive(true);
		}
	};
	if (isLoading) return <LoadingPage />;
	return (
		<Page title="Login">
			<div className="card lg:card-side bg-base-300 shadow-xl flex items-center justify-center">
				<h2 className="lg:-rotate-90 card-title  text-7xl lg:text-8xl lg:-mx-12 font-extrabold mt-8 lg:opacity-75 lg:mb-6 pointer-events-none">
					Login
				</h2>
				<div className="card-body w-96 flex items-center pb-12 px-8">
					<form
						onSubmit={handleSubmit(submitHandler)}
						className="form-control w-full"
					>
						<fieldset
							disabled={!interactive}
							className="form-control w-full flex items-center justify-center"
						>
							<p className="label text-lg mt-4">Username:</p>
							<input
								{...register('username')}
								type="text"
								className="input w-full"
							/>
							<p>{errors.username?.message}</p>
							<p className="label text-lg mt-4">Password:</p>
							<input
								{...register('password')}
								type="password"
								className="input w-full"
							/>
							<p>{errors.password?.message}</p>
							<span className="w-full grid grid-cols-2 gap-x-4 mt-4">
								<button
									type="submit"
									className="btn btn-primary disabled:btn-disabled btn-md lg:btn-lg"
								>
									Submit
								</button>
								<button
									type="reset"
									className="btn btn-outline disabled:btn-disabled btn-md lg:btn-lg"
									onClick={() => Router.push('/register')}
								>
									Register
								</button>
							</span>
						</fieldset>
					</form>
				</div>
			</div>
		</Page>
	);
};

export default AdminLogin;
