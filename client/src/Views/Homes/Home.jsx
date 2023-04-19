import React, { useState } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryData } from '../../Redux/actions';

function Home({ countries }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [countriesPerPage] = useState(10);
	const countryData = useSelector((state) => state.countryData);
	const [searchValue, setSearchValue] = useState('');
	const [sortAlphabetically, setSortAlphabetically] = useState('');
	const [sortPopulation, setSortPopulation] = useState('');
	const [sortRegion, setSortRegion] = useState('');
	const [sortActivity, setSortActivity] = useState('');
	const dispatch = useDispatch();

	const indexOfLastCountry = currentPage * countriesPerPage;
	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

	// Filter countries based on searchValue and sort criteria
	const filteredCountries = countries
		.filter((country) =>
			country.name.toLowerCase().includes(searchValue.toLowerCase())
		)
		.filter(
			(country) =>
				sortRegion === '' || country.continent.toLowerCase() === sortRegion
		)
		.filter((country) =>
			sortActivity === ''
				? true
				: country.Activities.some((activity) =>
						activity.name.toLowerCase().includes(sortActivity)
				  )
		)
		.sort((a, b) => {
			if (sortAlphabetically === 'asc') {
				return a.name.localeCompare(b.name);
			} else if (sortAlphabetically === 'desc') {
				return b.name.localeCompare(a.name);
			} else if (sortPopulation === 'asc') {
				return a.population - b.population;
			} else if (sortPopulation === 'desc') {
				return b.population - a.population;
			}
			return 0;
		});

	const currentCountries = filteredCountries.slice(
		indexOfFirstCountry,
		indexOfLastCountry
	);

	const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

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

	function handleSortAlphabetically(event) {
		setSortAlphabetically(event.target.value);
	}

	function handleSortPopulation(event) {
		setSortPopulation(event.target.value);
	}

	function handleSortRegion(event) {
		setSortRegion(event.target.value.toLowerCase());
	}

	function handleSortActivity(event) {
		setSortActivity(event.target.value.toLowerCase());
	}
	console.log(currentCountries);
	return (
		<div className={styles.container}>
			<div className={styles.nav}>
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
			</div>
			<div>
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
							</div>
						))}
				</div>
			</div>
			<div>
				<div>
					<h1>List of countries</h1>
					<div>
						<label>
							{' '}
							Continent
							<select onChange={handleSortRegion}>
								<option value=''>--</option>
								<option value={'asia'}>Asia</option>
								<option value={'americas'}>Americas</option>
								<option value={'oceania'}>Oceania</option>
								<option value={'africa'}>Africa</option>
								<option value={'europe'}>Europa</option>
							</select>
						</label>
						<label onChange={handleSortActivity}>
							{' '}
							Activity:
							<input placeholder='Busca tu actividad' />
						</label>
						<label>
							{' '}
							Alphabet
							<select onChange={handleSortAlphabetically}>
								<option value=''>--</option>
								<option value='asc'>Ascendente</option>
								<option value='desc'>Descendente</option>
							</select>
						</label>
						<label>
							{' '}
							Population
							<select onChange={handleSortPopulation}>
								<option value=''>--</option>
								<option value='asc'>Ascendente</option>
								<option value='desc'>Descendente</option>
							</select>
						</label>
					</div>
					<div className={styles.countries}>
						{currentCountries.map((country) => (
							<div key={country.id}>
								<Link to={`/detail/${country.id}`}>
									<p>{country.name}</p>
									<p>{country.continent}</p>
									<img
										src={country.image}
										alt={country.name}
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
			</div>
		</div>
	);
}

export default Home;

// import React, { useState } from 'react';
// import styles from './Home.module.css';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCountryData } from '../../Redux/actions';

// function Home({ countries }) {
// 	const [currentPage, setCurrentPage] = useState(1);
// 	const [countriesPerPage] = useState(10);
// 	const countryData = useSelector((state) => state.countryData);
// 	const [searchValue, setSearchValue] = useState('');
// 	const [verPaises, setVerPaises] = useState(true);
// 	const dispatch = useDispatch();

// 	const indexOfLastCountry = currentPage * countriesPerPage;
// 	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

// 	const currentCountries = countries
// 		.sort((a, b) => a.name.common.localeCompare(b.name.common))
// 		.slice(indexOfFirstCountry, indexOfLastCountry);

// 	const totalPages = Math.ceil(countries.length / countriesPerPage);

// 	function handleClick(pageNumber) {
// 		setCurrentPage(pageNumber);
// 	}

// 	function handleFormSubmit(event) {
// 		event.preventDefault();
// 		dispatch(fetchCountryData(searchValue));
// 		setSearchValue('');
// 	}

// 	function handleInputChange(event) {
// 		setSearchValue(event.target.value);
// 	}

// 	function togglePaises() {
// 		setVerPaises(!verPaises);
// 	}

// 	function handleSortAlphabetically() {}

// 	function handleSortPopulation() {}
// 	function handleSortContinent() {}
// 	console.log(currentCountries);
// 	return (
// 		<div className={styles.container}>
// 			<div>
// 				<Link to='/form'>
// 					<button>Añadir actividad</button>
// 				</Link>
// 				<form
// 					className={styles.searchBar}
// 					onSubmit={handleFormSubmit}>
// 					<label>Busca un pais</label>
// 					<input
// 						type='text'
// 						name='pais'
// 						value={searchValue}
// 						onChange={handleInputChange}
// 						placeholder='Ingrese el pais'
// 					/>
// 					<button>Buscar</button>
// 				</form>

// 				<div>
// 					{countryData &&
// 						countryData.map((countryData) => (
// 							<div key={countryData.id}>
// 								<p>Pais: {countryData.name}</p>
// 								<Link to={`/detail/${countryData.id}`}>
// 									<img
// 										src={countryData.image}
// 										alt={countryData.name}
// 									/>
// 								</Link>
// 								<p>Capital: {countryData.capital}</p>
// 								<p>Continent: {countryData.continent}</p>
// 								<p>SubRegion: {countryData.subregion}</p>
// 								<p>Poblacion: {countryData.population}</p>
// 								{/* <div>
// 								{countryData.Activities.map((activity) => (
// 									<div key={activity.name}>
// 										<p>Name: {activity.name}</p>
// 										<p>Difficult: {activity.difficult}</p>
// 										<p>Duration: {activity.duration}</p>
// 										<p>Season: {activity.season}</p>
// 									</div>
// 								))}
// 							</div> */}
// 							</div>
// 						))}
// 				</div>
// 			</div>
// 			<div>
// 				{!verPaises ? (
// 					<div>
// 						<button onClick={togglePaises}>Ver paises</button>
// 						<h1>List of countries</h1>
// 						<div>
// 							<label>
// 								{' '}
// 								Alphabet
// 								<select onChange={handleSortAlphabetically}>
// 									<option>Ascendente</option>
// 									<option>Descendente</option>
// 								</select>
// 							</label>
// 							<label>
// 								{' '}
// 								Alphabet
// 								<select onChange={handleSortPopulation}>
// 									<option>Ascendente</option>
// 									<option>Descendente</option>
// 								</select>
// 							</label>
// 							<label>
// 								{' '}
// 								Continent
// 								<select onChange={handleSortContinent}>
// 									<option value={'asia'}>Asia</option>
// 									<option value={'americas'}>Americas</option>
// 									<option value={'oceania'}>Oceania</option>
// 									<option value={'africa'}>Africa</option>
// 									<option value={'europa'}>Europa</option>
// 								</select>
// 							</label>
// 						</div>
// 						<div className={styles.countries}>
// 							{currentCountries.map((country) => (
// 								<div key={country.cca3}>
// 									<Link to={`/detail/${country.cca3}`}>
// 										<p>{country.name.common}</p>
// 										<p>{country.continents[0]}</p>
// 										<img
// 											src={country.flags.png}
// 											alt={country.flags.alt}
// 										/>
// 									</Link>
// 								</div>
// 							))}
// 						</div>
// 						<div className={styles.pagination}>
// 							<button
// 								onClick={() => handleClick(currentPage - 1)}
// 								disabled={currentPage === 1}>
// 								Previous
// 							</button>
// 							{Array.from({ length: totalPages }, (_, i) => i + 1).map(
// 								(pageNumber) => (
// 									<button
// 										key={pageNumber}
// 										onClick={() => handleClick(pageNumber)}
// 										disabled={currentPage === pageNumber}>
// 										{pageNumber}
// 									</button>
// 								)
// 							)}
// 							<button
// 								onClick={() => handleClick(currentPage + 1)}
// 								disabled={currentPage === totalPages}>
// 								Next
// 							</button>
// 						</div>
// 					</div>
// 				) : null}
// 			</div>
// 		</div>
// 	);
// }

// export default Home;
