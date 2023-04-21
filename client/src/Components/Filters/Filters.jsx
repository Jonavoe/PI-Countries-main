import React from 'react';
import styles from './Filters.module.css';

function Filters({
	handleSortRegion,
	handleSortActivity,
	handleSortAlphabetically,
	handleSortPopulation,
}) {
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
				<input
					onChange={handleSortActivity}
					placeholder='Busca tu actividad'
				/>
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
