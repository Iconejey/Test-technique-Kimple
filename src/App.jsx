import './css/App.css';
import Sidebar from './components/Sidebar';
import IconButton from './components/IconButton';
import Counter from './components/Counter';
import Card from './components/Card';
import { useKimpleAPI } from './hooks/useFetch';
import { useState } from 'react';

function App() {
	// Fetch list of contests from Kimple API
	const { data: contests, loading, error } = useKimpleAPI('/contests/list?order=start_at%20desc');

	// State to manage selected counter
	const [selected_counter, setSelectedCounter] = useState('all');

	// Console log the data when it's available
	if (contests) console.log('Fetched data:', contests);
	if (error) console.error('Error fetching data:', error);

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

					<IconButton icon="add_circle" className="primary create-operation" onClick={() => alert('Créer une opération')}>
						Créer une opération
					</IconButton>

					<div className="counters-search-container">
						<div className="counters">
							<Counter count={contests?.contest_counters.total_count} selected={selected_counter === 'all'} onClick={() => setSelectedCounter('all')}>
								Tous
							</Counter>
							<Counter color="green" count={contests?.contest_counters.total_published} selected={selected_counter === 'published'} onClick={() => setSelectedCounter('published')}>
								En ligne
							</Counter>
							<Counter color="yellow" count={contests?.contest_counters.total_launching} selected={selected_counter === 'launching'} onClick={() => setSelectedCounter('launching')}>
								Débute
							</Counter>
							<Counter color="gray" count={contests?.contest_counters.total_draft} selected={selected_counter === 'draft'} onClick={() => setSelectedCounter('draft')}>
								Brouillon
							</Counter>
							<Counter color="blue" count={contests?.contest_counters.total_ended} selected={selected_counter === 'ended'} onClick={() => setSelectedCounter('ended')}>
								Terminé
							</Counter>
						</div>
					</div>

					<div className="cards">
						{loading && !error && <p>Chargement des opérations...</p>}
						{error && <p className="contests-api-error">Erreur lors du chargement des opérations.</p>}
						{contests?.data.map(contest => (
							<Card hash_id={contest.hash_id} />
						))}
					</div>
				</main>
			</div>

			<span className="chat-bubble icon" title="Des questions ?">
				chat_bubble
			</span>
		</>
	);
}

export default App;
