import React, { useState } from 'react';
import styles from './Form.module.css';
import { Link } from 'react-router-dom';

const countryList = [
	{ code: 'ARG', name: 'Argentina' },
	{ code: 'URY', name: 'Uruguay' },
	{ code: 'BRA', name: 'Brazil' },
	{ code: 'CHL', name: 'Chile' },
];

function Form({ allCountries }) {
	const [name, setName] = useState('');
	const [difficult, setDifficult] = useState(1);
	const [duration, setDuration] = useState(6);
	const [season, setSeason] = useState('verano');
	const [selectedCountries, setSelectedCountries] = useState([]);
	const [searchText, setSearchText] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch('http://localhost:3001/activities', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					difficult,
					duration,
					season,
					country: selectedCountries,
				}),
			});
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCountryChange = (event) => {
		const selectedOptions = Array.from(event.target.selectedOptions);
		const selectedCountryCodes = selectedOptions.map((option) => option.value);
		selectedCountryCodes.forEach((code) => {
			if (!selectedCountries.includes(code)) {
				setSelectedCountries([...selectedCountries, code]);
			}
		});
	};

	const handleSearchTextChange = (event) => {
		setSearchText(event.target.value);
	};

	const filteredCountries = countryList.filter((country) =>
		country.name.toLowerCase().includes(searchText.toLowerCase())
	);

	return (
		<div className={styles.container}>
			<Link to='/home'>
				<button>Home Page</button>
			</Link>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='name'>Name:</label>
					<input
						type='text'
						id='name'
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='difficult'>Difficult:</label>
					<input
						type='number'
						id='difficult'
						min='1'
						max='5'
						value={difficult}
						onChange={(event) => setDifficult(parseInt(event.target.value))}
					/>
				</div>
				<div>
					<label htmlFor='duration'>Duration:</label>
					<input
						type='number'
						id='duration'
						min='1'
						max='24'
						value={duration}
						onChange={(event) => setDuration(parseInt(event.target.value))}
					/>
				</div>
				<div>
					<label htmlFor='season'>Season:</label>
					<select
						id='season'
						value={season}
						onChange={(event) => setSeason(event.target.value)}>
						<option value='verano'>Summer</option>
						<option value='invierno'>Winter</option>
						<option value='primavera'>Spring</option>
						<option value='otoño'>Fall</option>
					</select>
				</div>
				<div>
					<label htmlFor='countries'>Countries:</label>
					<select
						id='countries'
						multiple
						value={selectedCountries}
						onChange={handleCountryChange}>
						{filteredCountries.map((country) => (
							<option
								key={country.code}
								value={country.code}>
								{country.name}
							</option>
						))}
					</select>
					{selectedCountries.map((code) => (
						<button
							key={code}
							onClick={() =>
								setSelectedCountries(
									selectedCountries.filter((c) => c !== code)
								)
							}>
							{countryList.find((country) => country.code === code).name}{' '}
							&times;
						</button>
					))}
				</div>
				<div>
					<label htmlFor='searchText'>Search Country:</label>
					<input
						type='text'
						id='searchText'
						value={searchText}
						onChange={handleSearchTextChange}
					/>
				</div>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}
export default Form;

// import React, { useState } from 'react';
// import styles from './Form.module.css';
// import { Link } from 'react-router-dom';

// const countryList = [
// 	{ code: 'ARG', name: 'Argentina' },
// 	{ code: 'URY', name: 'Uruguay' },
// 	{ code: 'BRA', name: 'Brazil' },
// 	{ code: 'CHL', name: 'Chile' },
// ];

// function Form({allCountries}) {
// 	const [name, setName] = useState('');
// 	const [difficult, setDifficult] = useState(1);
// 	const [duration, setDuration] = useState(6);
// 	const [season, setSeason] = useState('verano');
// 	const [selectedCountries, setSelectedCountries] = useState([]);
// 	const [searchText, setSearchText] = useState('');

// 	const handleSubmit = async (event) => {
// 		event.preventDefault();
// 		try {
// 			const response = await fetch('http://localhost:3001/activities', {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify({
// 					name,
// 					difficult,
// 					duration,
// 					season,
// 					country: selectedCountries,
// 				}),
// 			});
// 			const data = await response.json();
// 			console.log(data);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};

// 	const handleCountryChange = (event) => {
// 		const selectedOptions = Array.from(event.target.selectedOptions);
// 		const selectedCountryCodes = selectedOptions.map((option) => option.value);
// 		selectedCountryCodes.forEach((code) => {
// 			if (!selectedCountries.includes(code)) {
// 				setSelectedCountries([...selectedCountries, code]);
// 			}
// 		});
// 	};

// 	const handleSearchTextChange = (event) => {
// 		setSearchText(event.target.value);
// 	};

// 	const filteredCountries = countryList.filter((country) =>
// 		country.name.toLowerCase().includes(searchText.toLowerCase())
// 	);

// 	return (
// 		<div className={styles.container}>
// 			<Link to='/home'>
// 				<button>Home Page</button>
// 			</Link>
// 			<form onSubmit={handleSubmit}>
// 				<div>
// 					<label htmlFor='name'>Name:</label>
// 					<input
// 						type='text'
// 						id='name'
// 						value={name}
// 						onChange={(event) => setName(event.target.value)}
// 					/>
// 				</div>
// 				<div>
// 					<label htmlFor='difficult'>Difficult:</label>
// 					<input
// 						type='number'
// 						id='difficult'
// 						min='1'
// 						max='5'
// 						value={difficult}
// 						onChange={(event) => setDifficult(parseInt(event.target.value))}
// 					/>
// 				</div>
// 				<div>
// 					<label htmlFor='duration'>Duration:</label>
// 					<input
// 						type='number'
// 						id='duration'
// 						min='1'
// 						max='24'
// 						value={duration}
// 						onChange={(event) => setDuration(parseInt(event.target.value))}
// 					/>
// 				</div>
// 				<div>
// 					<label htmlFor='season'>Season:</label>
// 					<select
// 						id='season'
// 						value={season}
// 						onChange={(event) => setSeason(event.target.value)}>
// 						<option value='verano'>Summer</option>
// 						<option value='invierno'>Winter</option>
// 						<option value='primavera'>Spring</option>
// 						<option value='otoño'>Fall</option>
// 					</select>
// 				</div>
// 				<div>
// 					<label htmlFor='countries'>Countries:</label>
// 					<select
// 						id='countries'
// 						multiple
// 						value={selectedCountries}
// 						onChange={handleCountryChange}>
// 						{filteredCountries.map((country) => (
// 							<option
// 								key={country.code}
// 								value={country.code}>
// 								{country.name}
// 							</option>
// 						))}
// 					</select>
// 					{selectedCountries.map((code) => (
// 						<button
// 							key={code}
// 							onClick={() =>
// 								setSelectedCountries(
// 									selectedCountries.filter((c) => c !== code)
// 								)
// 							}>
// 							{countryList.find((country) => country.code === code).name}{' '}
// 							&times;
// 						</button>
// 					))}
// 				</div>
// 				<div>
// 					<label htmlFor='searchText'>Search Country:</label>
// 					<input
// 						type='text'
// 						id='searchText'
// 						value={searchText}
// 						onChange={handleSearchTextChange}
// 					/>
// 				</div>
// 				<button type='submit'>Submit</button>
// 			</form>
// 		</div>
// 	);
// }
// export default Form;
