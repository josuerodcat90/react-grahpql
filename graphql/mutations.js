import { gql } from '@apollo/client';

export const CREATE_PERSON = gql`
	mutation addPerson(
		$name: String!
		$age: Int!
		$phone: String
		$street: String!
		$city: String!
	) {
		addPerson(
			name: $name
			age: $age
			phone: $phone
			street: $street
			city: $city
		) {
			id
			name
			age
			canDrink
			address {
				city
				street
			}
			phone
		}
	}
`;

export const EDIT_NUMBER = gql`
	mutation editNumber($name: String!, $phone: String!) {
		editNumber(name: $name, phone: $phone) {
			id
			name
			age
			canDrink
			address {
				city
				street
			}
			phone
		}
	}
`;
