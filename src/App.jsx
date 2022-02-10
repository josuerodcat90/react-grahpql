import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Person } from '../components/Person';
import { PersonForm } from '../components/PersonForm';
import { PhoneForm } from '../components/PhoneForm';
import { usePersons } from '../graphql/custom-hooks';
import { Notify } from '../components/Notify';

const App = () => {
	const { data, error, loading } = usePersons();
	const [message, setMessage] = useState('');
	const [type, setType] = useState('');

	if (error) return <span style='color: red;'>{error}</span>;

	const notifyMessage = (message, type) => {
		setMessage(message);
		setType(type);
		setTimeout(() => {
			setMessage('');
			setType('');
		}, 4000);
	};

	return (
		<div className='App'>
			<Notify message={message} type={type} />
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
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
