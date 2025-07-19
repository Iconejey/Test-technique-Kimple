import '../scss/IconLabel.scss';

function IconLabel({ icon, label, color }) {
	// Set color CSS variables when color is provided
	const styles = { '--color': `var(--${color})`, '--bg': `var(--${color}-bg)` };

	return (
		<div className={`icon-label ${color ? 'colored' : ''}`} style={styles}>
			{icon === 'language' && <span className="language-icon" style={{ backgroundImage: `url(/flags/${label}.svg)` }}></span>}
			{icon !== 'language' && <span className="icon">{icon}</span>}
			<span>{label}</span>
		</div>
	);
}

export default IconLabel;
