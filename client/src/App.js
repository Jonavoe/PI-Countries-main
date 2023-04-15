import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from './Redux/actions';
import Detail from './Components/Details/Detail';
import Form from './Components/Forms/Form';
import Home from './Components/Homes/Home';
import Landing from './Components/Landings/Landing';

function App() {
	const dispatch = useDispatch();
	const countries = useSelector((state) => state.countries);

	useEffect(() => {
		dispatch(fetchCountries());
	}, [dispatch]);

	return (
		<div className='App'>
			<Routes>
				<Route
					path='/'
					element={<Landing />}
				/>
				<Route
					path='/home'
					element={<Home countries={countries} />}
				/>
				<Route
					path='/form'
					element={<Form allCountries={countries} />}
				/>
				<Route
					path='/detail/:id'
					element={<Detail countries={countries} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
