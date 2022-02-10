import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_NUMBER } from '../graphql/mutations';

export const PhoneForm = ({ notifyMessage }) => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');

	const [editNumber] = useMutation(EDIT_NUMBER, {
		onError: (error) => {
			notifyMessage(error.graphQLErrors[0].message, 'error');
		},
		onCompleted: () => {
			notifyMessage('Number edited successfully', 'success');
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		editNumber({
			variables: {
				name,
				phone,
			},
		});

		setName('');
		setPhone('');
	};

	return (
		<>
			<h2>Edit phone number</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Phone'
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
				<br />
				<button type='submit'>Change number</button>
			</form>
		</>
	);
};
