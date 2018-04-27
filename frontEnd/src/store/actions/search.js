import axios from '../../axios-config';

export const SEARCH_KEYWORD = 'SEARCH_KEYWORD';
export const SEARCH_RECIPES = 'SEARCH_RECIPES';
export const GET_PAGES = 'GET_PAGES';
export const GET_RESULTS = 'GET_RESULTS';

export const searchKeyword = (keyword) => {
    return {
        type: SEARCH_KEYWORD,
        keyword
    };
};

export const searchPages = (keyword, perPage) => {
    return (dispatch) => {
        console.log('search: '+keyword);
        axios.get('/page', {
            params: {
                query: keyword,
                perPage
            }
        }).then(function(response) {
            console.log(response);
            let pages = response.data.pages;
            dispatch(getPages(keyword, pages));
        }).catch(function (error) {
            console.log(error);
        });
    };
};

export const getPages = (keyword, pages) => {
    return {
        type: GET_PAGES,
        keyword,
        pages
    };
};

export const searchRecipes = (keyword, page, perPage) => {
    return (dispatch) => {
        console.log('page: '+page);
        dispatch(getResults(keyword, []));
        axios.get('/search', {
            params: {
                query: keyword,
                page,
                perPage
            }
        }).then(function(response) {
            console.log(response);
            let results = response.data.recipes;
            dispatch(getResults(keyword, results));
        }).catch(function (error) {
            console.log(error.response);
        });
    };
};

export const rankRecipes = (keyword, page, perPage) => {
    return (dispatch) => {
        console.log('page: '+page);
        dispatch(getResults(keyword, []));
        axios.get('/rank', {
            params: {
                query: keyword,
                page,
                perPage
            }
        }).then(function(response) {
            console.log(response);
            let results = response.data.recipes;
            dispatch(getResults(keyword, results));
        }).catch(function (error) {
            console.log(error);
        });
    };
};

export const getResults = (keyword, results) => {
    return {
        type: GET_RESULTS,
        keyword,
        results
    };
};
