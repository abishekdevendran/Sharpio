import React from 'react';
import Page from './Page';

const LoadingPage = () => {
	return (
		<Page title="Loading...">
			<div className="card bg-base-300 p-12">
				<div>Loading...</div>
				<progress className="progress progress-primary w-56"></progress>
			</div>
		</Page>
	);
};

export default LoadingPage;
