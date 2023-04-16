import React from 'react';
import Page from './Page';

const LoadingPage = () => {
	return (
		<Page title="Loading...">
			<div className="w-full h-screen flex items-center justify-center">
				<div className="card glassy bg-base-300 p-12">
					<div>Loading...</div>
					<progress className="progress progress-primary w-56"></progress>
				</div>
			</div>
		</Page>
	);
};

export default LoadingPage;
