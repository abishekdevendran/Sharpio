import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	registerFormSchema,
	registerFormSchemaType,
} from '@/schemas/registerSchema';
import { toast } from 'react-hot-toast';
import CryptoJS from 'crypto-js';
import { useRouter } from 'next/router';
import Head from 'next/head';
import UserContext from '@/contexts/UserContext';
import LoadingPage from '@/components/LoadingPage';

const Register = () => {
	const secretKey = process.env.NEXT_PUBLIC_COUPLING_SECRET;
	const [interactive, setInteractive] = useState(true);
	const { mutate, user, isLoading } = useContext(UserContext);
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push('/dashboard');
		}
	}, [user, router]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<registerFormSchemaType>({
		resolver: zodResolver(registerFormSchema),
	});

	const submitHandler = async (data: registerFormSchemaType) => {
		setInteractive(false);
		//check if passwords match
		if (data.password !== data.confirmPassword) {
			toast.error('Passwords do not match');
			setInteractive(true);
			return;
		}
		//drop confirmPassword
		delete data.confirmPassword;
		//encrypt password
		data.password = CryptoJS.AES.encrypt(data.password, secretKey!).toString();
		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			console.log(response);
			const result = await response.json();
			if (!response.ok) {
				toast.error(result.message);
			} else {
				toast.success('Registartion successful. Redirecting...');
				mutate();
				router.push('/game');
			}
			console.log(result);
		} catch (error) {
			console.error(error);
		}
		setInteractive(true);
	};
	if (isLoading) return <LoadingPage />;
	return (
		<>
			<Head>
				<title>Strife Register</title>
				<meta name="description" content="Strife Register" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<div className="card lg:card-side bg-base-300 shadow-xl flex items-center justify-center mt-20">
				<h2 className="lg:-rotate-90 card-title  text-7xl lg:text-8xl lg:-mx-20 font-extrabold mt-8 lg:opacity-75 lg:mb-6 pointer-events-none">
					Register
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
								type="text"
								className="input w-full"
							/>
							<p>{errors.password?.message}</p>
							<p className="label text-lg mt-4">Confirm Password:</p>
							<input
								{...register('confirmPassword')}
								type="password"
								className="input w-full"
							/>
							<p>{errors.confirmPassword?.message}</p>
							<p className="label text-lg mt-4">Email:</p>
							<input
								{...register('email')}
								type="email"
								className="input w-full"
							/>
							<p>{errors.email?.message}</p>
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
									onClick={() => router.push('/login')}
								>
									Login
								</button>
							</span>
						</fieldset>
					</form>
				</div>
			</div>
		</>
	);
};

export default Register;
