import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  useEffect(() => {
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
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
        `
      }),
    }).then(res => res.json())
      .then(res => {
        console.log(res);
      });
  }, []);
  
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>GraphQL + React!</p>
			</header>
		</div>
	);
};

export default App;
