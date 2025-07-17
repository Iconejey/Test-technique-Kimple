import '../scss/Counter.scss';

function Counter({ color, count, selected, children: label, onClick }) {
	return (
		<div className={`counter ${selected ? 'selected' : ''}`} style={{ '--color': `var(--${color || 'accent'})`, '--bg': `var(--${color ? color + '-bg' : 'accent-light'})` }}>
			{color && <div className="counter-color"></div>}
			<span>{label}</span>
			<button onClick={onClick}>{count || 0}</button>
		</div>
	);
}

export default Counter;
