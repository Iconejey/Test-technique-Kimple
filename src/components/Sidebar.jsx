import { useState } from 'react';
import '../scss/Sidebar.scss';

const Sidebar = () => {
	// State to manage sidebar visibility
	const [is_hidden, setIsHidden] = useState(false);
	const toggleSidebar = () => setIsHidden(!is_hidden);

	return (
		<aside className={`sidebar ${is_hidden ? 'hidden' : ''}`}>
			<div className="sidebar-header">
				<img src="/kimple.png" alt="Kimple" />

				<button className="close-sidebar sidebar-btn" onClick={toggleSidebar} title="Fermer le menu">
					menu_open
				</button>

				<button className="open-sidebar sidebar-btn" onClick={toggleSidebar} title="Ouvrir le menu">
					menu
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
