import React 	from 'React';
import Menu 	from 'Menu';
import Profile 	from './profile';

// header needs data about user, but we don't know when store will recive user info
// so we bind catcher for event and update it when store emit this event
export default class Header extends React.Component {
	constructor(props) {
		super(props);

		this._update 	= this._update.bind(this);
	}

	render() {
		return (
			<div className="header">
				<Menu />
				{ Profile.user.is_loaded ? (
					<UserInfo user={Profile.user} />
				) : null }
			</div>
		)
	}

	componentDidMount() {
		Profile.unbind_on_change_user(this._update);
	}

	componentWillUnmount() {
		Profile.bind_on_change_user(this._update);
	}

	_update() {
		this.forceUpdate();
	}
}

class UserInfo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="user-info">
				<img src={ this.props.user.img } />
				<span>{ this.props.user.full_name }</span>
			</div>
		)
	}
}