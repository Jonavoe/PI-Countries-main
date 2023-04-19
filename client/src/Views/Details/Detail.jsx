import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { fetchDetailData, deleteActivityRequest } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Detail.module.css';

function Detail() {
	const detailData = useSelector((state) => state.detailData);
	const dispatch = useDispatch();
	const { id } = useParams();
	const [image, setImage] = useState(null);
	const [countryName, setCountryName] = useState('');

	useEffect(() => {
		dispatch(fetchDetailData(id));
	}, [id, dispatch]);

	useEffect(() => {
		if (detailData) {
			setCountryName(detailData.name);
		}
	}, [detailData]);

	const deleteActivity = async (idActivity) => {
		const password = prompt('Ingrese su contraseña Eliminar la Actividad:');
		if (password !== '1234') {
			alert('Eliminar Actividad a sido cancelada.');
			return;
		}
		await dispatch(deleteActivityRequest(idActivity, detailData.id));
	};

	const fetchImage = async () => {
		try {
			const response = await axios.get(
				'https://api.unsplash.com/photos/random',
				{
					params: {
						query: `${countryName} landscape`,
						client_id: 'QI3jcDCQMGNXx5zSSxv2pj4xghuD7La0AipjQn-L-sw',
					},
				}
			);
			setImage(response.data.urls.regular);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchImage();
	}, [countryName]);

	return (
		<div className={styles.container}>
			<div className={styles.fondo}>
				{image ? (
					image && (
						<img
							src={image}
							alt={`${countryName} landscape`}
						/>
					)
				) : (
					<div>
						<img
							src='https://i.postimg.cc/BZhHjWqj/landscape.jpg'
							alt='landscape'
						/>
					</div>
				)}
			</div>
			<div className={styles.home}>
				<Link to='/home'>
					<button>Home</button>
				</Link>
			</div>
			{detailData && (
				<div className={styles.detailCard}>
					<div className={styles.name}>
						<h1>{detailData.name}</h1>
						<h2>{detailData.capital}</h2>
					</div>
					<div className={styles.property}>
						<div className={styles.band}>
							<img
								className={styles.bandera}
								src={detailData.image}
								alt={detailData.name}
							/>
						</div>
						<div className={styles.text}>
							<p>Continent: {detailData.continent}</p>
							<p>Region: {detailData.subregion}</p>
							<p>Poblacion: {detailData.population} de Habitantes</p>
						</div>
					</div>
					<div className={styles.activity}>
						<h3>Activities</h3>
						<div className={styles.activitiesCards}>
							{detailData.Activities.map((activity) => (
								<div className={styles.activityCards} key={activity.id}>
									<button
										onClick={() => {
											deleteActivity(activity.id);
										}}>
										{' '}
										x{' '}
									</button>

									<p>Name: {activity.name}</p>
									<p>Difficult: {activity.difficult}</p>
									<p>Duration: {activity.duration}</p>
									<p>Season: {activity.season}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Detail;

// import React, { useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { fetchDetailData, deleteActivityRequest } from '../../Redux/actions';
// import { useDispatch, useSelector } from 'react-redux';
// import styles from './Detail.module.css';

// function Detail() {
// 	const detailData = useSelector((state) => state.detailData);
// 	const dispatch = useDispatch();
// 	const { id } = useParams();

// 	useEffect(() => {
// 		dispatch(fetchDetailData(id));
// 	}, [id, dispatch]);

// 	const deleteActivity = async (idActivity) => {
// 		const password = prompt('Ingrese su contraseña Eliminar la Actividad:');
// 		if (password !== '1234') {
// 			alert('Eliminar Actividad a sido cancelada.');
// 			return;
// 		}
// 		await dispatch(deleteActivityRequest(idActivity, detailData.id));
// 	};

// 	console.log(detailData);
// 	return (
// 		<div>
// 			<Link to='/home'>
// 				<button>Home Page</button>
// 			</Link>
// 			{detailData && (
// 				<div>
// 					<p>Pais: {detailData.name}</p>
// 					<Link to={`/detail/${detailData.id}`}>
// 						<img
// 							src={detailData.image}
// 							alt={detailData.name}
// 						/>
// 					</Link>
// 					<p>Capital: {detailData.capital}</p>
// 					<p>Continent: {detailData.continent}</p>
// 					<p>SubRegion: {detailData.subregion}</p>
// 					<p>Poblacion: {detailData.population}</p>
// 					<div className={styles.activity}>
// 						{detailData.Activities.map((activity) => (
// 							<div key={activity.id}>
// 								<button
// 									onClick={() => {
// 										deleteActivity(activity.id);
// 									}}>
// 									{' '}
// 									x{' '}
// 								</button>

// 								<p>Name: {activity.name}</p>
// 								<p>Difficult: {activity.difficult}</p>
// 								<p>Duration: {activity.duration}</p>
// 								<p>Season: {activity.season}</p>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// }

// export default Detail;
