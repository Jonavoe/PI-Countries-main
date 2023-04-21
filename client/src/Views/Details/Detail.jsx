import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchDetailData } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Detail.module.css';

function Detail() {
	const detailData = useSelector((state) => state.detailData);
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(fetchDetailData(id));
	}, [id, dispatch]);

	return (
		<div className={styles.container}>
			<div className={styles.home}>
				<Link to='/home'>
					<button>Home</button>
				</Link>
				<Link to={`/activities/${id}`}>
					<button>Activities {detailData && detailData.name}</button>
				</Link>
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
								🌍 Ubicado en el continente {detailData.continent} y la
								subregión de {detailData.subregion}. Tiene una 👥 población de{' '}
								{detailData.population} habitantes y su capital es{' '}
								{detailData.capital}.
							</h2>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Detail;
