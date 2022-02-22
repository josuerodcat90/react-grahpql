import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { All_PERSONS } from '../graphql/queries';
import { CREATE_PERSON } from '../graphql/mutations';

export const PersonForm = ({ notifyMessage }) => {
	const [name, setName] = useState('');
	const [age, setAge] = useState(0);
	const [phone, setPhone] = useState('');
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');

	const [addPerson] = useMutation(CREATE_PERSON, {
		refetchQueries: [{ query: All_PERSONS }],
		onError: (error) => {
			notifyMessage(error.graphQLErrors[0].message, 'error');
		},
		onCompleted: () => {
			notifyMessage('Person added successfully ✔', 'success');
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		addPerson({
			variables: {
				name,
				age,
				phone,
				street,
				city,
			},
		});

		setName('');
		setAge(0);
		setPhone('');
		setStreet('');
		setCity('');
	};

	return (
		<>
			<h2>Add new Person</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type='number'
					placeholder='Age'
					value={age}
					onChange={(e) => setAge(parseInt(e.target.value))}
				/>
				<input
					type='text'
					placeholder='Phone'
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Street'
					value={street}
					onChange={(e) => setStreet(e.target.value)}
				/>
				<input
					type='text'
					placeholder='City'
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
				<br />
				<button type='submit'>Add person</button>
			</form>
		</>
	);
};
