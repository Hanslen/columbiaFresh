import * as actionTypes from './actionTypes';

export const addIngredients = () => {
    return {
        type: actionTypes.ADD_INGREDIENT
    }
}

export const deleteIngredients = (id) => {
    return {
        type: actionTypes.DELETE_INGREDIENT,
        id: id
    }
}