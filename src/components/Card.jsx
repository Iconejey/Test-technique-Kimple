import { LOCAL_COUNTRY_NAMES, STATE_COLORS, STATE_ICONS, STATE_LABELS, TEMPLATES_ICONS } from '../../constants';
import { useKimpleAPI } from '../hooks/useFetch';
import IconLabel from './IconLabel';
import '../scss/Card.scss';
import ActionMenu from './ActionMenu';

function Card({ hash_id, menu_active, onMenu }) {
	// Fetch contest data using the hash_id
	const { data: contest, loading, error } = useKimpleAPI(`/contests/show/${hash_id}`);

	// Get background image source from contest media
	const bg_img_src = contest?._medias && Object.keys(contest._medias)?.[0];

	// Get template image source from contest data
	const template_icon_img_src = `/icons/${TEMPLATES_ICONS[contest?.data?.template]}`;

	// Start and finish dates
	const start_date = new Date(contest?.data?.start_at).toLocaleString(contest?.data?.locale).replace(/:\d+$/, '');
	const finish_date = new Date(contest?.data?.finish_at).toLocaleString(contest?.data?.locale).replace(/:\d+$/, '');

	// State icon, color and label
	const state_icon = STATE_ICONS[contest?.data?.state];
	const state_color = STATE_COLORS[contest?.data?.state];
	const state_label = STATE_LABELS[contest?.data?.state];

	// Locale country name
	const locale_country_name = LOCAL_COUNTRY_NAMES[contest?.data?.locale];

	// Menu actions
	const menu_actions = [
		{
			label: 'Éditer',
			icon: 'edit',
			onClick: () => alert("Éditer l'opération...")
		},
		{
			label: 'Copier le lien',
			icon: 'link',
			onClick: () => alert("Copier le lien de l'opération...")
		},
		{
			label: 'Dupliquer',
			icon: 'content_copy',
			onClick: () => alert("Dupliquer l'opération...")
		},
		{
			label: 'Aperçu',
			icon: 'visibility',
			onClick: () => alert("Aperçu de l'opération...")
		},
		{
			label: 'Statistiques',
			icon: 'chart_data',
			onClick: () => alert("Statistiques de l'opération...")
		}
	];

	return (
		<div className="card-container">
			<div className={`card ${loading ? 'loading' : ''} ${error ? 'error' : ''} ${menu_active ? 'menu-active' : ''}`}>
				<img className="card-bg" src={bg_img_src} />
				<div className="card-content">
					<img className="card-template" src={template_icon_img_src} />

					<div className="card-group">
						<h2>{contest?.data?.title}</h2>
						<span className="icon card-menu" onClick={onMenu}>
							more_vert
						</span>
					</div>

					<div className="card-group">
						<IconLabel icon="rocket_launch" label={start_date} />
						<IconLabel icon="flag" label={finish_date} />
					</div>

					<div className="card-group">
						<IconLabel icon={state_icon} label={state_label} color={state_color} />
						<IconLabel icon="schedule" label="UTC+2" />
						<IconLabel icon="language" label={locale_country_name} />
					</div>
				</div>

				<div className="loading-cover"></div>
				<div className="error-cover">
					<span className="icon">error</span>
					<span>Impossible de charger les données.</span>
				</div>
			</div>

			<ActionMenu active={menu_active} actions={menu_actions} />
		</div>
	);
}

export default Card;
