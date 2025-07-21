import '../scss/IconButton.scss';

function IconButton({ icon, label, onClick, className = '', selected }) {
	return (
		<button className={`icon-button ${className} ${selected ? 'selected' : ''}`} onClick={onClick}>
			<span className="icon">{icon}</span>
			<span>{label}</span>
		</button>
	);
}

export default IconButton;
