import React, { useState } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

function Home({ countries }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [countriesPerPage, setCountriesPerPage] = useState(10);

	const indexOfLastCountry = currentPage * countriesPerPage;
	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
	const currentCountries = countries.slice(
		indexOfFirstCountry,
		indexOfLastCountry
	);

	const totalPages = Math.ceil(countries.length / countriesPerPage);

	function handleClick(pageNumber) {
		setCurrentPage(pageNumber);
	}

	return (
		<div className={styles.container}>
			<h1>List of countries</h1>
			<div className={styles.countries}>
				{currentCountries.map((country) => (
					<Link to={`/detail/${country.cca3}`}>
						<div key={country.name.common}>
							<p>{country.name.common}</p>
							<p>{country.continents[0]}</p>
							<img src={country.flags.png} />
						</div>
					</Link>
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
	);
}

export default Home;
