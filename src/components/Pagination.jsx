import '../css/Pagination.css';

const Pagination = ({ current_page, total_pages }) => {
	return (
		<div className="pagination">
			<button className="pagination-btn" disabled={current_page === 1}>
				<span className="icon">arrow_back</span>
				Précédent
			</button>

			{Array.from({ length: total_pages }, (_, i) => {
				const page = i + 1;
				const is_active = current_page === page;

				return <button className={`pagination-btn page ${is_active ? 'active' : ''}`}>{page}</button>;
			})}

			<button className="pagination-btn" disabled={current_page === total_pages}>
				Suivant
				<span className="icon">arrow_forward</span>
			</button>
		</div>
	);
};

export default Pagination;
