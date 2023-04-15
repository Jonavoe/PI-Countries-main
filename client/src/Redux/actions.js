import axios from 'axios';

export const SET_COUNTRIES = 'SET_COUNTRIES';
export const FETCH_COUNTRY_REQUEST = 'FETCH_COUNTRY_REQUEST';
export const FETCH_COUNTRY_SUCCESS = 'FETCH_COUNTRY_SUCCESS';
export const FETCH_COUNTRY_FAILURE = 'FETCH_COUNTRY_FAILURE';
export const FETCH_DETAIL_REQUEST = 'FETCH_DETAIL_REQUEST';
export const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS';
export const FETCH_DETAIL_FAILURE = 'FETCH_DETAIL_FAILURE';

export const setCountries = (countries) => ({
	type: SET_COUNTRIES,
	payload: countries,
});

export const fetchCountries = () => {
	return (dispatch) => {
		return axios
			.get('http://localhost:3001/countries')
			.then((response) => {
				const countries = response.data;
				dispatch(setCountries(countries));
			})
			.catch((error) => console.log(error));
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
			.then((response) => {
				const detailData = response.data;
				dispatch(fetchDetailSuccess(detailData));
			})
			.catch((error) => {
				dispatch({ type: FETCH_DETAIL_FAILURE, payload: error.message });
			});
	};
};
