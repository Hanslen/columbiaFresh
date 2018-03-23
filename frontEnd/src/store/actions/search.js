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
        }).catch(function (error) {
            console.log(error);
        });
        let ids = [1, 2, 3, 4, 5];
        let results = ids.map(i => {
            return {
                rid: i,
                url: '/recipe/'+i,
                imgurl: "http://via.placeholder.com/128x128",
                title: 'Menu'+i,
                author: 'Author'+i,
                likes: i*11,
                ingredients: 'ingredients'
            };
        });
        dispatch(getResults(keyword, results));
    }
}

export const getResults = (keyword, results) => {
    return {
        type: GET_RESULTS,
        keyword,
        results
    };
};
