import axios from '../../axios-config';

export const SEARCH_KEYWORD = 'SEARCH_KEYWORD';
export const SEARCH_RECIPES = 'SEARCH_RECIPES';
export const GET_RESULTS = 'GET_RESULTS';

export const searchKeyword = (keyword) => {
    return {
        type: SEARCH_KEYWORD,
        keyword
    };
};

export const searchRecipes = (keyword) => {
    return (dispatch) => {
        console.log('search: '+keyword);
        axios.get('/search', {
            params: {
                query: keyword,
                page: 1
            }
        }).then(function(response) {
            console.log(response);
            let results = response.data.recipes;
            dispatch(getResults(keyword, results));
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export const getResults = (keyword, results) => {
    return {
        type: GET_RESULTS,
        keyword,
        results
    };
};
