import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CountryCard.module.css';

function CountryCard({ country }) {
	const [shouldShake, setShouldShake] = useState(false);

	useEffect(() => {
		// Al montar el componente, activar la animación de sacudida durante 1.5 segundos
		setShouldShake(true);
		const timer = setTimeout(() => {
			setShouldShake(false);
		}, 1500);

		// Al desmontar el componente, limpiar el temporizador
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className={`${styles.card} ${shouldShake ? styles.shake : ''}`}>
			<h3>Pais: {country.name}</h3>
			<h4>Continent: {country.continent}</h4>
			<Link to={`/detail/${country.id}`}>
				<div className={styles.containerImage}>
					<img
						className={`${styles.bandera} ${shouldShake ? styles.shake : ''}`}
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
