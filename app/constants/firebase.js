import firebase  from 'firebase/app';
import * as Config from '../constants/Config';

require('firebase/auth');
require('firebase/database');
require('firebase/storage');

const mainApp = firebase.initializeApp(Config.firebaseCredentials);
const storage = firebase.storage();

const getRef = (ref) => {
	return ref.once("value")
		.then(snapshot => {

			return snapshot.val();

		});
}

export {
	mainApp,
	storage,
	getRef,
};
