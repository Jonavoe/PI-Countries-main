import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Earth.module.css';

function Earth() {
	return (
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
	);
}

export default Earth;
