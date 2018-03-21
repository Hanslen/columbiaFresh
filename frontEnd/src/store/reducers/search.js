import { SEARCH_KEYWORD } from '../actions/search.js';

const reducer = (state='', action) => {
    switch (action.type) {
        case SEARCH_KEYWORD:
            console.log('search: '+action.keyword);
            return action.keyword;
        default:
            return state;
    }
};

export default reducer;
