import '../scss/Pagination.scss';

const Pagination = ({ current_page, total_pages, onPageChange }) => {
	// List from three pages back to three pages forward
	const button_pages = [];
	for (let i = current_page - 3; i <= current_page + 3; i++) {
		if (i > 0 && i <= total_pages) button_pages.push(i);
	}

	return (
		<div className="pagination">
			<button className="pagination-btn" disabled={current_page === 1} onClick={() => onPageChange(current_page - 1)}>
				<span className="icon">arrow_back</span>
				<span className="label">Précédent</span>
			</button>

			{button_pages.map(page => {
				const is_active = current_page === page;

				return (
					<button key={page} className={`pagination-btn page ${is_active ? 'active' : ''}`} onClick={() => onPageChange(page)}>
						{page}
					</button>
				);
			})}

			<button className="pagination-btn" disabled={current_page === total_pages} onClick={() => onPageChange(current_page + 1)}>
				<span className="label">Suivant</span>
				<span className="icon">arrow_forward</span>
			</button>
		</div>
	);
};

export default Pagination;
