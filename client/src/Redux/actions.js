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
			.then((response) => {
				const deleteActivity = response.data;
				dispatch(deleteActivitySuccess(deleteActivity));
				dispatch(fetchDetailData(idCountry)); // actualizar el estado aquí con el id del país
			})
			.catch((error) => {
				dispatch({ type: DELETE_ACTIVITY_FAILURE, payload: error.message });
			});
	};
};
