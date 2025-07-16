import './css/App.css';
import Sidebar from './components/Sidebar';

function App() {
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
