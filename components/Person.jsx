import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { All_PERSONS, FIND_PERSON } from '../graphql/queries';
import { DELETE_PERSON } from '../graphql/mutations';

export const Person = ({ persons, notifyMessage }) => {
	const [findPerson, result] = useLazyQuery(FIND_PERSON);
	const [person, setPerson] = useState(null);

	const [deletePerson] = useMutation(DELETE_PERSON, {
		refetchQueries: [{ query: All_PERSONS }],
		onError: (error) => {
			notifyMessage(error.graphQLErrors[0].message, 'error');
		},
		onCompleted: (data) => {
			notifyMessage(`${data.deletePerson} 🚷`, 'success');
		},
	});

	const showPerson = (name) => {
		findPerson({ variables: { name } });
	};

	const handleDeletePerson = (id) => {
		deletePerson({ variables: { id } });
		setPerson(null);
	};

	useEffect(() => {
		if (result.data) {
			setPerson(result.data.findPerson);
		}
	}, [result.data]);

	if (person) {
		return (
			<div className='singlePersonContainer'>
				<h3>~~{person.name}~~</h3>
				<div>Age: {person.age}</div>
				<div>Phone: {person.phone ? person.phone : 'No phone added'}</div>
				<div>Street: {person.address.street}</div>
				<div>City: {person.address.city}</div>
				<div>Can Drink: {person.canDrink}</div>
				<br />
				<button onClick={() => setPerson(null)}>Return</button>{' '}
				<button onClick={() => handleDeletePerson(person.id)}>Delete</button>
				<br />
				<p></p>
			</div>
		);
	}

	if (persons == null) return <div>No Data...</div>;

	return (
		<div className='personsContainer'>
			<h3>Persons List</h3>
			{persons.map((person) => (
				<div
					key={person.id}
					onClick={() => {
						showPerson(person.name);
					}}
				>
					{person.name} {person.phone}
				</div>
			))}
		</div>
	);
};
