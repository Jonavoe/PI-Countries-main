import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchDetailData } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Detail.module.css';
import showAnimation from '../../Components/ShowAnimation/ShowAnimation';

function Detail() {
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

	return (
		<div className={`${styles.container} ${show ? styles.show : ''}`}>
			<div className={styles.home}>
				<Link to='/home'>
					<button>Home</button>
				</Link>
				{detailData && detailData.Activities.length === 0 ? null : (
					<Link to={`/activities/${id}`}>
						<button>Activities {detailData && detailData.name}</button>
					</Link>
				)}
			</div>
			{detailData && (
				<div className={styles.detailCards}>
					<div className={styles.name}>
						<h1>{detailData.name}</h1>
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
							<h2>
								🌍 Located in the {detailData.continent} continent and the{' '}
								{detailData.subregion} subregion.
							</h2>
							<h2>
								It has a 👥 population of {detailData.population} inhabitants
								and its capital is {detailData.capital}.
							</h2>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Detail;
