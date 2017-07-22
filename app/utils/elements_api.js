import { mainApp, getRef } from '../constants/firebase';

// Create a storage reference from our storage service

let snippetsRef,
	snippetRef,
	versionRef,
	versionsInfoRef,
    snippetsAdhocRef,
	stateRef;		// All permissions

export const configureFirebase = () => {
    snippetsRef = mainApp.database().ref("snippets");
    snippetsAdhocRef = mainApp.database().ref("bins");
}

export const configureSnippet = (path) => {

    snippetRef = snippetsRef;

	path.split('.')
		.forEach(folder => {
            snippetRef = snippetRef.child(folder);
		})

    stateRef = snippetRef.child('workingCopy');
    versionsInfoRef = snippetRef.child('versionsInfo');
}

export const configureVersion = (version) => {

    versionRef = snippetRef.child(`v${version}`);
}

export const clearScreen = () => {
	stateRef.remove();
}

export const executeInstructions = (instructions) => {

	if (!instructions) {
		return;
	}

	instructions.reduce((output, instruction) => {

		const ref = stateRef.child(instruction.path);

		const NAN = (typeof instruction.value === 'number') && isNaN(instruction.value);

		if (NAN || instruction.value === null || typeof instruction.value === 'undefined') {
			instruction.verb = 'REMOVE';
		}

		switch (instruction.verb) {
			case 'REMOVE':
				ref.remove();
				break;
			case 'SET_VALUE':
				ref.set(instruction.value);
				break;
		}

	}, {});
};

export const fetchState = () => {

	return getRef(stateRef);
}



export const fetchVersion = () => {

	return getRef(versionRef.child('state'));

}

export const fetchVersionsInfo = () => {

	return getRef(versionsInfoRef);

}

export const publishVersion = (version, state, whatsNew) => {

	const versionInfoRef = versionsInfoRef
		.child(`v${version}`);

	versionInfoRef.set({
		id: version,
		whatsNew: whatsNew,
	});

	versionRef.set({
		id: version,
		state: state,
		whatsNew: whatsNew
	});
}

const listen = (ref, callback) => {
    return ref.on("value", snapshot => {
        const val = snapshot ? snapshot.val() : {};
        callback.call(this, val, ref);
    })
}

export const stopToListen = (ref, callback) => {
    return ref.off("value");
}

export const listenToState_adhock = (id, callback) => {
    const _stateRef = snippetsAdhocRef.child(id).child('workingCopy');

    return listen(_stateRef, callback);
}



configureFirebase();
