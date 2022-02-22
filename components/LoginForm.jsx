import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';

export const LoginForm = ({ setToken, notifyMessage }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [login, { data }] = useMutation(LOGIN, {
		onError: (error) => {
			notifyMessage(error.graphQLErrors[0].message, 'error');
			setToken('');
			setPassword('');
		},
		onCompleted: (data) => {
			setToken(data.login.value);
			notifyMessage('Wellcome back! 🖐🏻😊', 'success');
		},
	});

	useEffect(() => {
		if (data) {
			const token = data.login.value;
			setToken(token);
			localStorage.setItem('userToken', token);
		}
	}, [data]);

	const handleSubmit = (e) => {
		e.preventDefault();
		login({ variables: { email, password } });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					id='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					id='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type='submit'>Login</button>
			</div>
		</form>
	);
};
