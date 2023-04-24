import React from 'react';
import styles from './Filters.module.css';
import { useSelector } from 'react-redux';

function Filters({
	handleSortRegion,
	handleSortActivity,
	handleSortAlphabetically,
	handleSortPopulation,
}) {
	const countries = useSelector((state) => state.countries);
	const activities = countries.map((country) => country.Activities).flat();
	const uniqueActivities = Object.values(
		activities.reduce((acc, activity) => {
			if (!acc[activity.name]) {
				acc[activity.name] = activity;
			}
			return acc;
		}, {})
	);

	return (
		<div className={styles.containerInput}>
			<div className={styles.input}>
				<label>Continent</label>
				<select onChange={handleSortRegion}>
					<option value=''>--</option>
					<option value={'asia'}>Asia</option>
					<option value={'americas'}>Americas</option>
					<option value={'oceania'}>Oceania</option>
					<option value={'africa'}>Africa</option>
					<option value={'europe'}>Europa</option>
				</select>
			</div>
			<div className={styles.input}>
				<label>Activity</label>
				<div className={styles.activitiesCards}>
					<select
						onChange={handleSortActivity}
						value=''>
						<option value=''>--</option>
						{countries &&
							uniqueActivities.map((activity) => (
								<option
									key={activity.id}
									value={activity.name}>
									{activity.name}
								</option>
							))}
					</select>
				</div>
			</div>
			<div className={styles.input}>
				<label>Alphabet</label>
				<select onChange={handleSortAlphabetically}>
					<option value=''>--</option>
					<option value='asc'>Ascendente</option>
					<option value='desc'>Descendente</option>
				</select>
			</div>
			<div className={styles.input}>
				<label>Population</label>
				<select onChange={handleSortPopulation}>
					<option value=''>--</option>
					<option value='asc'>Ascendente</option>
					<option value='desc'>Descendente</option>
				</select>
			</div>
		</div>
	);
}

export default Filters;
