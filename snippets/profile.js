// npm Events.EventEmitter
import Events 			from 'events';
// Singleton that contatins some usefule methods
import Utils 			from 'utils';
// some basic class to store user data
import User 			from 'User';

let _instance;

class Profile extends Events.EventEmitter {
	constructor() {
		super();

		this.user = new User();
	}

	// method to load user data from server 
	load(id) {
		// Promise is async, so we should care that some action will w8 while it ends
		return new Promise((resolve, reject) => {
			this.user.clean();
			// Utils.post is basic function to make post query to server
			Utils.post({
				url 	: 'get_data',
				data 	: { id: id },
				success: response => {
					if (response.status_code == 1) {
						this.user.set(response.data).then(() => {
							// we use both things: 1) emit event; 2) call resolve()
							// this allows us to update react component where this method was called directly
							// and also update all other component if needed
							this.update_header();
							resolve();
						}, () => {
							reject();
						});
					} else {
						reject();
					}
				}
			});
		});
	}

	update_header() {
		this.emit('change_user');
	}

	bind_on_change_user(callback) {
		this.on('change_user', callback);
	}

	unbind_on_change_user(callback) {
		this.removeListener('change_user', callback);
	}
}

// this class is singleton
if (!_instance) _instance = new Profile();
export default _instance;