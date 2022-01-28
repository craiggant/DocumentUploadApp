import React from 'react';

const help = () => {
	return (
		<div className="d-flex justify-content-center mt-5">
			<h3>Help page coming soon!</h3>
		</div>
	);
};

export default help;

export async function getStaticProps(context) {
	return {
		props: {
			protected: true,
		},
	};
}
