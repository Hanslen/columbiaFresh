import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';
const initialIngState = {
    ingredients: [["", "", ""]],
    directions: [""],
    suggestIngredients: null
}
const initialIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: [["", "", ""]],
        directions: [""]
    });
}

const loadsuggestionIngredient = (state, action) => {
    return updateObject(state, {
        suggestIngredients: action.loadsuggestionIngredient
    })
}
const addIngredients = (state, action) => {
    let oldState = state.ingredients;
    oldState.push(["","",""]);
    return updateObject(state,
    {
        ingredients: oldState
    });
}
const updateType = (state, action) => {
    let oldState = state.ingredients;
    oldState[action.id][0] = action.value;
    oldState[action.id][2] = action.unit;
    return updateObject(state, {
        ingredients: oldState
    });
}
const updateUnit = (state, action) => {
    let oldState = state.ingredients;
    oldState[action.id][2] = action.value;
    return updateObject(state, {
        ingredients: oldState
    });
}
const updateNum = (state, action) => {
    let oldState = state.ingredients;
    oldState[action.id][1] = action.value;
    return updateObject(state, {
        ingredients: oldState
    });
}
const addDirection = (state, action) => {
    let oldState = state.directions;
    oldState.push("");
    return updateObject(state,
    {
        directions: oldState
    });
}
const updateDirection = (state, action) => {
    let oldState = state.directions;
    oldState[action.id] = action.value;
    return updateObject(state,
    {
        directions: oldState
    });
}
const deleteIngredients = (state, action) => {
    let oldState = state.ingredients;
    if(oldState.length == 1){
        return state;
    }
    oldState.splice(action.id, 1);
    return updateObject(state,
        {
            ingredients: oldState
        }
    );
}
const deleteDirection = (state, action) => {
    let oldState = state.directions;
    if(oldState.length == 1){
        return state;
    }
    oldState.splice(action.id, 1);
    return updateObject(state,{
        directions: oldState
    });
}

const uploadRecipe = (state, action) => {
    return state;
}

const reducer = (state = initialIngState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return addIngredients(state, action);
        case actionTypes.DELETE_INGREDIENT:
            return deleteIngredients(state, action);
        case actionTypes.ADD_DIRECTION:
            return addDirection(state, action);
        case actionTypes.DELETE_DIRERCTION:
            return deleteDirection(state, action);
        case actionTypes.UPDATE_TYPE:
            return updateType(state, action);
        case actionTypes.UPDATE_NUM:
            return updateNum(state, action);
        case actionTypes.UPDATE_UNIT:
            return updateUnit(state, action);
        case actionTypes.UPDATE_DIRECTION:
            return updateDirection(state, action);
        case actionTypes.UPLOAD_RECIPE:
            return uploadRecipe(state, action);
        case actionTypes.LOAD_SUGGESTIONS_INGREDIENTS:
            return loadsuggestionIngredient(state, action);
        case actionTypes.INITIALIZE_INGREDIENT:
            return initialIngredient(state, action);
        default:
            return state;
    }
}
export default reducer;