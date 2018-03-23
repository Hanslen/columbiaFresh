import { SEARCH_KEYWORD, GET_RESULTS } from '../actions/search.js';

export const searchReducer = (state='', action) => {
    switch (action.type) {
        case SEARCH_KEYWORD:
            console.log('keyword: '+action.keyword);
            return action.keyword;
        default:
            return state;
    }
};

export const resultsReducer = (state={ keyword: '', results: [] }, action) => {
    switch (action.type) {
        case GET_RESULTS:
            console.log('get '+action.results.length+' results.');
            //return state.concat(state, action.results);
            return {
                keyword: action.keyword,
                results: action.results
            };
        default:
            return state;
    }
};
