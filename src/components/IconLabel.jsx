import '../scss/IconLabel.scss';

function IconLabel({ icon, label, color }) {
	const styles = { '--color': `var(--${color})`, '--bg': `var(--${color}-bg)` };

	return (
		<div className={`icon-label ${color ? 'colored' : ''}`} style={styles}>
			<span className="icon">{icon}</span>
			<span>{label}</span>
		</div>
	);
}

export default IconLabel;
