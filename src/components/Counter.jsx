import '../scss/Counter.scss';

function Counter({ color, count, selected, label, onClick }) {
	// Use color if provided, otherwise default to accent colors
	const styles = { '--color': `var(--${color}, var(--accent))`, '--bg': `var(--${color}-bg, var(--accent-light))` };

	return (
		<div className={`counter ${selected ? 'selected' : ''}`} style={styles}>
			{color && <div className="counter-color"></div>}
			<span>{label}</span>
			<button onClick={onClick}>{count || 0}</button>
		</div>
	);
}

export default Counter;
