import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Person } from '../components/Person';
import { PersonForm } from '../components/PersonForm';
import { PhoneForm } from '../components/PhoneForm';
import { LoginForm } from '../components/LoginForm';
import { usePersons } from '../graphql/custom-hooks';
import { Notify } from '../components/Notify';
import { useApolloClient } from '@apollo/client';

const App = () => {
	const { data, error, loading } = usePersons();
	const [message, setMessage] = useState('');
	const [type, setType] = useState('');
	const [token, setToken] = useState(() => localStorage.getItem('userToken'));
	const client = useApolloClient();

	if (error) return <span style='color: red;'>{error}</span>;

	const notifyMessage = (message, type) => {
		setMessage(message);
		setType(type);
		setTimeout(() => {
			setMessage('');
			setType('');
		}, 5000);
	};

	const handleLogout = () => {
		localStorage.removeItem('userToken');
		setToken(null);
		client.resetStore();
	};

	return (
		<div className='App'>
			<Notify message={message} type={type} />
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				{token ? (
					<button onClick={handleLogout}>Logout</button>
				) : (
					<LoginForm setToken={setToken} notifyMessage={notifyMessage} />
				)}
				<PersonForm notifyMessage={notifyMessage} />
				<PhoneForm notifyMessage={notifyMessage} />
				{loading ? (
					<b style={{ color: 'green' }}>Loading...</b>
				) : (
					<Person persons={data?.allPersons} />
				)}
			</header>
		</div>
	);
};

export default App;
