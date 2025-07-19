import '../scss/ActionMenu.scss';

function ActionMenu({ actions, active }) {
	return (
		<div className={`action-menu ${active ? 'active' : ''}`}>
			{actions.map(action => (
				<button onClick={action.onClick}>
					<span className="icon">{action.icon}</span>
					{action.label}
				</button>
			))}
		</div>
	);
}

export default ActionMenu;
