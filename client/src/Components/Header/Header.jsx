import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header({
	handleFormSubmit,
	handleInputChange,
	searchValue,
	filterOn,
}) {
	return (
		<div className={styles.nav}>
			<div className={styles.home}>
				<div className={styles.input}>
					<form
						className={styles.searchBar}
						onSubmit={handleFormSubmit}>
						<input
							type='text'
							name='pais'
							value={searchValue}
							onChange={handleInputChange}
							placeholder='Search the Country'
						/>
					</form>
				</div>
				<Link to='/form'>
					<button>Add activity</button>
				</Link>
			</div>
			<button
				className={styles.filter}
				onClick={filterOn}>
				Filter
			</button>
		</div>
	);
}

export default Header;
