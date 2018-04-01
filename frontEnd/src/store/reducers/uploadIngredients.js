import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';
const initialState = {
    ingredients: [["", "", ""]]
}
const addIngredients = (state, action) => {
    let oldState = state.ingredients;
    oldState.push(["","",""]);
    return updateObject(state,
    {
        ingredients: oldState
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

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return addIngredients(state, action);
        case actionTypes.DELETE_INGREDIENT:
            return deleteIngredients(state, action);
        default:
            return state
    }
}
export default reducer;