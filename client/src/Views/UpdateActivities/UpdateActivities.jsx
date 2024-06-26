import React, { useEffect, useState } from 'react';
import styles from './UpdateActivities.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import showAnimation from '../../Components/ShowAnimation/ShowAnimation';

function UpdateActivities({ allCountries }) {
	const { id } = useParams();
	const [show, setShow] = useState(false);

	useEffect(() => {
		showAnimation(setShow);
	}, []);

	const [name, setName] = useState('');
	const [difficult, setDifficult] = useState(1);
	const [duration, setDuration] = useState(1);
	const [season, setSeason] = useState();
	const [selectedCountries, setSelectedCountries] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [setShowErrorMessage] = useState(false);
	const [setErrorMessage] = useState('');
	const [validations, setValidations] = useState({
		name: false,
		difficult: false,
		duration: false,
		season: false,
		countries: false,
	});

	const countries =
		Array.isArray(allCountries) && allCountries.length > 0
			? allCountries.map((country) => ({ id: country.id, name: country.name }))
			: [];

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			if (
				!name ||
				!difficult ||
				!duration ||
				!season ||
				selectedCountries.length === 0
			) {
				alert('Please fill in all the fields');
				throw new Error('Please fill in all the fields');
			}

			const response = await axios.put(
				// `http://localhost:3001/activities/${id}`,
				`https://pi-countries-main-production-3180.up.railway.app/activities/${id}`,
				{
					name,
					difficult,
					duration,
					season,
					countries: selectedCountries,
				}
			);

			setShowSuccessMessage(true);
			setTimeout(() => setShowSuccessMessage(false), 2500);
			setName(response.data.name);
			setDifficult(response.data.difficult);
			setDuration(response.data.duration);
			setSeason(response.data.season);
			setSelectedCountries(response.data.countries);
		} catch (error) {
			setShowErrorMessage(true);
			setErrorMessage(error.message);
			setTimeout(() => setShowErrorMessage(false), 3000);
		}
	};

	const handleCountryChange = (event) => {
		const selectedOptions = Array.from(event.target.selectedOptions);
		const selectedCountryCodes =
			selectedOptions && selectedOptions.map((option) => option.value);
		selectedCountryCodes.forEach((code) => {
			if (!selectedCountries.includes(code)) {
				setSelectedCountries([...selectedCountries, code]);
			}
		});
	};

	const handleSearchTextChange = (event) => {
		setSearchText(event.target.value);
	};

	const filteredCountries = countries.filter((country) =>
		country.name.toLowerCase().includes(searchText.toLowerCase())
	);

	return (
		<div className={`${styles.container} ${show ? styles.show : ''}`}>
			<div className={styles.home}>
				<Link to='/home'>
					<button>Home Page</button>
				</Link>
			</div>
			<h1>Update Activities</h1>
			<div className={styles.containerForm}>
				<form onSubmit={handleSubmit}>
					<div className={styles.containerInput}>
						<div className={styles.input}>
							<label htmlFor='name'>Name</label>
							<input
								type='text'
								id='name'
								value={name}
								onChange={(event) => setName(event.target.value.toLowerCase())}
								onBlur={() => {
									if (!name) {
										setValidations({ ...validations, name: false });
									} else {
										setValidations({ ...validations, name: true });
									}
								}}
								className={validations.name ? styles.valid : styles.invalid}
							/>
						</div>
						<div className={styles.input}>
							<label htmlFor='difficult'>Difficult min 1 max 5</label>
							<input
								type='number'
								id='difficult'
								min='1'
								max='5'
								value={difficult}
								onChange={(event) => setDifficult(parseInt(event.target.value))}
								onBlur={() => {
									if (!difficult) {
										setValidations({ ...validations, difficult: false });
									} else {
										setValidations({ ...validations, difficult: true });
									}
								}}
								className={
									validations.difficult ? styles.valid : styles.invalid
								}
							/>
						</div>
						<div className={styles.input}>
							<label htmlFor='duration'>Duration 1hs a 24hs</label>
							<input
								type='number'
								id='duration'
								min='1'
								max='24'
								value={duration}
								onChange={(event) => setDuration(parseInt(event.target.value))}
								onBlur={() => {
									if (!duration) {
										setValidations({ ...validations, duration: false });
									} else {
										setValidations({ ...validations, duration: true });
									}
								}}
								className={validations.duration ? styles.valid : styles.invalid}
							/>
						</div>
						<div className={styles.inputSeason}>
							<label htmlFor='season'>Season</label>
							<select
								id='season'
								value={season}
								onChange={(event) => setSeason(event.target.value)}
								onBlur={() => {
									if (!duration) {
										setValidations({ ...validations, season: false });
									} else {
										setValidations({ ...validations, season: true });
									}
								}}
								className={validations.season ? styles.valid : styles.invalid}>
								<option value='--'>--</option>
								<option value='verano'>Summer</option>
								<option value='invierno'>Winter</option>
								<option value='primavera'>Spring</option>
								<option value='otoño'>Fall</option>
							</select>
						</div>
					</div>

					<div className={styles.input}>
						<label htmlFor='searchText'>Search Country</label>
						<input
							type='text'
							id='searchText'
							value={searchText}
							onChange={handleSearchTextChange}
						/>
					</div>

					<div className={styles.inputCountries}>
						<label htmlFor='countries'>Countries:</label>
						<div className={styles.selectCountries}>
							<select
								id='countries'
								multiple
								value={selectedCountries}
								onChange={handleCountryChange}
								onBlur={() => {
									if (!selectedCountries) {
										setValidations({
											...validations,
											selectedCountries: false,
										});
									} else {
										setValidations({ ...validations, selectedCountries: true });
									}
								}}
								className={
									validations.selectedCountries ? styles.valid : styles.invalid
								}>
								{filteredCountries
									? filteredCountries.map((country) => (
											<option
												key={country.id}
												value={country.id}>
												{country.name}
											</option>
									  ))
									: 'Cargando paises'}
							</select>
						</div>
						<div className={styles.countries}>
							{selectedCountries &&
								selectedCountries.map((id) => (
									<button
										key={id}
										onClick={() =>
											setSelectedCountries(
												selectedCountries.filter((c) => c !== id)
											)
										}>
										{allCountries.find((country) => country.id === id).name}{' '}
										&times;
									</button>
								))}
						</div>

						<div className={styles.submit}>
							<button type='submit'>Submit</button>
						</div>
					</div>

					{showSuccessMessage && <div className={styles.alert}> </div>}
					{showSuccessMessage && (
						<div className={styles.alert}>
							<h2>Activity created successfully</h2>
							<div className={styles.ativities}>
								<p>Name: {name}</p>
								<p>Difficult: {difficult}</p>
								<p>Duration: {duration}</p>
								<p>Season: {season}</p>
							</div>
							<div className={styles.countriesActivity}>
								<p>Countries:</p>
								<ul>
									{selectedCountries &&
										selectedCountries.map((id) => (
											<li key={id}>
												{allCountries.find((country) => country.id === id).name}
												,
											</li>
										))}
								</ul>
							</div>
						</div>
					)}
				</form>
			</div>
		</div>
	);
}

export default UpdateActivities;
