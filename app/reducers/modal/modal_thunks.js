import {showModal, modalTypes} from './modal_actions';
import {loadPath} from '../app_thunks';

export const showVersionsModal = () => {

    return (dispatch, getState) => {

        const {appState, routing} = getState(),
            {versionsInfo} = appState,
            {locationBeforeTransitions} = routing,
            {pathname} = locationBeforeTransitions;

        let newPathname = pathname.split('@')[0];

        dispatch(showModal(modalTypes.LOAD_VERSION_MODAL, {
            title: 'Load version',
            versionsInfo: versionsInfo,
            pickVersion: (version) => {
                newPathname += '@' + version;

                // reload
                if (document.location.hash.split('?')[0] === '#' + newPathname) {
                    dispatch(loadPath(newPathname.replace('/', '')));
                } else {
                    document.location.hash = newPathname;
                }
            }
        }));
    }
}
