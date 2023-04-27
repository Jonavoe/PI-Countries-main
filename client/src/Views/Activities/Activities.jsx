import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchDetailData, deleteActivityRequest } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Activities.module.css';
import showAnimation from '../../Components/ShowAnimation/ShowAnimation';

function Activities() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		showAnimation(setShow);
	}, []);

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
		<div className={`${styles.container} ${show ? styles.show : ''}`}>
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
								<div className={styles.activityCards}>
									<div
										key={activity.id}
										className={styles.text}>
										<p>Name: {activity.name}</p>
										<p>Difficult: {activity.difficult}</p>
										<p>Duration: {activity.duration}</p>
										<p>Season: {activity.season}</p>
									</div>
									<div className={styles.btnC}>
										<button
											className={styles.btn}
											onClick={() => {
												deleteActivity(activity.id);
											}}>
											Delete
										</button>
										<Link
											className={styles.link}
											to={`/updateactivity/${activity.id}`}>
											<button className={styles.btn}>Update</button>
										</Link>
									</div>
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
