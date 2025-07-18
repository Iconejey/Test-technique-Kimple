import '../scss/IconLabel.scss';

function IconLabel({ icon, label, color }) {
	// Set color CSS variables when color is provided
	const styles = { '--color': `var(--${color})`, '--bg': `var(--${color}-bg)` };

	return (
		<div className={`icon-label ${color ? 'colored' : ''}`} style={styles}>
			<span className="icon">{icon}</span>
			<span>{label}</span>
		</div>
	);
}

export default IconLabel;
