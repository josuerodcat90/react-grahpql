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

export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			value
		}
	}
`;

export const DELETE_PERSON = gql`
	mutation deletePerson($id: ID!) {
		deletePerson(id: $id) {
			id
			name
		}
	}
`;
