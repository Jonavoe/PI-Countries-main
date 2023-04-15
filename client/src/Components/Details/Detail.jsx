import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchDetailData } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Detail.module.css'

function Detail() {
	const detailData = useSelector((state) => state.detailData);
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(fetchDetailData(id));
	}, [id, dispatch]);

	console.log(detailData);

	return (
		<div>
			<Link to='/home'>
				<button>Home Page</button>
			</Link>
			{detailData && (
				<div>
					<p>Pais: {detailData.name}</p>
					<Link to={`/detail/${detailData.id}`}>
						<img
							src={detailData.image}
							alt={detailData.name}
						/>
					</Link>
					<p>Capital: {detailData.capital}</p>
					<p>Continent: {detailData.continent}</p>
					<p>SubRegion: {detailData.subregion}</p>
					<p>Poblacion: {detailData.population}</p>
					<div className={styles.activity}>
						{detailData.Activities.map((activity, id) => (
							<div key={id}>
								<p>Name: {activity.name}</p>
								<p>Difficult: {activity.difficult}</p>
								<p>Duration: {activity.duration}</p>
								<p>Season: {activity.season}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Detail;

// import React from 'react';
// import { Link, useParams } from 'react-router-dom';

// function Detail({ countries }) {
// 	const { id } = useParams(); // Obtenemos el ID del país desde la URL

// 	// Buscamos el país correspondiente en el array de países
// 	const country = countries.find((country) => country.cca3 === id);

// 	return (
// 		<div>
// 			<Link to='/home'>Home</Link>
// 			<h1>ID: {country.cca3}</h1>
// 			<h1>Pais: {country.name.common}</h1>
// 			<img
// 				src={country.flags.png}
// 				alt={country.flags.alt}
// 			/>
// 			<p>Continente: {country.continents[0]}</p>
// 			<p>Capital: {country.capital}</p>
// 			<p>Population: {country.population}</p>
// 			<p>{country.subregion ? `Region: ${country.subregion}` : 'undefined'}</p>
// 			<p>Area: {country.area}</p>
// 			<p>Poblacion: {country.population}</p>
// 		</div>
// 	);
// }

// export default Detail;
