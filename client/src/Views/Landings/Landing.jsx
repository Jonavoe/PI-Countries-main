import React, { useEffect, useState } from 'react';
import styles from './Landing.module.css';
import Earth from '../../Components/earth/Earth';
import showAnimation from '../../Components/ShowAnimation/ShowAnimation';

function Landing() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		showAnimation(setShow);
	}, []);
	return (
		<div className={`${styles.container} ${show ? styles.show : ''}`}>
			<div className={styles.containerEarth}>
				<Earth />
			</div>
			<h1 className={styles.title}>Actived Planet</h1>
		</div>
	);
}

export default Landing;
