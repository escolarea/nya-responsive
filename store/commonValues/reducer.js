import { countActionTypes } from './action'

const initialState = {
    playlistSOTW: null,
    contrarianPagesTitles: [],
    freeToDownloadSongs: {},
    freeTracks: {},
    loaded: false,
    freeAlbums: {}
};

export default function update(state = initialState, action) {
    switch (action.type) {
        case countActionTypes.ENTRIES_LOADED:
            if(action.entries.commonValues) return Object.assign(state, {loaded: true}, action.entries.commonValues);
            break;
    }
    return state;
}