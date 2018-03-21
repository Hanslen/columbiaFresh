export const SEARCH_KEYWORD = 'SEARCH_KEYWORD';

export const searchRecipe = (keyword) => {
    return {
        type: SEARCH_KEYWORD,
        keyword
    };
};
