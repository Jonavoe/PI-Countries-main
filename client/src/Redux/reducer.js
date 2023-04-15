import { SET_COUNTRIES, FETCH_COUNTRY_SUCCESS, FETCH_DETAIL_SUCCESS } from './actions';

const initialState = {
	countries: [],
};

const countriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_COUNTRIES:
			return {
				...state,
				countries: action.payload,
			};
		case FETCH_COUNTRY_SUCCESS:
			return {
				...state,
				countryData: action.payload,
			};
		case FETCH_DETAIL_SUCCESS:
			return {
				...state,
				detailData: action.payload,
			};

		default:
			return state;
	}
};

export default countriesReducer;
