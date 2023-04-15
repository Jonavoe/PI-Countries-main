// import React from 'react';
// import styles from './Home.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { useState } from 'react';
// import { fetchCountryData } from '../../Redux/actions';

// function Home() {
// 	const [searchValue, setSearchValue] = useState('');
// 	const countryData = useSelector((state) => state.countryData);
// 	const dispatch = useDispatch();

// 	function handleFormSubmit(event) {
// 		event.preventDefault();
// 		dispatch(fetchCountryData(searchValue));
// 		setSearchValue('');
// 	}

// 	function handleInputChange(event) {
// 		setSearchValue(event.target.value);
// 	}

// 	return (
// 		<div className={styles.container}>
// 			<h1>Home</h1>
// 			<form
// 				className={styles.searchBar}
// 				onSubmit={handleFormSubmit}>
// 				<label>Busca un pais</label>
// 				<input
// 					type='text'
// 					name='pais'
// 					value={searchValue}
// 					onChange={handleInputChange}
// 					placeholder='Ingrese el pais'
// 				/>
// 				<button>Buscar</button>
// 			</form>
// 			{countryData && (
// 				<div>
// 					<h2>Pais: {countryData.name}</h2>
// 					<img src={countryData.image} />
// 					<p>Capital: {countryData.capital}</p>
// 					<p>Contienete: {countryData.continent}</p>
// 					<p>Sub Región: {countryData.subregion}</p>
// 					<p>Población: {countryData.population}</p>
// 					<p>Area: {countryData.area} Km/2</p>
// 					<p>Actividades:</p>
// 					<ul>
// 						{countryData.activity.map((activity, index) => (
// 							<div key={`activity-${index}`}>
// 								<li key={activity.name}>
// 									<p>Nombre: {activity.name}</p>
// 									<p>Dificultad: {activity.difficult}</p>
// 									<p>Duración: {activity.duration}</p>
// 									<p>Temporada: {activity.season}</p>
// 								</li>
// 							</div>
// 						))}
// 					</ul>
// 				</div>
// 			)}
// 		</div>
// 	);
// }

// export default Home;





// import React, { useState } from 'react';
// import styles from './Home.module.css';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCountryData } from '../../Redux/actions';

// function Home({ countries }) {
// 	const [currentPage, setCurrentPage] = useState(1);
// 	const [countriesPerPage, setCountriesPerPage] = useState(10);

// 	const indexOfLastCountry = currentPage * countriesPerPage;
// 	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
// 	const currentCountries = countries.slice(
// 		indexOfFirstCountry,
// 		indexOfLastCountry
// 	);

// 	const totalPages = Math.ceil(countries.length / countriesPerPage);

// 	function handleClick(pageNumber) {
// 		setCurrentPage(pageNumber);
// 	}

// 	const [searchValue, setSearchValue] = useState('');

// 	const countryData = useSelector((state) => state.countryData);
// 	const dispatch = useDispatch();

// 	function handleFormSubmit(event) {
// 		event.preventDefault();
// 		dispatch(fetchCountryData(searchValue));
// 		setSearchValue('');
// 	}

// 	function handleInputChange(event) {
// 		setSearchValue(event.target.value);
// 	}

// 	return (
// 		<div className={styles.container}>
// 			<form
// 				className={styles.searchBar}
// 				onSubmit={handleFormSubmit}>
// 				<label>Busca un pais</label>
// 				<input
// 					type='text'
// 					name='pais'
// 					value={searchValue}
// 					onChange={handleInputChange}
// 					placeholder='Ingrese el pais'
// 				/>
// 				<button>Buscar</button>
// 			</form>
// 			{countryData && (
// 				<div>
// 					<h2>Pais: {countryData.name}</h2>
// 					<img
// 						src={countryData.image}
// 						alt=''
// 					/>
// 					<p>Capital: {countryData.capital}</p>
// 					<p>Contienete: {countryData.continent}</p>
// 					<p>Sub Región: {countryData.subregion}</p>
// 					<p>Población: {countryData.population}</p>
// 					<p>Area: {countryData.area} Km/2</p>
// 					<p>Actividades:</p>
// 					<ul>
// 						{countryData.activity.map((activity, index) => (
// 							<div key={`activity-${index}`}>
// 								<li key={activity.name}>
// 									<p>Nombre: {activity.name}</p>
// 									<p>Dificultad: {activity.difficult}</p>
// 									<p>Duración: {activity.duration}</p>
// 									<p>Temporada: {activity.season}</p>
// 								</li>
// 							</div>
// 						))}
// 					</ul>
// 				</div>
// 			)}

// 			<h1>List of countries</h1>
// 			<div className={styles.countries}>
// 				{currentCountries.map((country) => (
// 					<Link to={`/detail/${country.cca3}`}>
// 						<div key={country.name.common}>
// 							<p>{country.name.common}</p>
// 							<p>{country.continents[0]}</p>
// 							<img
// 								src={country.flags.png}
// 								alt={country.flags.alt}
// 							/>
// 						</div>
// 					</Link>
// 				))}
// 			</div>
// 			<div className={styles.pagination}>
// 				<button
// 					onClick={() => handleClick(currentPage - 1)}
// 					disabled={currentPage === 1}>
// 					Previous
// 				</button>
// 				{Array.from({ length: totalPages }, (_, i) => i + 1).map(
// 					(pageNumber) => (
// 						<button
// 							key={pageNumber}
// 							onClick={() => handleClick(pageNumber)}
// 							disabled={currentPage === pageNumber}>
// 							{pageNumber}
// 						</button>
// 					)
// 				)}
// 				<button
// 					onClick={() => handleClick(currentPage + 1)}
// 					disabled={currentPage === totalPages}>
// 					Next
// 				</button>
// 			</div>
// 		</div>
// 	);
// }

// export default Home;
