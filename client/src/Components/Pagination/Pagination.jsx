import React from 'react';
import styles from './Pagination.module.css';

function Pagination({ currentPage, totalPages, handleClick }) {
	// Generar una matriz de números de página del 1 al totalPages
	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

	// Calcular el índice de inicio y fin para las páginas visibles
	const startIndex = Math.max(0, currentPage - 3);
	const endIndex = Math.min(totalPages - 1, startIndex + 5);

	// Obtener las páginas visibles de la matriz de números de página
	const visiblePages = pageNumbers.slice(startIndex, endIndex + 1);

	return (
		<div className={styles.pagination}>
			<button
				onClick={() => handleClick(currentPage - 1)}
				disabled={currentPage === 1}>
				Previous
			</button>

			{startIndex > 0 && (
				<button onClick={() => handleClick(startIndex - 1)}>...</button>
			)}

			{visiblePages.map((pageNumber) => (
				<button
					key={pageNumber}
					onClick={() => handleClick(pageNumber)}
					disabled={currentPage === pageNumber}
					className={currentPage === pageNumber ? styles.active : ''}>
					{pageNumber}
				</button>
			))}

			{endIndex < totalPages - 1 && (
				<button onClick={() => handleClick(endIndex + 1)}>...</button>
			)}

			<button
				onClick={() => handleClick(currentPage + 1)}
				disabled={currentPage === totalPages}>
				Next
			</button>
		</div>
	);
}

export default Pagination;
