import * as api from '../utils/elements_api';
import * as actions from '../../src/reducers/appState/appState_actions';

//@formatter:off
/*
 _____ _  _ _   _ _  _ _  _____
 |_   _| || | | | | \| | |/ / __|
 | | | __ | |_| | .` | ' <\__ \
 |_| |_||_|\___/|_|\_|_|\_\___/

 */
//@formatter:on

export const loadVersionsInfo = (version) => {
    return (dispatch, getState) => {

        api.fetchVersionsInfo().then(versionsInfo => {
            dispatch(actions.setVersionsInfo(versionsInfo));
        });
    }
}