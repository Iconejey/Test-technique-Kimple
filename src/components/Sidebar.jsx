import { useState } from 'react';
import '../scss/Sidebar.scss';
import IconButton from './IconButton';

const Sidebar = () => {
	// State to manage sidebar visibility
	const [is_hidden, setIsHidden] = useState(false);
	const toggleSidebar = () => setIsHidden(!is_hidden);

	// State to manage selected view
	const [selectedView, setSelectedView] = useState('operations');

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

			<div className="group">
				<IconButton icon="add_circle" className="primary">
					Créer une opération
				</IconButton>
			</div>

			<div className="group">
				<IconButton icon="dashboard" selected={selectedView === 'dashboard'} onClick={() => setSelectedView('dashboard')}>
					Tableau de bord
				</IconButton>

				<IconButton icon="book_ribbon" selected={selectedView === 'library'} onClick={() => setSelectedView('library')}>
					Bibliothèque
				</IconButton>
			</div>

			<div className="group">
				<h2>PROJETS</h2>

				<IconButton icon="stacks" selected={selectedView === 'operations'} onClick={() => setSelectedView('operations')}>
					Opérations
				</IconButton>
				<IconButton icon="computer" selected={selectedView === 'mini-sites'} onClick={() => setSelectedView('mini-sites')}>
					Mini-sites
				</IconButton>
				<IconButton icon="mail" selected={selectedView === 'campaigns'} onClick={() => setSelectedView('campaigns')}>
					Campagnes
				</IconButton>
			</div>

			<div className="group">
				<h2>RESSOURCES</h2>

				<IconButton icon="lightbulb" selected={selectedView === 'inspiration'} onClick={() => setSelectedView('inspiration')}>
					Centre d'inspiration
				</IconButton>
				<IconButton icon="circle_notifications" selected={selectedView === 'blog'} onClick={() => setSelectedView('blog')}>
					Le blog Kimple
				</IconButton>
				<IconButton icon="help" selected={selectedView === 'help'} onClick={() => setSelectedView('help')}>
					Centre d'aide
				</IconButton>
			</div>

			<div className="copyright">
				<p>Copyright © 2023 Kimple</p>
				<p>Version 2.8.1 Beta</p>
			</div>
		</aside>
	);
};

export default Sidebar;
