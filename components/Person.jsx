import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { FIND_PERSON } from '../graphql/queries';

export const Person = ({ persons }) => {
	const [findPerson, result] = useLazyQuery(FIND_PERSON);
	const [person, setPerson] = useState(null);

	const showPerson = (name) => {
		findPerson({ variables: { name } });
	};

	useEffect(() => {
		if (result.data) {
			setPerson(result.data.findPerson);
		}
	}, [result.data]);

	if (person) {
		return (
			<div>
				<h3>~~{person.name}~~</h3>
				<div>Age: {person.age}</div>
				<div>Phone: {person.phone ? person.phone : 'No phone added'}</div>
				<div>Street: {person.address.street}</div>
				<div>City: {person.address.city}</div>
				<div>Can Drink: {person.canDrink}</div>
				<br />
				<button onClick={() => setPerson(null)}>Clear</button>
			</div>
		);
	}

	if (persons == null) return <div>No Data...</div>;

	return (
		<>
			<h3>Persons</h3>
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
		</>
	);
};
