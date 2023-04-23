import React from 'react';
import styles from './Landing.module.css';
import Earth from '../../Components/earth/Earth';

function Landing() {
	return (
		<div className={styles.container}>
			<div className={styles.containerEarth}>
				<Earth />
			</div>
			<h1 className={styles.title}>Actived Planet</h1>
		</div>
	);
}

export default Landing;
