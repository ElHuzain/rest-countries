import { createStore } from 'redux';

const initial_state = {
    mode: true,
    search: '',
    filter: {
        Region: 'all',
        Language: 'all'
    },
    data: []
}

function ColorModeReducer(state = initial_state, action) {
    switch (action.type) {

        case 'switch': {
            return {
                ...state,
                mode: !state.mode
            }
        }

        case 'updateSearch': {
            return {
                ...state,
                search: action.payload
            }
        }

        case 'updateFilter': return {
            ...state,
            filter: {
                ...state.filter,
                [action.payload.type]: action.payload.value
            }
        }

        case 'setData': return {
            ...state,
            data: action.payload
        }
        default: return state;
    }

}

let store = createStore(ColorModeReducer);

export default store
