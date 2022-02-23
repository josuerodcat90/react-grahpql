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
	const [mandatory, setMandatory] = useState(0);
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
					<>
						<button onClick={handleLogout} className='logoutButton'>
							Logout
						</button>

						<div className='actionButtonsContainer'>
							<h3>What do you want to do?</h3>
							{mandatory !== 2 && (
								<button
									className='addPersonActionButton'
									onClick={() => setMandatory(2)}
								>
									Add person
								</button>
							)}
							{mandatory !== 1 && (
								<button
									className='editPhoneActionButton'
									onClick={() => setMandatory(1)}
								>
									Edit phone
								</button>
							)}
							{mandatory !== 0 && (
								<button
									className='showPersonsActionButton'
									onClick={() => setMandatory(0)}
								>
									Show persons
								</button>
							)}
						</div>
						{mandatory === 2 && <PersonForm notifyMessage={notifyMessage} />}
						{mandatory === 1 && <PhoneForm notifyMessage={notifyMessage} />}
						{loading ? (
							<b style={{ color: 'green' }}>Loading...</b>
						) : (
							<div className='personsList'>
								{mandatory === 0 && (
									<Person
										persons={data?.allPersons}
										notifyMessage={notifyMessage}
									/>
								)}
							</div>
						)}
					</>
				) : (
					<LoginForm setToken={setToken} notifyMessage={notifyMessage} />
				)}
			</header>
		</div>
	);
};

export default App;
