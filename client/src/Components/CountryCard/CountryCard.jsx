import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CountryCard.module.css';

function CountryCard({ country }) {
	const [imagen, setImagen] = useState(false);
	return (
		<div className={styles.card}>
			<h3>Pais: {country.name}</h3>
			<h4>Continent: {country.continent}</h4>
			<Link to={`/detail/${country.id}`}>
				<div className={styles.containerImage}>
					<img className={styles.bandera}
						onMouseEnter={() => setImagen(true)}
						onMouseLeave={() => setImagen(false)}
						src={country.image}
						alt={country.name}
					/>

					{country.name === 'Argentina' ? (
						<img
							className={styles.messi}
							src='https://i.postimg.cc/SsbSxt9j/messi-removebg-preview.png'
							alt='messi'
						/>
					) : null}
				</div>
			</Link>
		</div>
	);
}

export default CountryCard;
