import React 	from 'React';
import Profile 	from './profile';

// initial component where we call method to load profile data
// we don't need action or emit here because we can use promise to updae it
export default class ProfilePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			not_found : false
		}
	}

	load_profile() {
		this.state.not_found = false;
		
		Profile.load(this.props.user_id).then(() => {
			this.forceUpdate();
		}, () => {
			this.show_not_found();
		});
	}

	show_not_found() {
		this.setState({not_found: true});
	}

	render() {
		return (
			<div className="profile">
				{ Profile.user.is_loaded ? (
					<div className="meta">
						<img src={ this.props.user.img } />
						<span>{ this.props.user.full_name }</span>
						<span>{ this.props.user.bio }</span>
					</div>
				) : null }
				{ this.state.not_found ? (
					<div className="not-found">
						User not found
					</div>
				) : null }
			</div>
		)
	}

	componentWillMount() {
		this.load_profile();
	}
}