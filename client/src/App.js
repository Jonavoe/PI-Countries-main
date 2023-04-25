import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from './Redux/actions';
import Detail from './Views/Details/Detail';
import Form from './Views/Forms/Form';
import Home from './Views/Homes/Home';
import Landing from './Views/Landings/Landing';
import Activities from './Views/Activities/Activities';

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
					element={<Detail />}
				/>
				<Route
					path='/activities/:id'
					element={<Activities />}
				/>
			</Routes>
		</div>
	);
}

export default App;
