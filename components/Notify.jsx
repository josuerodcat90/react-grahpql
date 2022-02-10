import React from 'react';

export const Notify = ({ message, type }) => {
	if (!message) return null;

	return (
		<div
			style={{
				backgroundColor: `${type === 'error' ? 'red' : 'green'}`,
				fontFamily: 'sans-serif',
				color: 'white',
				position: 'fixed',
				fontSize: 20,
				padding: 10,
				left: 10,
				top: 10,
				border: '1px solid white',
				borderRadius: '5px',
			}}
		>
			{message}
		</div>
	);
};
