import './css/App.css';
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
	// State to manage search input
	const [search, setSearch] = useDebounce('', 500);

	// State to manage selected counter
	const [selected_counter, setSelectedCounter] = useState('');

	// Fetch list of contests from Kimple API
	const { data: contests, loading, error } = useContestsList(selected_counter, search);

	const pages_count = contests?._pagination?.pagesCount;
	const current_page = contests?._pagination?.currentPage || 1;

	return (
		<>
			<Sidebar />

			<header>
				<div className="profile">CJ</div>
			</header>

			<div className="main-container">
				<main>
					<div className="title-area">
						<h1>Opérations</h1>
						<p>Créez, gérez vos opérations Kimple, analysez les statistiques et effectuez des exports de vos opérations.</p>
						<a href="/">Besoin d'aide ?</a>
					</div>

					<IconButton icon="add_circle" label="Créer une opération" className="primary create-operation" onClick={() => alert('Créer une opération')} />

					<div className="counters-search-container">
						<div className="counters">
							<Counter label="Tous" count={contests?.contest_counters.total_count} selected={selected_counter === ''} onClick={() => setSelectedCounter('')} />
							<Counter label="En ligne" color="green" count={contests?.contest_counters.total_published} selected={selected_counter === STATES.STATE_PUBLISHED} onClick={() => setSelectedCounter(STATES.STATE_PUBLISHED)} />
							<Counter
								label="Débute"
								color="yellow"
								count={contests?.contest_counters.total_launching}
								selected={selected_counter === STATES.STATE_LAUNCHING_PUBLICATION}
								onClick={() => setSelectedCounter(STATES.STATE_LAUNCHING_PUBLICATION)}
							/>
							<Counter label="Brouillon" color="gray" count={contests?.contest_counters.total_draft} selected={selected_counter === STATES.STATE_WAITING} onClick={() => setSelectedCounter(STATES.STATE_WAITING)} />
							<Counter
								label="Terminé"
								color="blue"
								count={contests?.contest_counters.total_ended}
								selected={selected_counter === STATES.STATE_WAITING_CLOSING}
								onClick={() => setSelectedCounter(STATES.STATE_WAITING_CLOSING)}
							/>
						</div>

						<div className="search">
							<span className="icon">search</span>
							<input type="text" placeholder="Nom d'une opération" onChange={e => setSearch(e.target.value)} />
						</div>
					</div>

					<div className="cards">
						{error && <p className="contests-api-error">Erreur lors du chargement des opérations.</p>}
						{loading && !error && <p>Chargement des opérations...</p>}
						{!loading && !error && contests?.data.length === 0 && <p>Aucune opération trouvée.</p>}
						{!loading && !error && contests?.data.map(contest => <Card hash_id={contest.hash_id} />)}
					</div>

					{!loading && !error && contests?.data.length > 0 && <Pagination current_page={current_page} total_pages={pages_count} />}
				</main>
			</div>

			<span className="chat-bubble icon" title="Des questions ?">
				chat_bubble
			</span>
		</>
	);
}

export default App;
