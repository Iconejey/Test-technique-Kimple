import './css/App.css';
import Sidebar from './components/Sidebar';
import { useKimpleAPI } from './hooks/useFetch';

function App() {
	// Fetch list of contests from Kimple API
	const { data, loading, error } = useKimpleAPI('/contests/list');

	// Console log the data when it's available
	if (data) console.log('Fetched data:', data);
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
				</main>
			</div>

			<span className="chat-bubble icon" title="Des questions ?">
				chat_bubble
			</span>
		</>
	);
}

export default App;
