import React from 'react';
import styles from './Landing.module.css';
import { Link } from 'react-router-dom';

function Landing() {
	return (
		<div className={styles.container}>
			<h1>Landing</h1>
			<Link to='/home'>
				<button>Home Page</button>
			</Link>
		</div>
	);
}

export default Landing;
