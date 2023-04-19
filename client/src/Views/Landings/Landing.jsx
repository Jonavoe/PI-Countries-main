import React from 'react';
import styles from './Landing.module.css';
import Earth from '../../Components/earth/Earth';

function Landing() {
	return (
		<div className={styles.container}>
			<div className={styles.landing}>
				<div className={styles.containerEarth}>
					<Earth />
				</div>
				<h1 className={styles.title}>Planeta Activo</h1>
			</div>
		</div>
	);
}

export default Landing;
