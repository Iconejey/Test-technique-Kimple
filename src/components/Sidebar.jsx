import { useState } from 'react';
import '../scss/Sidebar.scss';
import IconButton from './IconButton';

const Sidebar = ({ is_hidden, onClose }) => {
	// State to manage selected view
	const [selected_view, setSelectedView] = useState('operations');

	return (
		<aside className={`sidebar ${is_hidden ? 'hidden' : ''}`}>
			<div className="sidebar-header">
				<img src="/kimple.png" alt="Kimple" />

				<button className="close-sidebar sidebar-btn" onClick={onClose} title="Fermer le menu">
					menu_open
				</button>
			</div>

			<div className="group">
				<IconButton icon="add_circle" label="Créer une opération" className="primary" />
			</div>

			<div className="group">
				<IconButton icon="dashboard" label="Tableau de bord" selected={selected_view === 'dashboard'} onClick={() => setSelectedView('dashboard')} />

				<IconButton icon="book_ribbon" label="Bibliothèque" selected={selected_view === 'library'} onClick={() => setSelectedView('library')} />
			</div>

			<div className="group">
				<h2>PROJETS</h2>

				<IconButton icon="stacks" label="Opérations" selected={selected_view === 'operations'} onClick={() => setSelectedView('operations')} />
				<IconButton icon="computer" label="Mini-sites" selected={selected_view === 'mini-sites'} onClick={() => setSelectedView('mini-sites')} />
				<IconButton icon="mail" label="Campagnes" selected={selected_view === 'campaigns'} onClick={() => setSelectedView('campaigns')} />
			</div>

			<div className="group">
				<h2>RESSOURCES</h2>

				<IconButton icon="lightbulb" label="Centre d'inspiration" selected={selected_view === 'inspiration'} onClick={() => setSelectedView('inspiration')} />
				<IconButton icon="circle_notifications" label="Le blog Kimple" selected={selected_view === 'blog'} onClick={() => setSelectedView('blog')} />
				<IconButton icon="help" label="Centre d'aide" selected={selected_view === 'help'} onClick={() => setSelectedView('help')} />
			</div>

			<div className="copyright">
				<p>Copyright © 2023 Kimple</p>
				<p>Version 2.8.1 Beta</p>
			</div>
		</aside>
	);
};

export default Sidebar;
