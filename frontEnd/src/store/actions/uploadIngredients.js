import * as actionTypes from './actionTypes';

export const addIngredients = () => {
    return {
        type: actionTypes.ADD_INGREDIENT
    }
}
export const updateType = (id, value) => {
    return {
        type: actionTypes.UPDATE_TYPE,
        id: id,
        value: value
    }
}
export const updateNum = (id, value) => {
    return {
        type: actionTypes.UPDATE_NUM,
        id: id,
        value: value
    }
}
export const updateUnit = (id, value) => {
    return {
        type: actionTypes.UPDATE_UNIT,
        id: id,
        value: value
    }
}
export const deleteIngredients = (id) => {
    return {
        type: actionTypes.DELETE_INGREDIENT,
        id: id
    }
}
export const addDirection = () => {
    return {
        type: actionTypes.ADD_DIRECTION
    }
};

export const updateDirection = (id, value) => {
    return {
        type: actionTypes.UPDATE_DIRECTION,
        id: id,
        value: value
    }
};
export const deleteDirection = (id) => {
    return {
        type: actionTypes.DELETE_DIRERCTION,
        id: id
    }
}