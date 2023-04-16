import React, { useState } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryData } from '../../Redux/actions';

function Home({ countries }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [countriesPerPage] = useState(10);
	const [searchValue, setSearchValue] = useState('');
	const [verPaises, setVerPaises] = useState(true);
	const [orderByAlphabet, setOrderByAlphabet] = useState(false);
	const countryData = useSelector((state) => state.countryData);
	const dispatch = useDispatch();

	const indexOfLastCountry = currentPage * countriesPerPage;
	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

	function sortCountriesAlphabetically(countries) {
		const sortedCountries = [...countries].sort((a, b) =>
			b.name.common.localeCompare(a.name.common)
		);
		return orderByAlphabet ? sortedCountries : sortedCountries.reverse();
	}

	const currentCountries = orderByAlphabet
		? sortCountriesAlphabetically(countries).slice(
				indexOfFirstCountry,
				indexOfLastCountry
		  )
		: countries
				.sort((a, b) => a.name.common.localeCompare(b.name.common))
				.slice(indexOfFirstCountry, indexOfLastCountry);

	const totalPages = Math.ceil(countries.length / countriesPerPage);

	function handleClick(pageNumber) {
		setCurrentPage(pageNumber);
	}

	function handleFormSubmit(event) {
		event.preventDefault();
		dispatch(fetchCountryData(searchValue));
		setSearchValue('');
	}

	function handleInputChange(event) {
		setSearchValue(event.target.value);
	}

	function togglePaises() {
		setVerPaises(!verPaises);
	}

	function handleSortAlphabetically() {
		setOrderByAlphabet(!orderByAlphabet);
	}
	return (
		<div className={styles.container}>
			<button onClick={togglePaises}>Ver paises</button>

			<Link to='/form'>
				<button>Añadir actividad</button>
			</Link>
			<form
				className={styles.searchBar}
				onSubmit={handleFormSubmit}>
				<label>Busca un pais</label>
				<input
					type='text'
					name='pais'
					value={searchValue}
					onChange={handleInputChange}
					placeholder='Ingrese el pais'
				/>
				<button>Buscar</button>
			</form>

			<div>
				{countryData &&
					countryData.map((countryData) => (
						<div key={countryData.id}>
							<p>Pais: {countryData.name}</p>
							<Link to={`/detail/${countryData.id}`}>
								<img
									src={countryData.image}
									alt={countryData.name}
								/>
							</Link>
							<p>Capital: {countryData.capital}</p>
							<p>Continent: {countryData.continent}</p>
							<p>SubRegion: {countryData.subregion}</p>
							<p>Poblacion: {countryData.population}</p>
							{/* <div>
								{countryData.Activities.map((activity) => (
									<div key={activity.name}>
										<p>Name: {activity.name}</p>
										<p>Difficult: {activity.difficult}</p>
										<p>Duration: {activity.duration}</p>
										<p>Season: {activity.season}</p>
									</div>
								))}
							</div> */}
						</div>
					))}
			</div>
			{!verPaises ? (
				<div>
					<h1>List of countries</h1>
					<button onClick={handleSortAlphabetically}>
						{orderByAlphabet ? 'Z-A' : 'A-Z'}
					</button>

					<div className={styles.countries}>
						{currentCountries.map((country) => (
							<div key={country.cca3}>
								<Link to={`/detail/${country.cca3}`}>
									<p>{country.name.common}</p>
									<p>{country.continents[0]}</p>
									<img
										src={country.flags.png}
										alt={country.flags.alt}
									/>
								</Link>
							</div>
						))}
					</div>
					<div className={styles.pagination}>
						<button
							onClick={() => handleClick(currentPage - 1)}
							disabled={currentPage === 1}>
							Previous
						</button>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map(
							(pageNumber) => (
								<button
									key={pageNumber}
									onClick={() => handleClick(pageNumber)}
									disabled={currentPage === pageNumber}>
									{pageNumber}
								</button>
							)
						)}
						<button
							onClick={() => handleClick(currentPage + 1)}
							disabled={currentPage === totalPages}>
							Next
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default Home;
