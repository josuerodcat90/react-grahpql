import { gql } from '@apollo/client';

export const All_PERSONS = gql`
	query {
		allPersons {
			id
			name
			age
			phone
			address {
				street
				city
			}
			canDrink
		}
	}
`;

export const FIND_PERSON = gql`
	query findPersonByName($name: String!) {
		findPerson(name: $name) {
			id
			name
			age
			phone
			canDrink
			address {
				street
				city
			}
			canDrink
		}
	}
`;
