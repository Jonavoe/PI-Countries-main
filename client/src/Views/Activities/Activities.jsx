import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchDetailData, deleteActivityRequest } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Activities.module.css';

function Activities() {
	const detailData = useSelector((state) => state.detailData);
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(fetchDetailData(id));
	}, [id, dispatch]);

	const deleteActivity = async (idActivity) => {
		const password = prompt('Ingrese su contraseña Eliminar la Actividad:');
		if (password !== '1234') {
			alert('Eliminar Actividad a sido cancelada.');
			return;
		}
		await dispatch(deleteActivityRequest(idActivity, detailData.id));
		alert('Activity deleted successfully');
	};

	return (
		<div className={styles.container}>
			<div className={styles.home}>
				<Link to='/home'>
					<button>Home</button>
				</Link>
				<Link to={`/detail/${id}`}>
					<button>Detail</button>
				</Link>
			</div>
			{detailData && (
				<div className={styles.detailCards}>
					<div className={styles.name}>
						<h1>{detailData.name}</h1>
					</div>
					<div className={styles.activity}>
						<h2>Activities</h2>
						<div className={styles.activitiesCards}>
							{detailData.Activities.map((activity) => (
								<div
									className={styles.activityCards}
									key={activity.id}>
									<button
										onClick={() => {
											deleteActivity(activity.id);
										}}>
										X
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

export default Activities;
