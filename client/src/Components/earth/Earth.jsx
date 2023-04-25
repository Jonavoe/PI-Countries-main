import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Earth.module.css';

function Earth() {
	return (
		<Link
			className={styles.link}
			to='/home'>
			<div className={styles.world}></div>
		</Link>
	);
}

export default Earth;
