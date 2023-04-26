import {
	SET_COUNTRIES,
	FETCH_COUNTRY_SUCCESS,
	FETCH_DETAIL_SUCCESS,
	DELETE_ACTIVITY,
	SET_SEARCH_VALUE,
	SET_SORT_ALPHABETICALLY,
	SET_SORT_POPULATION,
	SET_SORT_REGION,
	SET_SORT_ACTIVITY,
	SET_FILTER_AND_SORT_COUNTRIES,
} from './actions';

const initialState = {
	countries: [],
	searchValue: '',
	sortAlphabetically: '',
	sortPopulation: '',
	sortRegion: '',
	sortActivity: '',
	filter: false,
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
		case DELETE_ACTIVITY:
			return {
				...state,
				deleteActivity: action.payload,
			};
		case SET_SEARCH_VALUE:
			return {
				...state,
				searchValue: action.payload,
			};
		case SET_SORT_ALPHABETICALLY:
			return {
				...state,
				sortAlphabetically: action.payload,
			};
		case SET_SORT_POPULATION:
			return {
				...state,
				sortPopulation: action.payload,
			};
		case SET_SORT_REGION:
			return {
				...state,
				sortRegion: action.payload,
			};
		case SET_SORT_ACTIVITY:
			return {
				...state,
				sortActivity: action.payload,
			};
		case SET_FILTER_AND_SORT_COUNTRIES:
			return {
				...state,
				filter: action.payload,
			};
		default:
			return state;
	}
};

export default countriesReducer;
