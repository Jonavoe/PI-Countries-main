import axios from 'axios';

export const SET_COUNTRIES = 'SET_COUNTRIES';
export const FETCH_COUNTRY_REQUEST = 'FETCH_COUNTRY_REQUEST';
export const FETCH_COUNTRY_SUCCESS = 'FETCH_COUNTRY_SUCCESS';
export const FETCH_COUNTRY_FAILURE = 'FETCH_COUNTRY_FAILURE';
export const FETCH_DETAIL_REQUEST = 'FETCH_DETAIL_REQUEST';
export const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS';
export const FETCH_DETAIL_FAILURE = 'FETCH_DETAIL_FAILURE';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const DELETE_ACTIVITY_REQUEST = 'DELETE_ACTIVITY_REQUEST';
export const DELETE_ACTIVITY_FAILURE = 'DELETE_ACTIVITY_FAILURE';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const SET_SORT_ALPHABETICALLY = 'SET_SORT_ALPHABETICALLY';
export const SET_SORT_POPULATION = 'SET_SORT_POPULATION';
export const SET_SORT_REGION = 'SET_SORT_REGION';
export const SET_SORT_ACTIVITY = 'SET_SORT_ACTIVITY';
export const SET_FILTER_AND_SORT_COUNTRIES = 'SET_FILTER_AND_SORT_COUNTRIES';
export const FILTER_AND_SORT_COUNTRIES = 'FILTER_AND_SORT_COUNTRIES';

export const setCountries = (countries) => ({
	type: SET_COUNTRIES,
	payload: countries,
});

export const fetchCountries = () => {
	return (dispatch) => {
		return (
			axios
				.get('http://localhost:3001/countries')
				// .get(
				// 	'https://pi-countries-main-production-3180.up.railway.app/countries'
				// )
				.then((response) => {
					const countries = response.data;
					dispatch(setCountries(countries));
				})
				.catch((error) => console.log(error))
		);
	};
};

export const fetchCountrySuccess = (countryData) => {
	return {
		type: FETCH_COUNTRY_SUCCESS,
		payload: countryData,
	};
};

export const fetchCountryData = (searchValue) => {
	return (dispatch) => {
		dispatch({ type: FETCH_COUNTRY_REQUEST });
		axios
			.get(`http://localhost:3001/countries/name/?name=${searchValue}`)
			// .get(
			// 	`https://pi-countries-main-production-3180.up.railway.app/countries/name/?name=${searchValue}`
			// )
			.then((response) => {
				const countryData = response.data;
				dispatch(fetchCountrySuccess(countryData));
			})
			.catch((error) => {
				dispatch({ type: FETCH_COUNTRY_FAILURE, payload: error.message });
			});
	};
};

export const fetchDetailSuccess = (detailData) => {
	return {
		type: FETCH_DETAIL_SUCCESS,
		payload: detailData,
	};
};

export const fetchDetailData = (id) => {
	return (dispatch) => {
		dispatch({ type: FETCH_DETAIL_REQUEST });
		axios
			.get(`http://localhost:3001/countries/${id}`)
			// .get(
			// 	`https://pi-countries-main-production-3180.up.railway.app/countries/${id}`
			// )
			.then((response) => {
				const detailData = response.data;
				dispatch(fetchDetailSuccess(detailData));
			})
			.catch((error) => {
				dispatch({ type: FETCH_DETAIL_FAILURE, payload: error.message });
			});
	};
};

export const deleteActivitySuccess = (deleteActivity) => {
	return {
		type: DELETE_ACTIVITY,
		payload: deleteActivity,
	};
};

export const deleteActivityRequest = (idActivity, idCountry) => {
	return (dispatch) => {
		dispatch({ type: DELETE_ACTIVITY_REQUEST });
		axios
			.delete(`http://localhost:3001/activities/${idActivity}`)
			// .delete(
			// 	`https://pi-countries-main-production-3180.up.railway.app/activities/${idActivity}`
			// )
			.then((response) => {
				const deleteActivity = response.data;
				dispatch(deleteActivitySuccess(deleteActivity));
				dispatch(fetchDetailData(idCountry));
			})
			.catch((error) => {
				dispatch({ type: DELETE_ACTIVITY_FAILURE, payload: error.message });
			});
	};
};

export const filterAndSortCountriesSuccess = (deleteActivity) => {
	return {
		type: FILTER_AND_SORT_COUNTRIES,
		payload: deleteActivity,
	};
};

export const filterAndSortCountries = ({
	countries,
	searchValue,
	sortAlphabetically,
	sortPopulation,
	sortRegion,
	sortActivity,
}) => {
	return (dispatch) => {
		dispatch({ type: SET_FILTER_AND_SORT_COUNTRIES });
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

		return filteredCountries;
	};
};

export const setSearchValue = (searchValue) => ({
	type: SET_SEARCH_VALUE,
	payload: searchValue,
});

export const setSortAlphabetically = (value) => ({
	type: SET_SORT_ALPHABETICALLY,
	payload: value,
});

export const setSortPopulation = (value) => ({
	type: SET_SORT_POPULATION,
	payload: value,
});

export const setSortRegion = (value) => ({
	type: SET_SORT_REGION,
	payload: value,
});

export const setSortActivity = (value) => ({
	type: SET_SORT_ACTIVITY,
	payload: value,
});
