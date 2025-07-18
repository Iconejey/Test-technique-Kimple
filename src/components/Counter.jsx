import '../scss/Counter.scss';

function Counter({ color, count, selected, label, onClick }) {
	// Set color CSS variables when color is provided
	const styles = { '--color': `var(--${color})`, '--bg': `var(--${color}-bg)` };

	return (
		<div className={`counter ${selected ? 'selected' : ''}`} style={styles}>
			{color && <div className="counter-color"></div>}
			<span>{label}</span>
			<button onClick={onClick}>{count || 0}</button>
		</div>
	);
}

export default Counter;
