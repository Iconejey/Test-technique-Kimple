import './scss/App.scss';
import Sidebar from './components/Sidebar';
import IconButton from './components/IconButton';
import Counter from './components/Counter';
import Card from './components/Card';
import Pagination from './components/Pagination';
import { useContestsList } from './hooks/useFetch';
import { useDebounce } from './hooks/useDebounce';
import { useState } from 'react';
import { STATES } from '../constants';

function App() {
	// State to manage sidebar visibility
	const [is_sidebar_hidden, setSidebarHidden] = useState(false);

	// State to manage search input
	const [search, setSearch] = useDebounce('', 500);
	const setSearchAndResetPage = value => {
		setSearch(value);
		setPage(1);
	};

	// State to manage selected counter
	const [selected_counter, setSelectedCounter] = useState('');
	const setSelectedCounterAndResetPage = value => {
		setSelectedCounter(value);
		setPage(1);
	};

	// State to manage pagination
	const [page, setPage] = useState(1);

	// Fetch list of contests from Kimple API
	const { data: contests, loading, error } = useContestsList(selected_counter, search, page);

	// Get the total number of pages from the API response
	const pages_count = contests?._pagination?.pagesCount;

	// State to manage the active operation menu
	const [active_menu, setActiveMenu] = useState(null);

	// Hide the menu when clicking outside
	const handleClickOutside = e => {
		if (active_menu && !e.target.closest('.card-menu')) setActiveMenu(null);
	};

	return (
		<>
			<Sidebar is_hidden={is_sidebar_hidden} onClose={() => setSidebarHidden(true)} />

			<header>
				<button className="sidebar-toggle" onClick={() => setSidebarHidden(false)} title="Ouvrir le menu">
					menu
				</button>

				<div className="profile">CJ</div>
			</header>

			<div className="main-container" onClick={handleClickOutside}>
				<main>
					<div className="title-area">
						<h1>Opérations</h1>
						<p>Créez, gérez vos opérations Kimple, analysez les statistiques et effectuez des exports de vos opérations.</p>
						<a href="/">Besoin d'aide ?</a>
					</div>

					<IconButton icon="add_circle" label="Créer une opération" className="primary create-operation" onClick={() => alert('Créer une opération')} />

					<div className="counters-search-container">
						<div className="counters">
							<Counter label="Tous" count={contests?.contest_counters.total_count} selected={selected_counter === ''} onClick={() => setSelectedCounterAndResetPage('')} />
							<Counter
								label="En ligne"
								color="green"
								count={contests?.contest_counters.total_published}
								selected={selected_counter === STATES.STATE_PUBLISHED}
								onClick={() => setSelectedCounterAndResetPage(STATES.STATE_PUBLISHED)}
							/>
							<Counter
								label="Débute"
								color="yellow"
								count={contests?.contest_counters.total_launching}
								selected={selected_counter === STATES.STATE_LAUNCHING_PUBLICATION}
								onClick={() => setSelectedCounterAndResetPage(STATES.STATE_LAUNCHING_PUBLICATION)}
							/>
							<Counter label="Brouillon" color="gray" count={contests?.contest_counters.total_draft} selected={selected_counter === STATES.STATE_WAITING} onClick={() => setSelectedCounterAndResetPage(STATES.STATE_WAITING)} />
							<Counter
								label="Terminé"
								color="blue"
								count={contests?.contest_counters.total_ended}
								selected={selected_counter === STATES.STATE_WAITING_CLOSING}
								onClick={() => setSelectedCounterAndResetPage(STATES.STATE_WAITING_CLOSING)}
							/>
						</div>

						<div className="search">
							<span className="icon">search</span>
							<input type="text" placeholder="Nom d'une opération" onChange={e => setSearchAndResetPage(e.target.value)} />
						</div>
					</div>

					<div className="cards">
						{error && <p className="contests-api-error">Erreur lors du chargement des opérations.</p>}
						{loading && !error && <p>Chargement des opérations...</p>}
						{!loading && !error && contests?.data.length === 0 && <p>Aucune opération trouvée.</p>}
						{!loading && !error && contests?.data.map(contest => <Card hash_id={contest.hash_id} menu_active={contest.hash_id === active_menu} onMenu={() => setActiveMenu(contest.hash_id)} />)}
					</div>

					{!loading && !error && contests?.data.length > 0 && <Pagination current_page={page} total_pages={pages_count} onPageChange={setPage} />}
				</main>
			</div>

			<span className="chat-bubble icon" title="Des questions ?">
				chat_bubble
			</span>
		</>
	);
}

export default App;
