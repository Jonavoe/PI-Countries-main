import React from 'react';
import styles from './CoutryList.module.css';
import CountryCard from '../CountryCard/CountryCard';

function CountryList({ currentCountries }) {
	return (
		<div>
			<h1>Countries</h1>
			<div className={styles.countries}>
				{currentCountries.map((country) => (
					<CountryCard
						key={country.id}
						country={country}
					/>
				))}
			</div>
		</div>
	);
}

export default CountryList;
