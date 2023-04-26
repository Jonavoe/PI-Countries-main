import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryData, filterAndSortCountries } from '../../Redux/actions';
import Header from '../../Components/Header/Header';
import Filters from '../../Components/Filters/Filters';
import CountryList from '../../Components/CountryList/CountryList';
import Pagination from '../../Components/Pagination/Pagination';
import showAnimation from '../../Components/ShowAnimation/ShowAnimation';
import {
	setSearchValue,
	setSortAlphabetically,
	setSortPopulation,
	setSortRegion,
	setSortActivity,
} from '../../Redux/actions';

function Home() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		showAnimation(setShow);
	}, []);

	const [currentPage, setCurrentPage] = useState(1);
	const [countriesPerPage] = useState(10);
	const dispatch = useDispatch();
	const countries = useSelector((state) => state.countries);
	const searchValue = useSelector((state) => state.searchValue);
	const sortAlphabetically = useSelector((state) => state.sortAlphabetically);
	const sortPopulation = useSelector((state) => state.sortPopulation);
	const sortRegion = useSelector((state) => state.sortRegion);
	const sortActivity = useSelector((state) => state.sortActivity);
	const [filter, setFilter] = useState(false);

	const indexOfLastCountry = currentPage * countriesPerPage;
	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

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

	function handleFormSubmit(event) {
		event.preventDefault();
		dispatch(fetchCountryData(searchValue));
		setSearchValue('');
	}

	function handleClick(pageNumber) {
		dispatch(setCurrentPage(pageNumber));
	}

	function handleInputChange(event) {
		dispatch(setSearchValue(event.target.value));
	}

	function handleSortRegion(event) {
		dispatch(
			filterAndSortCountries({
				countries,
				searchValue,
				sortAlphabetically,
				sortPopulation,
				sortRegion: event.target.value.toLowerCase(),
				sortActivity,
			})
		);
		dispatch(setSortRegion(event.target.value.toLowerCase()));
	}

	function handleSortAlphabetically(event) {
		dispatch(setSortAlphabetically(event.target.value));
	}

	function handleSortPopulation(event) {
		dispatch(setSortPopulation(event.target.value));
	}

	function handleSortActivity(event) {
		dispatch(setSortActivity(event.target.value.toLowerCase()));
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
