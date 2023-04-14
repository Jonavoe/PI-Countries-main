import axios from 'axios';

export const SET_COUNTRIES = 'SET_COUNTRIES';

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
                console.log(response.data)
				dispatch(setCountries(countries));
			})
			.catch((error) => console.log(error));
	};
};
