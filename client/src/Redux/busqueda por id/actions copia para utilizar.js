// export const FETCH_COUNTRY_REQUEST = 'FETCH_COUNTRY_REQUEST';
// export const FETCH_COUNTRY_SUCCESS = 'FETCH_COUNTRY_SUCCESS';
// export const FETCH_COUNTRY_FAILURE = 'FETCH_COUNTRY_FAILURE';

// export const fetchCountrySuccess = (countryData) => {
// 	return {
// 		type: FETCH_COUNTRY_SUCCESS,
// 		payload: countryData,
// 	};
// };

// export const fetchCountryData = (searchValue) => {
// 	return (dispatch) => {
// 		dispatch({ type: FETCH_COUNTRY_REQUEST });
// 		fetch(`http://localhost:3001/countries/${searchValue}`)
// 			.then((response) => response.json())
// 			.then((data) => {
// 				console.log(data);
// 				const activityNames = data.Activities.map(
// 					({ name, difficult, duration, season }) => {
// 						return {
// 							name,
// 							difficult,
// 							duration,
// 							season,
// 						};
// 					}
// 				);

// 				const countryData = {
// 					name: data.name,
// 					capital: data.capital,
// 					image: data.image,
// 					continent: data.continent,
// 					subregion: data.subregion,
// 					population: data.population,
// 					area: data.area,
// 					activity: activityNames,
// 				};
// 				console.log(countryData.activity);
// 				dispatch(fetchCountrySuccess(countryData));
// 			})
// 			.catch((error) => {
// 				dispatch({ type: FETCH_COUNTRY_FAILURE, payload: error.message });
// 			});
// 	};
// };
