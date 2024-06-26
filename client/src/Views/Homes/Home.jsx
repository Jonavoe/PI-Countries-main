import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { useDispatch } from 'react-redux';
import { fetchCountryData } from '../../Redux/actions';
import Header from '../../Components/Header/Header';
import Filters from '../../Components/Filters/Filters';
import CountryList from '../../Components/CountryList/CountryList';
import Pagination from '../../Components/Pagination/Pagination';
import showAnimation from '../../Components/ShowAnimation/ShowAnimation';

function Home({ countries }) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		showAnimation(setShow);
	}, []);

	const [currentPage, setCurrentPage] = useState(1);
	const [countriesPerPage] = useState(10);
	const [searchValue, setSearchValue] = useState('');
	const [sortAlphabetically, setSortAlphabetically] = useState('');
	const [sortPopulation, setSortPopulation] = useState('');
	const [sortRegion, setSortRegion] = useState('');
	const [sortActivity, setSortActivity] = useState('');
	const [filter, setFilter] = useState('');
	const dispatch = useDispatch();

	//calcular los índices del primer y último país que se mostrarán
	const indexOfLastCountry = currentPage * countriesPerPage;
	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

	// const filteredCountries = Array.isArray(countries)
	// 	? countries
	// 			.filter((country) =>
	// 				country.name.toLowerCase().includes(searchValue.toLowerCase())
	// 			)
	// 			.filter(
	// 				(country) =>
	// 					sortRegion === '' || country.continent.toLowerCase() === sortRegion
	// 			)
	// 			.filter((country) =>
	// 				sortActivity === ''
	// 					? true
	// 					: country.Activities.some((activity) =>
	// 							activity.name.toLowerCase().includes(sortActivity)
	// 					  )
	// 			)
	// 			.sort((a, b) => {
	// 				if (sortAlphabetically === 'asc') {
	// 					return a.name.localeCompare(b.name);
	// 				} else if (sortAlphabetically === 'desc') {
	// 					return b.name.localeCompare(a.name);
	// 				}
	// 				return 0;
	// 			})
	// 			.sort((a, b) => {
	// 				if (sortPopulation === 'asc') {
	// 					return a.population - b.population;
	// 				} else if (sortPopulation === 'desc') {
	// 					return b.population - a.population;
	// 				}
	// 				return 0;
	// 			})
	// 	: [];

	const filteredCountries = Array.isArray(countries)
		? countries
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
				})
		: [];

		//extrae una porcion de la lista completa
	const currentCountries = filteredCountries.slice(
		indexOfFirstCountry,
		indexOfLastCountry
	);

	//calcula el numero total de paginas
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

	function filterOn() {
		setFilter(!filter);
	}

	const allActivities = [];
	for (const country of countries || []) {
		for (const activity of country.Activities || []) {
			if (!allActivities.includes(activity.name)) {
				allActivities.push(activity.name);
			}
		}
	}

	return (
		<div className={`${styles.container} ${show ? styles.show : ''}`}>
			<Header
				handleFormSubmit={handleFormSubmit}
				handleInputChange={handleInputChange}
				searchValue={searchValue}
				filterOn={filterOn}
			/>
			{filter ? (
				<Filters
					handleSortRegion={handleSortRegion}
					handleSortActivity={handleSortActivity}
					allActivities={allActivities}
					sortActivity={sortActivity}
					handleSortAlphabetically={handleSortAlphabetically}
					handleSortPopulation={handleSortPopulation}
				/>
			) : null}
			<CountryList currentCountries={currentCountries} />
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				handleClick={handleClick}
			/>
		</div>
	);
}

export default Home;
