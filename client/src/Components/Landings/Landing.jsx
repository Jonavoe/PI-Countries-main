import React from 'react';
import styles from './Landing.module.css';
import { Link } from 'react-router-dom';

function Landing() {
	return (
		<div className={styles.container}>
			<div className={styles.landing}>
				<div className={styles.containerEarth}>
					<Link
						className={styles.link}
						to='/home'>
						<div className={styles.world}></div>
						{/* <img
							className={styles.earth}
							src='https://i.postimg.cc/GmXHvtvx/mundoBGR.png'
							alt='earth'
						/> */}
					</Link>
				</div>
				<h1 className={styles.title}>Planeta Activo</h1>
			</div>
		</div>
	);
}

export default Landing;
